import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import { getUserToken } from './utils/StorageManager';
import Loader from './components/Loader';
import { getUser, getCharactersAsync, deleteCharacterAsync, saveCharacterAsync, updateCharacterAsync } from './utils/fetchers';
import User from './models/User';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import HomePage from './pages/HomePage';
import CharacterBuilder from './components/characterBuilder/CharacterBuilder';
import DetailPage from './pages/DetailPage';
import ConnectPage from './pages/connectpage/ConnectPage';
import { Character } from './models/Character';

export const UserContext = createContext(null);
export const HeaderContext = createContext(null);

export default function App() {

    const token = getUserToken();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User>(null);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [headerTitle, setHeaderTitle] = useState<string>('');

    // Supprime un personnage
    async function handleDeleteCharacter(charId: string) {
        setIsLoading(true);
        try {
            const result = await deleteCharacterAsync(charId);
            if (result.data) {
                const index = characters.findIndex((char) => char._id === charId);
                if (index > -1) characters.splice(index, 1);
            }
            setIsLoading(false);
            setCharacters([...characters]);

        } catch (error) {
            setIsLoading(false);
            console.error(error.message);
        }
    }

    async function handleSaveCharacter(char: Character): Promise<boolean> {
        try {
            const charData = await updateCharacterAsync(char);
            const index = characters.findIndex((c) => c._id === charData.data._id);
            characters[index] = charData.data;
            setCharacters([...characters]);
        } catch (error) {
            console.error(error.message);
        }
        return true;
    }

    // sauvegarde un nouveau personnage
    async function handleCreateCharacter(char: Character) {
        setIsLoading(true);
        try {
            const character = await saveCharacterAsync(char);
            characters.push(character.data);
            setCharacters(characters);
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);
            console.error(error.message);
        }
    }

    useEffect(() => {
        const getUserDataFromToken = async () => {
            try {
                const user = await getUser(token);
                const characters = await getCharactersAsync();
                setUser(user.data);
                setCharacters(characters.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error(error.message);
            }
        }

        if (token) getUserDataFromToken();
        else setIsLoading(false);
    }, [token]);

    if (isLoading) {
        return <div className="App">
            <Loader />
        </div>;
    } else if (!user) {
        return <div className="App">
            <ConnectPage onConnect={(user) => setUser(user)} />
        </div>;
    } else {
        return (
            <div className="App">
                <UserContext.Provider value={{ user, setUser }}>
                    <HeaderContext.Provider value={{ headerTitle, setHeaderTitle }}>
                        <HashRouter basename='/'>
                            <Header title={headerTitle} />
                            <div className="app-content">
                                <Switch>
                                    <Route path='/' exact>
                                        <HomePage
                                            characters={characters}
                                            onDelete={handleDeleteCharacter}
                                            onDisconnect={() => setUser(null)}
                                        />
                                    </Route>
                                    <Route path="/create" exact>
                                        <CharacterBuilder onCreateCharacter={handleCreateCharacter} />
                                    </Route>
                                    <Route path="/detail/:id">
                                        <DetailPage
                                            onSaveCharacter={handleSaveCharacter}
                                            characters={characters}
                                        />
                                    </Route>
                                </Switch>
                            </div>
                        </HashRouter>
                    </HeaderContext.Provider>
                </UserContext.Provider>
            </div>
        );
    }
}