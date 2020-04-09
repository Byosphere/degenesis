import { LOCALSTORAGE_NAME } from "../constants";

export function getUserToken(): string {
    let storage = localStorage.getItem(LOCALSTORAGE_NAME) ? JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME)) : {};
    return storage.userToken;
}

export function saveUserToken(userToken: String) {
    let storage = localStorage.getItem(LOCALSTORAGE_NAME) ? JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME)) : {};
    storage.userToken = userToken;
    localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(storage));
}

export function disconnect() {
    let storage = localStorage.getItem(LOCALSTORAGE_NAME) ? JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME)) : {};
    storage.userToken = null;
    localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(storage));
}

export function setLang(value: string) {
    let storage = localStorage.getItem(LOCALSTORAGE_NAME) ? JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME)) : {};
    if (storage.lang && storage.lang !== value) {
        storage.lang = value;
        localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(storage));
        window.location.reload();
    } else {
        storage.lang = value;
        localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(storage));
    }
}

export function getLang(): string {
    let storage = localStorage.getItem(LOCALSTORAGE_NAME) ? JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME)) : {};
    return storage.lang || '';
}