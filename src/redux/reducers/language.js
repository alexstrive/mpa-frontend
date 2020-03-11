import messages from '../../translations';

export const LANGUAGE_SET = 'language/set';

export const set = (targetLanguage) => ({
    type: LANGUAGE_SET,
    payload: targetLanguage
});

export default (state = [], action) => {
    switch (action.type) {
    case LANGUAGE_SET:
        const locale = action.payload;
        return {
            locale,
            messages: messages[locale]
        };
    default:
        const defaultLocale = localStorage.getItem('locale') || 'en';
        return {
            locale: defaultLocale,
            messages: messages[defaultLocale]
        };
    }
};
