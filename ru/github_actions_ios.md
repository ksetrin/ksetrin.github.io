Настройка GitHub Actions для android React Native

1. Зарегистрировать и оплатить [Developer Account](https://developer.apple.com/account)
2. В [App Store connect](https://developer.apple.com/account) создать проект (приложение)
3. Перейти в раздел TestFlights и создать группу тестировщиков
4. Перейти в раздел [App Store Connect API](https://appstoreconnect.apple.com/access/integrations/api) и создать ключ
5. В разделе [Certificates](https://developer.apple.com/account/resources/certificates/list) создать	Distribution и 	Development
6. В разделе [Identifiers](https://developer.apple.com/account/resources/identifiers/list) создать идентификатор идентичный bundle id например com.example
7. В разделе [Devices](https://developer.apple.com/account/resources/devices/list) зарегистировать свой iphone. Возможно это и не обязательно, но мне иначе не удавалось установить приложение на свой айфон
8. В разделе [Provisioning Profile](https://developer.apple.com/account/resources/profiles/list) создать Profile с Platform - iOS, Type - App Store, Enabled Capabilities - In-App Purchase, Push Notifications

Теперь неодходимо подготовить скрипт для сборки, для этого используется fastlane
1. Необходимо установить fastlane локально, например через brew
2. Создать и перейти в папку ios/fastlane
3. Сделать инициализацию fastlane (TODO добавить команду)
4. Будут запрошены данные аккаунта, необходимо ввести и пройти весь setup
5. В папке fastlane появится 2 файла: Appfile, Fastfile

Содержимое Fastfile
```
default_platform(:ios)

platform :ios do
  lane :beta do
    create_keychain(
      name: "fastlane_temp_keychain",
      password: "fastlane_temp_password",
      default_keychain: true,
      unlock: true,
      timeout: 3600
    )

    import_certificate(
      certificate_path: ENV["CERTIFICATE_PATH"],
      certificate_password: ENV["IOS_DISTRIBUTION_CERTIFICATE_PASSWORD"],
      keychain_name: "fastlane_temp_keychain",
      keychain_password: "fastlane_temp_password"
    )

    install_provisioning_profile(
      path: ENV["PROVISIONING_PROFILE_PATH"]
    )

    build_app(
      workspace: "example.xcworkspace",
      scheme: "example",
      configuration: "Release",
      clean: true,
      silent: false,
      export_method: "app-store",
      export_options: {
        signingStyle: "manual",
        provisioningProfiles: {
          "#{ENV["BUNDLE_ID"]}" => "example"
        },
        signingCertificate: "Apple Distribution: Ilya Solovev (Y6CA97C76G)"
      }
    )

    upload_to_app_store(
      api_key: app_store_connect_api_key(
        key_id: ENV["APP_STORE_CONNECT_KEY_ID"],
        issuer_id: ENV["APP_STORE_CONNECT_ISSUER_ID"],
        key_content: ENV["APP_STORE_CONNECT_API_KEY_P8"],
        is_key_content_base64: true
      ),
      run_precheck_before_submit: false,
      submission_information: {
        export_compliance_uses_encryption: true,
        export_compliance_encryption_is_exempt: true,
        export_compliance_encryption_updated: false,
      },
      skip_metadata: true,
      skip_screenshots: true,
      submit_for_review: false,
      ipa: "example.ipa"
    )

    delete_keychain(
      name: "fastlane_temp_keychain"
    )
  end
end
```

В папке ios/fastlane можно создать файл .env и определить там секреты
CERTIFICATE_PATH=cert.p12 \
IOS_DISTRIBUTION_CERTIFICATE_PASSWORD=password \
PROVISIONING_PROFILE_PATH=profile.mobileprovision \
BUNDLE_ID=com.example

APP_STORE_CONNECT_KEY_ID=XXXXXXXXX \
APP_STORE_CONNECT_ISSUER_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX \
APP_STORE_CONNECT_API_KEY_P8=BASE64STRING=

Если билд fastlane прошел успешно и все загрузилось в TestFlight можно авторизировать скриптом
```
name: iOS CI/CD to TestFlight

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: macos-15
    env:
      APPLE_ID: ${{ secrets.APPLE_ID }}
      DEVELOPER_TEAM_ID: ${{ secrets.DEVELOPER_TEAM_ID }}
      BUNDLE_ID: ${{ secrets.BUNDLE_ID }}

      APP_STORE_CONNECT_KEY_ID: ${{ secrets.APP_STORE_CONNECT_KEY_ID }}
      APP_STORE_CONNECT_ISSUER_ID: ${{ secrets.APP_STORE_CONNECT_ISSUER_ID }}
      APP_STORE_CONNECT_API_KEY_P8: ${{ secrets.APP_STORE_CONNECT_API_KEY_P8 }}

      TEMP_DIR: ${{ github.workspace }}/temp_ios_certs
      CERTIFICATE_PATH: ${{ github.workspace }}/temp_ios_certs/certificate.p12
      PROVISIONING_PROFILE_PATH: ${{ github.workspace }}/temp_ios_certs/profile.mobileprovision

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '23.11.0'

      - name: Enable Corepack (for Yarn 4)
        run: corepack enable

      - name: Install JavaScript Dependencies with Yarn
        run: yarn install

      - name: Select Xcode 16.4
        run: sudo xcode-select -s /Applications/Xcode_16.4.app

      - name: Install CocoaPods
        run: |
          cd ios
          pod install --repo-update
          cd ..

      - name: Decode iOS Distribution Certificate
        env:
          IOS_DISTRIBUTION_CERTIFICATE_P12: ${{ secrets.IOS_DISTRIBUTION_CERTIFICATE_P12 }}
        run: |
          mkdir -p "$TEMP_DIR"
          echo "$IOS_DISTRIBUTION_CERTIFICATE_P12" | base64 --decode > "$CERTIFICATE_PATH"
          echo "::debug::Certificate decoded to $CERTIFICATE_PATH."

      - name: Decode iOS Provisioning Profile
        env:
          IOS_PROVISIONING_PROFILE: ${{ secrets.IOS_PROVISIONING_PROFILE }}
        run: |
          mkdir -p "$TEMP_DIR"
          echo "$IOS_PROVISIONING_PROFILE" | base64 --decode > "$PROVISIONING_PROFILE_PATH"
          echo "::debug::Provisioning profile decoded to $PROVISIONING_PROFILE_PATH."

      - name: Install Fastlane
        run: |
          cd ios
          bundle install --path vendor/bundle
          cd ..

      - name: Build and Upload to TestFlight via Fastlane
        run: |
          cd ios
          bundle exec fastlane beta
          cd ..
        env:
          CERTIFICATE_PATH: ${{ env.CERTIFICATE_PATH }}
          IOS_DISTRIBUTION_CERTIFICATE_PASSWORD: ${{ secrets.IOS_DISTRIBUTION_CERTIFICATE_PASSWORD }}
          PROVISIONING_PROFILE_PATH: ${{ env.PROVISIONING_PROFILE_PATH }}
```

Очень важно использовать такие же версии как и на локальной машине

Нарпимер, только macos-15 содержит Xcode 16.4

А так же важно выбрать node-version: '23.11.0' и использовать Yarn 4
