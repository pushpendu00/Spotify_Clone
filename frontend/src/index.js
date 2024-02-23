import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
import App from './App';
import LoginState from './context/login/LoginState';
// import UserState from './context/user/UserState';
import './index.css';
// import store from './store';

// store.subscribe(()=>console.log("store = ",store.getState()));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <Provider store={store}>
    <LoginState>
        {/* <UserState> */}
            <CookiesProvider>
                <App />
            </CookiesProvider>
        {/* </UserState> */}
    </LoginState>
    // </Provider>
);

