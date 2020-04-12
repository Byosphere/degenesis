import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import { getUserToken } from './utils/StorageManager';
import Loader from './components/Loader';
import { getUser, getCharactersAsync, deleteCharacterAsync, saveCharacterAsync, updateCharacterAsync } from './utils/fetchers';
import User from './models/User';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CharacterBuilder from './components/characterBuilder/CharacterBuilder';
import DetailPage from './pages/DetailPage';
import ConnectPage from './pages/connectpage/ConnectPage';
import { Character } from './models/Character';
import CustomSnackbar from './components/CustomSnackbar';
import UploadManager from './components/UploadManager';
import T from 'i18n-react';

export const UserContext = createContext(null);
export const HeaderContext = createContext(null);
export const SnackbarContext = createContext(null);

interface Snackbar {
    type: 'error' | 'success';
    message: string;
}

export default function App() {

    const token = getUserToken();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User>(null);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [headerTitle, setHeaderTitle] = useState<string>('');
    const [exp, setExp] = useState<number>(0);
    const [snackbar, setSnackbar] = useState<Snackbar>(null);
    const [open, setOpen] = useState<boolean>(false);

    // Supprime un personnage
    async function handleDeleteCharacter(charId: string): Promise<boolean> {
        try {
            const result = await deleteCharacterAsync(charId);
            if (result.data) {
                const index = characters.findIndex((char) => char._id === charId);
                if (index > -1) characters.splice(index, 1);
            }
            setCharacters([...characters]);
            return true;
        } catch (error) {
            console.error(error.message);
            return false;
        }
    }

    async function handleSaveCharacter(char: Character): Promise<boolean> {
        try {
            const charData = await updateCharacterAsync(char);
            const index = characters.findIndex((c) => c._id === charData.data._id);
            characters[index] = charData.data;
            setCharacters([...characters]);
        } catch (error) {
            setSnackbar({
                type: 'error',
                message: error.message
            });
            return false;
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
            setSnackbar({
                type: 'success',
                message: T.translate('generic.createsuccess') as string
            });

        } catch (error) {
            setIsLoading(false);
            setSnackbar({
                type: 'error',
                message: error.message
            });
        }
    }

    async function handleAddXp(id: string, value: number): Promise<boolean> {
        let character = characters.find((char) => char._id === id);
        character.exp = character.exp + value;
        setExp(character.exp);
        const result = await handleSaveCharacter(character);
        return result;
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
            <HashRouter basename='/'>
                <ConnectPage onConnect={(user) => setUser(user)} />
            </HashRouter>
        </div>;
    } else {
        return (
            <div className="App">
                <UserContext.Provider value={{ user, setUser }}>
                    <HeaderContext.Provider value={{ headerTitle, setHeaderTitle, exp, setExp }}>
                        <SnackbarContext.Provider value={{ setSnackbar }}>
                            <HashRouter basename='/'>
                                <Header title={headerTitle} exp={exp} onAddXp={handleAddXp} />
                                <div className="app-content">
                                    <Switch>
                                        <Route path='/' exact>
                                            <HomePage
                                                characters={characters}
                                                onDelete={handleDeleteCharacter}
                                                onDisconnect={() => setUser(null)}
                                                onUpload={() => setOpen(true)}
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
                                {snackbar && <CustomSnackbar {...snackbar} setSnackbar={setSnackbar} />}
                                <UploadManager
                                    open={open}
                                    onClose={() => setOpen(false)}
                                    onSave={handleCreateCharacter}
                                />
                            </HashRouter>
                        </SnackbarContext.Provider>
                    </HeaderContext.Provider>
                </UserContext.Provider>
            </div>
        );
    }
}