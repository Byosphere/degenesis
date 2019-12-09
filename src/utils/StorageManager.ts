import Character from "../models/Character";
import { LOCALSTORAGE_NAME } from "../constants";
import User from "../models/User";

export function getUser(): User {
    let storage = localStorage.getItem(LOCALSTORAGE_NAME) ? JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME)) : {};
    return storage.user;
}

export function saveUser(user: User) {
    let storage = localStorage.getItem(LOCALSTORAGE_NAME) ? JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME)) : {};
    storage.user = user;
    localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(storage));
}

export function storeCharacter(character: Character) {
    let storage = localStorage.getItem(LOCALSTORAGE_NAME) ? JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME)) : {};
    if (storage.characters) {
        if (character.id !== 0) {
            storage.characters[character.id] = character.toObject();
        } else {
            let id: number = 1;
            while (storage.characters[id]) {
                id++;
            }
            character.id = id;
            storage.characters[id] = character.toObject();
        }

    } else {
        storage.characters = [];
        character.id = 1;
        storage.characters[1] = character.toObject();
    }
    localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(storage));
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

export function deleteCharacter(id: number) {
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