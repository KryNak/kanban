import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store'
import {Auth0Provider} from "@auth0/auth0-react";
import {BrowserRouter as Router} from "react-router-dom";
import {App} from "./App";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Router>
        <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN!!}
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!!}
            redirectUri={process.env.REACT_APP_AUTH0_REDIRECT_URL!!}
            audience={process.env.REACT_APP_AUTH0_AUDIENCE}
            useRefreshTokens={true}
            cacheLocation={'localstorage'}
        >
            <Provider store={store}>
                <App/>
            </Provider>
        </Auth0Provider>
    </Router>
);

