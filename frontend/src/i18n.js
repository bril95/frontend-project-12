import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';


const resources = {
  ru: {
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
  },
};
const i18n = i18next.createInstance();

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    ns: ['translation', 'loginPage', 'chatMainPage'],
    defaultNS: 'translation',
  });

export default i18n;
