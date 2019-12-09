import User from "../models/User";

export function userConnect(name: string, password: string): {error: boolean, user: User} {
    return {
        error: false,
        user: {
            id: 'qsdkl lkqsjd lqks',
            name: 'dsfsf',
            password: 'dsfsdf'
        }
    };
}