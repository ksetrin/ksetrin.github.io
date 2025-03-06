---
title: "Структура React Native проекта"
description: "Организация файлов и папок для масштабируемого React Native приложения. Лучшие практики и проверенные подходы"
category: "Coding"
tags: ["react-native", "architecture", "project-structure", "best-practices", "organization"]
slug: "react-native-project-structure"
lang: "ru"
datePublished: "2023-08-15"
dateModified: "2024-01-15"
author: "Пётр Евсиков"
tldr: ["Показываю рабочее дерево директорий для mid размера RN", "Разделяем ответственность по слоям и фичам", "Добавляем скрипты и утилиты для поддержки команды"]
---

# Структура React Native проекта

## Введение

Правильная организация структуры проекта - основа для масштабируемого и поддерживаемого React Native приложения. В этой статье рассматривается один из наиболее распространенных и проверенных подходов к организации файлов и папок.

## Базовая структура проекта

Существуют разные подходы к организации структуры приложения, но представленный ниже вариант зарекомендовал себя как эффективный для большинства проектов:

```
AwesomeProject/
├── android/                 # Нативный Android код
├── ios/                    # Нативный iOS код
├── scripts/                # Скрипты сборки и развертывания
└── src/                    # Основной исходный код
    ├── api/                # API клиенты и эндпоинты
    ├── assets/             # Статичные ресурсы
    │   ├── fonts/          # Шрифты
    │   ├── icons/          # Иконки
    │   ├── images/         # Изображения
    │   ├── i18n/           # Файлы локализации
    │   └── styles/         # Глобальные стили
    ├── components/         # Переиспользуемые компоненты
    ├── navigators/         # Навигация приложения
    ├── redux/              # Состояние приложения
    │   └── features/       # Слайсы состояния по фичам
    ├── screens/            # Экраны приложения
    │   └── ScreenName/     # Папка конкретного экрана
    │       ├── components/ # Компоненты экрана
    │       └── utils/      # Утилиты экрана
    ├── services/           # Бизнес-логика и сервисы
    ├── sheets/             # Bottom sheets компоненты
    ├── types/              # TypeScript типы
    │   ├── enums/          # Перечисления
    │   └── interfaces/     # Интерфейсы
    ├── hooks/              # Кастомные React хуки
    ├── models/             # Модели данных
    └── utils/              # Вспомогательные функции
```

## Детальное описание папок

### `/android` и `/ios`
Содержат нативный код для соответствующих платформ. Обычно изменяются только при добавлении нативных зависимостей или кастомизации сборки.

### `/scripts`
Скрипты для автоматизации процессов:
- Скрипты сборки
- Deploy скрипты
- Скрипты генерации ресурсов
- Утилиты для разработки

### `/src/api`
Централизованное место для всех API вызовов:

```javascript
// api/userApi.js
export const userApi = {
  getProfile: () => fetch('/api/user/profile'),
  updateProfile: (data) => fetch('/api/user/profile', { 
    method: 'PUT', 
    body: JSON.stringify(data) 
  })
};

// api/index.js
export { userApi } from './userApi';
export { authApi } from './authApi';
```

### `/src/assets`
Статичные ресурсы приложения, организованные по типам:

- **fonts/** - TTF/OTF файлы шрифтов
- **icons/** - SVG или PNG иконки
- **images/** - Изображения для UI
- **i18n/** - JSON файлы с переводами
- **styles/** - Глобальные темы и стили

### `/src/components`
Переиспользуемые UI компоненты:

```javascript
// components/Button/Button.js
export const Button = ({ title, onPress, variant = 'primary' }) => {
  // Реализация кнопки
};

// components/index.js
export { Button } from './Button/Button';
export { Input } from './Input/Input';
export { Card } from './Card/Card';
```

### `/src/navigators`
Конфигурация навигации приложения:

```javascript
// navigators/AppNavigator.js
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

### `/src/redux`
Управление состоянием приложения:

```javascript
// redux/store.js
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    posts: postsSlice.reducer,
  }
});

// redux/features/userSlice.js
export const userSlice = createSlice({
  name: 'user',
  initialState: { profile: null },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    }
  }
});
```

### `/src/screens`
Экраны приложения с собственными компонентами:

```
screens/
├── HomeScreen/
│   ├── HomeScreen.js      # Основной компонент экрана
│   ├── components/        # Компоненты только для этого экрана
│   │   ├── PostList.js
│   │   └── UserCard.js
│   └── utils/            # Утилиты только для этого экрана
│       └── homeHelpers.js
```

### `/src/services`
Бизнес-логика и сервисы:

```javascript
// services/authService.js
export const authService = {
  login: async (credentials) => {
    // Логика авторизации
  },
  logout: () => {
    // Логика выхода
  },
  isAuthenticated: () => {
    // Проверка авторизации
  }
};
```

### `/src/types`
TypeScript типы и интерфейсы:

```typescript
// types/interfaces/User.ts
export interface User {
  id: string;
  email: string;
  profile: UserProfile;
}

// types/enums/UserRole.ts
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator'
}
```

### `/src/hooks`
Кастомные React хуки:

```javascript
// hooks/useApi.js
export const useApi = (apiCall) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Логика хука
  
  return { data, loading, error, refetch };
};
```

### `/src/utils`
Вспомогательные функции общего назначения:

```javascript
// utils/dateUtils.js
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// utils/validation.js
export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

## Принципы организации

### 1. Группировка по функциональности
Связанные файлы должны находиться рядом. Например, компоненты экрана - в папке этого экрана.

### 2. Переиспользование vs специализация
- **Переиспользуемые** компоненты → `/src/components`
- **Специфичные** для экрана → `/src/screens/ScreenName/components`

### 3. Понятные имена
Имена файлов и папок должны четко отражать их назначение:
- `UserProfileScreen.js` вместо `Screen1.js`
- `authService.js` вместо `service.js`

### 4. Индексные файлы
Используйте `index.js` файлы для упрощения импортов:

```javascript
// components/index.js
export { Button } from './Button/Button';
export { Input } from './Input/Input';

// В других файлах
import { Button, Input } from '../components';
```

## Альтернативные подходы

### Feature-based структура
Организация по фичам вместо типов файлов:

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── services/
│   │   └── types/
│   └── profile/
│       ├── components/
│       ├── screens/
│       └── services/
```

### Atomic Design
Организация компонентов по принципу атомарного дизайна:

```
src/
├── components/
│   ├── atoms/       # Базовые элементы (Button, Input)
│   ├── molecules/   # Группы атомов (SearchBox)
│   ├── organisms/   # Группы молекул (Header, Footer)
│   └── templates/   # Шаблоны страниц
```

## Рекомендации

### Для небольших проектов (< 20 экранов)
Используйте базовую структуру, описанную выше. Она проста и понятна.

### Для средних проектов (20-50 экранов)
Рассмотрите feature-based подход для лучшей изоляции функциональности.

### Для крупных проектов (50+ экранов)
Комбинируйте подходы: feature-based на верхнем уровне + atomic design для компонентов.

## Заключение

Правильная структура проекта экономит время разработки, упрощает навигацию по коду и облегчает работу в команде. Выбирайте подход, который подходит масштабу вашего проекта, и следуйте ему последовательно.

Помните: лучшая структура - это та, которую понимает вся команда и которая не мешает разработке.

## Полезные ссылки

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com)
- [Feature-Sliced Design](https://feature-sliced.design)
- [React Folder Structure Best Practices](https://blog.webdevsimplified.com/2022-07/react-folder-structure/)
