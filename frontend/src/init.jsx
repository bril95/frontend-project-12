import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import filter from 'leo-profanity';
import i18n from './Internationalization/i18n';
import App from './App';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: 'production',
};

const init = () => {
  filter.add(filter.getDictionary('ru'));

  return (
    <I18nextProvider i18n={i18n}>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </RollbarProvider>
  </I18nextProvider>
  )
};

export default init;