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
    modalWindow: {
      addChannel: 'Добавить канал',
      channelName: 'Имя канала',
      cancel: 'Отмена',
      submit: 'Отправить',
    },
    schema: {
      requiredField: 'Обязательное поле',
      min3: 'Минимум 3 символа',
      max20: 'Максимум 20 символов',
      min6: 'Минимум 6 символов',
      samePassword: 'Пароли должны совпадать',
    }
  },
};

export default ru;
