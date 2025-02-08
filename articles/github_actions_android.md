---
title: "GitHub Actions для Android React Native"
description: "Пошаговое руководство по настройке автоматической сборки и деплоя Android приложений на React Native через GitHub Actions"
category: "DevOps"
tags: ["react-native", "android", "ci-cd", "github-actions", "google-play"]
---

# Настройка GitHub Actions для Android React Native

## Введение

В этой статье я расскажу, как настроить автоматическую сборку и деплой Android приложения на React Native с помощью GitHub Actions. Это поможет автоматизировать процесс релиза и сэкономить время разработки.

## Предварительные требования

Перед началом убедитесь, что у вас есть:
- Аккаунт Google Play Developer (платный)
- Проект React Native
- Репозиторий на GitHub

## Шаг 1: Настройка Google Play Console

### Регистрация в Google Play Developer

1. Зарегистрируйтесь и оплатите Google Play Developer аккаунт
2. В Google Play Console создайте новое приложение
3. Заполните минимальную информацию:
   - Описание приложения
   - Иконка
   - Скриншоты

### Настройка тестирования

1. Пригласите пользователей-тестировщиков
2. Настройте список тестировщиков в разделе "Тестировщики"
3. Создайте первый релиз вручную в разделе "Внутреннее тестирование"

## Шаг 2: Создание Service Account

### Google Cloud Console

1. Откройте [Google Cloud Console](https://cloud.google.com/iam/docs/service-accounts-create)
2. Нажмите "Enable the API"
3. Перейдите в раздел "APIs and services" → "Credentials"
4. Создайте Service Account:
   ```
   + Create Credentials → Service Account
   ```
5. Скачайте JSON ключ
6. Добавьте Service Account в Google Play Console как пользователя

## Шаг 3: Настройка GitHub Secrets

В настройках репозитория добавьте следующие секреты:

```
PLAY_STORE_SERVICE_ACCOUNT_JSON  # Содержимое JSON файла
UPLOAD_KEYSTORE_FILE            # Base64 keystore файла
UPLOAD_KEYSTORE_PASSWORD        # Пароль keystore
UPLOAD_KEY_ALIAS               # Alias ключа
UPLOAD_KEY_PASSWORD            # Пароль ключа
```

## Шаг 4: GitHub Workflow

Создайте файл `.github/workflows/android.yml`:

```yaml
name: Android Build and Deploy

on:
   push:
      branches: [ main ]
   pull_request:
      branches: [ main ]

jobs:
   build:
      runs-on: ubuntu-latest

      steps:
         - uses: actions/checkout@v3

         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
              node-version: '18'

         - name: Install dependencies
           run: yarn install

         - name: Setup JDK 11
           uses: actions/setup-java@v3
           with:
              java-version: '11'
              distribution: 'adopt'

         - name: Setup Android SDK
           uses: android-actions/setup-android@v2

         - name: Build Android APK
           run: |
              cd android
              ./gradlew assembleRelease

         - name: Upload to Google Play
           uses: r0adkll/upload-google-play@v1
           with:
              serviceAccountJsonPlainText: ${{ secrets.PLAY_STORE_SERVICE_ACCOUNT_JSON }}
              packageName: com.yourapp.package
              releaseFiles: android/app/build/outputs/apk/release/app-release.apk
              track: internal
```

## Заключение

Теперь при каждом пуше в main ветку будет автоматически собираться и загружаться новая версия приложения в Google Play Console для внутреннего тестирования.

## Полезные ссылки

- [Google Play Console](https://play.google.com/console)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [React Native Documentation](https://reactnative.dev/docs/signed-apk-android)
