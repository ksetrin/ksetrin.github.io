Настройка GitHub Actions для android React Native

1. Зарегистрировать и оплатить google play developer
1. В google play console создать проект (приложение)
1. Зайти в приложение и заполнить минимальный набор данных. Как правило это 1 страница с описанием, иконкой приложения и скринами
1. Пригласить пользователей, которые будут тестировщиками, они должны принять инвайт на почту
1. Перейти на вкладку "тестировщики" и настроить список тестировщиков - включить чекбокс (добавить, если не добавлены)
1. Зайти в раздел тестирование, например "внутреннее тестирование" и первый выпуск сделать вручную
1. В разделе тестирование / Internal app sharing будет ссылка для тестировщиков
1. Пользователи подтвердившие приглашение должны увидеть пользовтальское приглашение по ссылке и подтвердить его

Теперь, убедившись, что все работает можно настроить автоматизацию
1. Откртыть https://cloud.google.com/iam/docs/service-accounts-create и нажать Enable the API
1. Перейти в созданный проект https://console.cloud.google.com/ и выбрать APIs and services
1. Раздел Credentials
1. Нажать + Create Credentials и выбрать Service Account (все что optional можно не делать)
1. Зайти в созданный аккаунт и перейти на вкладку Keys
1. Выбрать JSON и скачать этот файл
1. В google play developer перейти в раздел "пользователи" и добавить Service Account как email

Создать в проекте файл .github/workflows/android.yml

TODO \- разместить содержимое файла -\

Определить сикреты в настройках репозитория /settings/secrets/actions
PLAY_STORE_SERVICE_ACCOUNT_JSON
UPLOAD_KEYSTORE_FILE
UPLOAD_KEYSTORE_PASSWORD
UPLOAD_KEY_ALIAS
UPLOAD_KEY_PASSWORD
