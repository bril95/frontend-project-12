import * as Yup from 'yup';

const validationSignUpPage = (t) => Yup.object({
  username: Yup.string()
    .required(t('schema.requiredField'))
    .min(3, t('schema.min3'))
    .max(20, t('schema.max20')),
  password: Yup.string()
    .required(t('schema.requiredField'))
    .min(6, t('schema.min6')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], t('schema.samePassword'))
    .required(t('schema.requiredField')),
});

const validationSchemaLoginPage = (t) => Yup.object({
  username: Yup.string().required(t('schema.requiredField')),
  password: Yup.string().required(t('schema.requiredField')),
});

const validationSchemaNewChat = (t, channelsName) => Yup.object({
  channelName: Yup.string()
  .required(t('schema.requiredField'))
  .notOneOf(channelsName, t('schema.sameNameChannel'))
  .min(3, t('schema.min3'))
  .max(20, t('schema.max20')),
});

export { validationSignUpPage, validationSchemaLoginPage, validationSchemaNewChat };

