import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';

import { Provider } from 'react-redux';
import store from './redux';

import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import './index.css';

import messages from './translations';

const locale = navigator.language.slice(0, 2);

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider locale={locale} messages={messages[locale]}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </IntlProvider>
    </Provider>,
    document.getElementById('root')
);
