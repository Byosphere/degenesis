import { LOCALSTORAGE_NAME } from "../constants";

function getStorage() {
    return localStorage.getItem(LOCALSTORAGE_NAME) ? JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME)) : {};
}

function setStorage(data: any) {
    localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(data));
}

export function getUserToken(): string {
    let storage = getStorage();
    return storage.userToken;
}

export function saveUserToken(userToken: String) {
    let storage = getStorage();
    storage.userToken = userToken;
    setStorage(storage);
}

export function disconnect() {
    let storage = getStorage();
    storage.userToken = null;
    setStorage(storage);

}

export function setLang(value: string) {
    let storage = getStorage();
    if (storage.lang && storage.lang !== value) {
        storage.lang = value;
        setStorage(storage);
        window.location.reload();
    } else {
        storage.lang = value;
        setStorage(storage);
    }
}

export function getLang(): string {
    let storage = getStorage();
    return storage.lang || '';
}