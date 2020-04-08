import Character from "../models/Character";
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

export function storeCharacter(character: Character) {
    // let storage = localStorage.getItem(LOCALSTORAGE_NAME) ? JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME)) : {};
    // if (storage.characters) {
    //     if (character._id) {
    //         storage.characters[character._id] = character.toObject();
    //     } else {
    //         let id: number = 1;
    //         while (storage.characters[id]) {
    //             id++;
    //         }
    //         character.id = id;
    //         storage.characters[id] = character.toObject();
    //     }

    // } else {
    //     storage.characters = [];
    //     character.id = 1;
    //     storage.characters[1] = character.toObject();
    // }
    // localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(storage));
}

export function getCharacters(): Character[] {
    let storage = localStorage.getItem(LOCALSTORAGE_NAME) ? JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME)) : {};
    let characters = [];
    if (storage.characters)
        storage.characters.forEach(char => {
            if (char) characters.push(new Character(char));
        });
    return characters;
}

export function deleteCharacter(id: string) {
    let storage = localStorage.getItem(LOCALSTORAGE_NAME) ? JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME)) : {};
    if (storage.characters) {
        storage.characters[id] = null;
        localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(storage));
    }
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

export function setDarkMode(enabled: boolean) {
    let storage = localStorage.getItem(LOCALSTORAGE_NAME) ? JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME)) : {};
    storage.darkMode = enabled;
}

export function isDarkMode(): boolean {
    let storage = localStorage.getItem(LOCALSTORAGE_NAME) ? JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME)) : {};
    return storage.darkMode || false;
}

export function getLocalData(): any {
    return localStorage.getItem(LOCALSTORAGE_NAME) ? JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME)) : {};
}