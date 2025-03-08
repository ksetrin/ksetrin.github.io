---
title: "Вопросы из собеседований React Native-разработчика"
description: "Expo против bare workflow, устройство моста, оптимизация производительности и нативные модули"
category: "Mobile"
tags: ["react-native", "interview", "expo", "performance"]
slug: "interview-questions-react-native"
lang: "ru"
datePublished: "2023-10-19"
dateModified: "2024-02-02"
author: "Пётр Евсиков"
tldr: ["Разбираем Expo и bare workflow и выбираем подход по проекту", "Объясняем как работает мост RN и нативные модули", "Фокусируемся на оптимизации производительности и списков"]
---
Вопрос:  
**В чем смысл оборачивания всего содержимого JavaScript-файла в функцию?**

Ответ:  


Вопрос:
**Что такое Expo и чем он отличается от чистого React Native?**

Ответ:
Expo — это платформа и набор инструментов для разработки React Native приложений. Основные отличия:
- Управляемый workflow с готовой средой разработки
- Множество встроенных API и компонентов
- Возможность разработки без Android Studio/Xcode
- Over-the-air обновления из коробки
- Expo Go для тестирования на устройстве

Вопрос:  
**Какие есть workflow в Expo?**

Ответ:
Managed Workflow:
- Expo полностью управляет нативным кодом
- Ограниченный доступ к нативным модулям
- Простота разработки и развертывания
- Используется Expo CLI и Expo Go

Bare Workflow (Expo Dev Client):
- Полный контроль над нативным кодом
- Возможность добавления custom нативных модулей
- Использование Expo SDK вместе с нативными возможностями
- Требует Android Studio/Xcode для сборки

Вопрос:  
**Что такое EAS (Expo Application Services)?**

Ответ:
EAS — это набор облачных сервисов для разработки, сборки и развертывания Expo/React Native приложений:

EAS Build:
- Облачная сборка приложений для iOS и Android
- Поддержка custom нативного кода
- Различные конфигурации сборки

EAS Submit:
- Автоматическая отправка в App Store и Google Play
- Интеграция с CI/CD

EAS Update:
- Over-the-air обновления JavaScript кода
- Мгновенные исправления без прохождения ревью стора

Вопрос:  
**Как настроить окружение для разработки с Expo?**

Ответ:
```bash
# Установка Expo CLI
npm install -g @expo/cli

# Создание нового проекта
npx create-expo-app MyApp

# Запуск проекта
cd MyApp
npx expo start

# Для managed workflow
npx expo install expo-camera

# Для bare workflow
npx expo install expo-camera
npx expo run:ios
npx expo run:android
```

Вопрос:  
**Как работают обновления в Expo?**

Ответ:
Over-the-Air (OTA) обновления:
```javascript
import * as Updates from 'expo-updates';

// Проверка обновлений
const update = await Updates.checkForUpdateAsync();
if (update.isAvailable) {
  await Updates.fetchUpdateAsync();
  await Updates.reloadAsync();
}
```

EAS Update:
```json
// eas.json
{
  "build": {
    "production": {
      "channel": "production"
    }
  },
  "submit": {
    "production": {}
  }
}
```

Вопрос:
**Какие ограничения есть у Expo?**

Ответ:
Managed Workflow ограничения:
- Нельзя использовать библиотеки с нативным кодом (кроме Expo SDK)
- Ограниченный контроль над нативными настройками
- Больший размер приложения из-за Expo Runtime
- Зависимость от обновлений Expo SDK

Решения:
- Переход на Bare Workflow
- Использование Expo Dev Client
- Создание custom development client

## 7. Как работать с нативными модулями в Expo?

**Ответ:**
**В Managed Workflow:**
- Только модули из Expo SDK
- Использование `expo install` для совместимости

**В Bare Workflow:**
```bash
# Добавление нативного модуля
npm install react-native-some-library
npx expo run:ios
npx expo run:android
```

**Config Plugins для автоматизации:**
```javascript
// app.config.js
export default {
  expo: {
    plugins: [
      '@react-native-async-storage/async-storage',
      [
        'expo-camera',
        {
          cameraPermission: 'Allow app to access camera'
        }
      ]
    ]
  }
};
```

## 8. Как настроить push-уведомления в Expo?

**Ответ:**
```javascript
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

// Настройка уведомлений
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Получение токена
async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  }
}
```

## 9. Как работать с файловой системой в Expo?

**Ответ:**
```javascript
import * as FileSystem from 'expo-file-system';

// Основные директории
const documentDirectory = FileSystem.documentDirectory;
const cacheDirectory = FileSystem.cacheDirectory;

// Чтение файла
const content = await FileSystem.readAsStringAsync(
  documentDirectory + 'file.txt'
);

// Запись файла
await FileSystem.writeAsStringAsync(
  documentDirectory + 'file.txt',
  'Hello World'
);

// Скачивание файла
const downloadResult = await FileSystem.downloadAsync(
  'https://example.com/file.pdf',
  documentDirectory + 'file.pdf'
);
```

## 10. Как оптимизировать производительность Expo приложения?

**Ответ:**
**Общие принципы:**
- Использование React.memo, useMemo, useCallback
- Lazy loading компонентов
- Оптимизация изображений с expo-image
- Использование FlatList для больших списков

**Expo-специфичные оптимизации:**
```javascript
// Использование expo-image вместо Image
import { Image } from 'expo-image';

<Image
  source={{ uri: 'https://example.com/image.jpg' }}
  placeholder={blurhash}
  contentFit="cover"
  transition={1000}
/>

// Настройка Metro bundler
// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('db');
module.exports = config;
```

## 11. Как организовать тестирование в Expo проекте?

**Ответ:**
```javascript
// Установка зависимостей
npm install --save-dev jest @testing-library/react-native

// __tests__/App.test.js
import { render } from '@testing-library/react-native';
import App from '../App';

test('renders correctly', () => {
  const { getByText } = render(<App />);
  expect(getByText('Welcome')).toBeTruthy();
});

// Тестирование с Expo модулями
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      name: 'TestApp'
    }
  }
}));
```

## 12. Как настроить CI/CD для Expo проекта?

**Ответ:**
```yaml
# .github/workflows/build.yml
name: Build and Deploy
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      
      - name: Setup Expo
        uses: expo/expo-github-action@v7
        with:
          expo-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      
      - name: Install dependencies
        run: npm install
      
      - name: Build app
        run: eas build --platform all --non-interactive
      
      - name: Submit to stores
        run: eas submit --platform all --non-interactive
```

## 13. Какие есть альтернативы Expo и когда их стоит использовать?

**Ответ:**
**Альтернативы:**
- **React Native CLI** - для полного контроля над нативным кодом
- **Ignite CLI** - boilerplate с лучшими практиками
- **NativeBase** - UI framework с темизацией
- **Tamagui** - современный UI framework

**Когда использовать альтернативы:**
- Нужны специфичные нативные модули
- Критична производительность
- Требуется глубокая кастомизация
- Есть legacy нативный код для интеграции


## Ссылки

https://www.youtube.com/watch?v=IlIgM5bEnRQ
