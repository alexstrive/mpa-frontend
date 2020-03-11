import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';

import { set as setLanguage } from '../../redux/reducers/language';

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
    const language = useSelector(state => state.language);
    const dispatch = useDispatch();

    const handleChange = useCallback(
        (event, data) => {
            dispatch(setLanguage(data.value));
        },
        [dispatch]
    );

    return (
        <div>
            <Dropdown value={language.locale} compact selection options={languageOptions} onChange={handleChange}/>
        </div>
    );
};

export default LanguageSelector;
