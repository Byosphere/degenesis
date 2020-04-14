import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import { getUserToken } from './utils/StorageManager';
import Loader from './components/loader/Loader';
import { getUser, getCharactersAsync, deleteCharacterAsync, saveCharacterAsync, updateCharacterAsync } from './utils/fetchers';
import User from './models/User';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import CharacterBuilder from './pages/characterbuilderpage/CharacterBuilder';
import DetailPage from './pages/detailpage/DetailPage';
import ConnectPage from './pages/connectpage/ConnectPage';
import { Character } from './models/Character';
import CustomSnackbar from './components/customsnackbar/CustomSnackbar';
import UploadManager from './components/uploadmanager/UploadManager';
import T from 'i18n-react';

export const UserContext = createContext(null);
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
        return <Loader />;
    } else {
        return (
            <div className="App">
                <UserContext.Provider value={{ user, setUser }}>
                    <SnackbarContext.Provider value={{ setSnackbar }}>
                        <HashRouter basename='/'>
                            <Switch>
                                {!user ? <Redirect from='/' exact to='/connect' /> : <Redirect from='/connect' exact to='/' />}
                                <Route path='/' exact>
                                    <HomePage
                                        characters={characters}
                                        onDelete={handleDeleteCharacter}
                                        onDisconnect={() => setUser(null)}
                                        onUpload={() => setOpen(true)}
                                    />
                                </Route>
                                <Route path="/connect" exact>
                                    <ConnectPage onConnect={(user) => setUser(user)} />
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
                            <UploadManager
                                open={open}
                                onClose={() => setOpen(false)}
                                onSave={handleCreateCharacter}
                            />
                            {snackbar && <CustomSnackbar {...snackbar} setSnackbar={setSnackbar} />}
                        </HashRouter>
                    </SnackbarContext.Provider>
                </UserContext.Provider>
            </div>
        );
    }
}