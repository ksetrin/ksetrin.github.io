---
title: "GitHub Actions для iOS React Native"
description: "Настройка CI/CD для iOS: от создания сертификатов до автоматического деплоя в TestFlight через Fastlane"
category: "DevOps"
tags: ["react-native", "ios", "ci-cd", "fastlane", "testflight"]
slug: "github-actions-ios"
lang: "ru"
datePublished: "2023-11-24"
dateModified: "2024-01-12"
author: "Пётр Евсиков"
tldr: ["Готовим сертификаты и provisioning профили для iOS", "Конфигурируем Fastlane match и gym для автоматизации", "Собираем и отправляем билд в TestFlight через GitHub Actions"]
---

# Настройка GitHub Actions для iOS React Native

## Введение

В этой статье рассматривается настройка автоматической сборки и деплоя iOS приложения на React Native с помощью GitHub Actions и Fastlane. Процесс более сложный чем для Android, но результат того стоит - полная автоматизация релизов в TestFlight.

## Предварительные требования

Перед началом убедитесь, что у вас есть:
- Платный Apple Developer Account ($99/год)
- Проект React Native
- Репозиторий на GitHub
- Доступ к macOS для первоначальной настройки

## Шаг 1: Настройка Apple Developer Account

### Регистрация и создание приложения

1. Зарегистрируйтесь и оплатите [Apple Developer Account](https://developer.apple.com/account)
2. В [App Store Connect](https://appstoreconnect.apple.com) создайте новое приложение
3. Перейдите в раздел TestFlight и создайте группу тестировщиков

### Настройка API ключа

4. Перейдите в раздел [App Store Connect API](https://appstoreconnect.apple.com/access/integrations/api) и создайте ключ
5. Сохраните ключ - он понадобится для автоматизации

## Шаг 2: Создание сертификатов и профилей

### Сертификаты

1. В разделе [Certificates](https://developer.apple.com/account/resources/certificates/list) создайте:
    - **Distribution Certificate** - для релизных сборок
    - **Development Certificate** - для разработки

### Идентификаторы и устройства

2. В разделе [Identifiers](https://developer.apple.com/account/resources/identifiers/list) создайте App ID идентичный bundle id (например: `com.example.app`)

3. В разделе [Devices](https://developer.apple.com/account/resources/devices/list) зарегистрируйте свой iPhone для тестирования

### Provisioning Profile

4. В разделе [Provisioning Profiles](https://developer.apple.com/account/resources/profiles/list) создайте профиль:
    - **Platform**: iOS
    - **Type**: App Store
    - **Capabilities**: In-App Purchase, Push Notifications (если нужны)

## Шаг 3: Настройка Fastlane

### Установка и инициализация

Fastlane - это инструмент для автоматизации сборки и деплоя iOS приложений.

1. Установите Fastlane локально:
```bash
brew install fastlane
```

2. Перейдите в папку iOS проекта и инициализируйте Fastlane:
```bash
cd ios
fastlane init
```

3. Пройдите весь setup, введя данные Apple Developer аккаунта
4. В папке `ios/fastlane` появятся файлы: `Appfile` и `Fastfile`

### Настройка Fastfile

Замените содержимое `Fastfile` на:

```ruby
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
        signingCertificate: "Apple Distribution: Your Name (XXXXXXXXXX)"
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

### Локальные переменные окружения

Создайте файл `ios/fastlane/.env` для локального тестирования:

```env
CERTIFICATE_PATH=cert.p12
IOS_DISTRIBUTION_CERTIFICATE_PASSWORD=your_password
PROVISIONING_PROFILE_PATH=profile.mobileprovision
BUNDLE_ID=com.example.app

APP_STORE_CONNECT_KEY_ID=XXXXXXXXX
APP_STORE_CONNECT_ISSUER_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
APP_STORE_CONNECT_API_KEY_P8=BASE64_ENCODED_KEY
```

## Шаг 4: GitHub Actions Workflow

После успешного локального билда создайте файл `.github/workflows/ios.yml`:

```yaml
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

      - name: Install JavaScript Dependencies
        run: yarn install

      - name: Select Xcode 16.4
        run: sudo xcode-select -s /Applications/Xcode_16.4.app

      - name: Install CocoaPods
        run: |
          cd ios
          pod install --repo-update

      - name: Decode iOS Distribution Certificate
        env:
          IOS_DISTRIBUTION_CERTIFICATE_P12: ${{ secrets.IOS_DISTRIBUTION_CERTIFICATE_P12 }}
        run: |
          mkdir -p "$TEMP_DIR"
          echo "$IOS_DISTRIBUTION_CERTIFICATE_P12" | base64 --decode > "$CERTIFICATE_PATH"

      - name: Decode iOS Provisioning Profile
        env:
          IOS_PROVISIONING_PROFILE: ${{ secrets.IOS_PROVISIONING_PROFILE }}
        run: |
          mkdir -p "$TEMP_DIR"
          echo "$IOS_PROVISIONING_PROFILE" | base64 --decode > "$PROVISIONING_PROFILE_PATH"

      - name: Install Fastlane
        run: |
          cd ios
          bundle install --path vendor/bundle

      - name: Build and Upload to TestFlight
        run: |
          cd ios
          bundle exec fastlane beta
        env:
          CERTIFICATE_PATH: ${{ env.CERTIFICATE_PATH }}
          IOS_DISTRIBUTION_CERTIFICATE_PASSWORD: ${{ secrets.IOS_DISTRIBUTION_CERTIFICATE_PASSWORD }}
          PROVISIONING_PROFILE_PATH: ${{ env.PROVISIONING_PROFILE_PATH }}
```

## Шаг 5: GitHub Secrets

Добавьте в настройки репозитория следующие секреты:

```
APPLE_ID                              # Ваш Apple ID
DEVELOPER_TEAM_ID                     # Team ID из Developer Account
BUNDLE_ID                             # Bundle ID приложения

APP_STORE_CONNECT_KEY_ID              # Key ID из App Store Connect API
APP_STORE_CONNECT_ISSUER_ID           # Issuer ID из App Store Connect API
APP_STORE_CONNECT_API_KEY_P8          # Base64 содержимое .p8 файла

IOS_DISTRIBUTION_CERTIFICATE_P12      # Base64 сертификата Distribution
IOS_DISTRIBUTION_CERTIFICATE_PASSWORD # Пароль сертификата
IOS_PROVISIONING_PROFILE              # Base64 Provisioning Profile
```

## Важные моменты

### Версии инструментов

Критически важно использовать совместимые версии:
- **macOS 15** содержит Xcode 16.4
- **Node.js 23.11.0** для стабильной работы
- **Yarn 4** для управления зависимостями

### Подготовка файлов

Для добавления в GitHub Secrets:

```bash
# Кодирование сертификата
base64 -i certificate.p12 | pbcopy

# Кодирование Provisioning Profile
base64 -i profile.mobileprovision | pbcopy

# Кодирование API ключа
base64 -i AuthKey_XXXXXXXXX.p8 | pbcopy
```

## Заключение

После настройки каждый пуш в main ветку будет автоматически:
1. Собирать iOS приложение
2. Подписывать его валидными сертификатами
3. Загружать в TestFlight для тестирования

Процесс настройки сложнее Android, но обеспечивает полную автоматизацию iOS релизов.

## Полезные ссылки

- [Apple Developer Portal](https://developer.apple.com/account)
- [App Store Connect](https://appstoreconnect.apple.com)
- [Fastlane Documentation](https://docs.fastlane.tools)
- [GitHub Actions для iOS](https://docs.github.com/en/actions)
