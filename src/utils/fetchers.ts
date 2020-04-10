import User from "../models/User";
import Axios from 'axios';
import { API_PATH } from "../constants";
import { getUserToken } from "./StorageManager";
import { RegisterForm } from "../pages/connectpage/RegisterModal";
import { Character } from "../models/Character";

export async function registerUser(registerForm: RegisterForm) {
    const url = API_PATH + '/register';
    return Axios.post(url, null, { params: registerForm });
}

export async function userConnect(pseudo: string, password: string): Promise<{ data: { error: boolean, token: string, user: User } }> {
    const url = API_PATH + '/login';
    return Axios.post(url, null, { params: { pseudo, password } });
}

export async function getUser(token: string): Promise<{ data: User }> {
    const url = API_PATH + '/user';
    return Axios.get(url, { headers: { 'auth-token': token } });
}

export async function getCharactersAsync(): Promise<{ data: Character[] }> {
    const url = API_PATH + '/characters';
    return Axios.get(url, { headers: { 'auth-token': getUserToken() } });
}

export async function updateCharacterAsync(char: Character): Promise<{ data: Character }> {
    const url = API_PATH + '/character/' + char._id;
    return Axios.put(url, char, { headers: { 'auth-token': getUserToken() } });
}

export async function saveCharacterAsync(char: Character): Promise<{ data: Character }> {
    const url = API_PATH + '/character';
    return Axios.post(url, char, { headers: { 'auth-token': getUserToken() } });
}

export async function deleteCharacterAsync(charId: string): Promise<{ data: boolean }> {
    const url = API_PATH + '/character/' + charId;
    return Axios.delete(url, { headers: { 'auth-token': getUserToken() } });
}