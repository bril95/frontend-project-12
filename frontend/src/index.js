import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import filter from 'leo-profanity';
import { useDispatch, useSelector, Provider } from 'react-redux';
import { useEffect } from 'react';
import './index.css';
import i18n from './internationalization/i18n';
import App from './App';
import handleSocketEvents from './api/socket';
import { selectChannels } from './Slice/channelsSlice';
import { selectMessages } from './Slice/messagesSlice';
import store from './api/createStore';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: 'production',
};

const Init = () => {
  filter.add(filter.getDictionary('ru'));

  const dispatch = useDispatch();
  const channelsStore = useSelector(selectChannels);
  const messagesStore = useSelector(selectMessages);

  useEffect(() => {
    const subscribeSocket = handleSocketEvents(dispatch, channelsStore, messagesStore);

    return () => {
      subscribeSocket();
    };
  }, [dispatch, channelsStore, messagesStore]);

  return (
    <I18nextProvider i18n={i18n}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </RollbarProvider>
    </I18nextProvider>
  );
};

const app = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>
      <Init />
    </Provider>,
  );
};

app();
