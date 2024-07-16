Структура проекта React Native приложения

Существуют разные подходы к организации структуры приложения. Заивит от того, какому подходу вы отдаете предпочтение. Я приведу один из самых распространенных вариантов как организовать папочки в React Native проекте

Вот примерно так:

AwesomeProject
- android
- scripts
- ios
- src
  - api
  - assets
    - fonts
    - icons
    - images
    - i18n
  - components
  - types
    - enums
    - interfaces
  - hooks
  - models
  - navigators
  - screens
    - screen Foo
      - components
      - utils
  - services
  - store
  - utils
