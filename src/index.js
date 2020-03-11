import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';

import { Provider } from 'react-redux';
import store from './redux';

import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider locale={store.getState().language.locale} messages={store.getState().language.messages}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </IntlProvider>
    </Provider>,
    document.getElementById('root')
);
