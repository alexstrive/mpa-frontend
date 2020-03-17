import React from 'react';
import { useSelector } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { SWRConfig } from 'swr';
import { App } from './App';

const i18nApp = () => {
    const language = useSelector(state => state.language);
    return (
        <div>
            <SWRConfig value={{
                refreshInterval: 3000,
                fetcher: (...args) => fetch(...args).then(res => res.json())
            }}>
                <IntlProvider locale={language.locale} messages={language.messages}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </IntlProvider>
            </SWRConfig>
        </div>
    );
};

export default i18nApp;
