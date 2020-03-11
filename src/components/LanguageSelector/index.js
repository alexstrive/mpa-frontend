import React from 'react';

import { Dropdown } from 'semantic-ui-react';

const languageOptions = [
    {
        key: 'ru',
        value: 'ru',
        text: 'Русский'
    },
    {
        key: 'en',
        value: 'en',
        text: 'English'
    }
];

const LanguageSelector = () => {
    return (
        <div>
            <Dropdown fluid selection options={languageOptions}/>
        </div>
    );
};

export default LanguageSelector;
