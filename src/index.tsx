import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import T from 'i18n-react';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { LANG } from './constants';
import { setLang, getLang } from './utils/StorageManager';
import theme from './theme';

const lang = getLang();
const defaultLang = 'fr';

if (lang !== '' && LANG[getLang()]) {
    T.setTexts(LANG[lang]);
} else if (lang) {
    setLang(defaultLang);
    T.setTexts(LANG[defaultLang]);
} else {
    const navLang = navigator.language.split('-')[0].toLowerCase();
    if (LANG[navLang]) {
        setLang(navLang);
        T.setTexts(LANG[navLang]);
    } else {
        setLang(defaultLang);
        T.setTexts(LANG[defaultLang]);
    }
}

if (LANG[getLang()]) {
} else {
    setLang('fr');
    T.setTexts(LANG.fr);
}

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
