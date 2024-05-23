const ru = {
  translation: {
    loginPage: {
      enter: 'Войти',
      nickname: 'Ваш ник',
      password: 'Пароль',
      withoutAccount: 'Нет аккаунта?', 
      registration: 'Регистрация',
      error: 'Неверные имя пользователя или пароль',
      isLoading: 'В процессе...',
    },
    chatMainPage: {
      exit: 'Выйти',
      channels: 'Каналы',
      placeholderMessage: 'Введите сообщение...',
      toastError: 'Ошибка сети',
      toastDataLoadingError: 'Ошибка в загрузке данных',
      messages: {
        key_zero: '{{count}} сообщений',
        key_one: '{{count}} сообщение',
        key_few: '{{count}} сообщения',
        key_many: '{{count}} сообщений',
      }
    },
    signUpPage: {
      placeholder: {
        min3max20: 'От 3 до 20 символов',
        min6: 'Минимум 6 символов',
        samePassword: 'Пароли должны совпадать',
      },
      errorPassword: 'Пользователь уже существует',
      errorRegistration: 'Произошла ошибка при регистрации',
      registration: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Пароли должны совпадать',
      signUp: 'Зарегистрироваться'
    },
    notFoundPage: {
      pageNotFound: 'Страница не найдена'
    },
    modalWindows: {
      cancel: 'Отмена',
      submit: 'Отправить',
      addChannel: {
        addChannel: 'Добавить канал',
        channelName: 'Имя канала',
        toastAddName: 'Канал создан!',
        toastErrorAddName: 'Ошибка при создании канала!',
      },
      renameChannel: {
        renameChannel: 'Переименовать канал',
        newName: 'Новое имя канала',
        toastRenameChannel: 'Канал переименован!',
      },
      deleteChannel: {
        deleteChannel: 'Удалить канал',
        confirmation: 'Уверены?',
        delete: 'Удалить',
        toastDeleteChannel: 'Канал удален!',
        toastErrorAddName: 'Ошибка при удалении канала!',
      },
    },
    schema: {
      requiredField: 'Обязательное поле',
      min3: 'Минимум 3 символа',
      max20: 'Максимум 20 символов',
      min6: 'Минимум 6 символов',
      samePassword: 'Пароли должны совпадать',
      sameNameChannel: 'Это имя канала уже используется',
      enterNewName: 'Введите новое имя канала',
    }
  },
};

export default ru;
