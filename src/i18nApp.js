import React from 'react';
import { useSelector } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { App } from './App';

const i18nApp = () => {
    const language = useSelector(state => state.language);
    return (
        <div>
            <IntlProvider locale={language.locale} messages={language.messages}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </IntlProvider>
        </div>
    );
};

export default i18nApp;
