import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { MainView } from './components/pages/MainView';
import { store } from './app/strore'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <MainView/>
  </Provider>
);

