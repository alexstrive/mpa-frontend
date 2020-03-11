import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './redux';

import './index.css';
import I18nApp from './i18nApp';

ReactDOM.render(
    <Provider store={store}>
        <I18nApp />
    </Provider>,
    document.getElementById('root')
);
