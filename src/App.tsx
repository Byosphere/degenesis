import React, { useState, createContext } from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import CharacterBuilder from './pages/characterbuilderpage/CharacterBuilder';
import DetailPage from './pages/detailpage/DetailPage';
import { Character } from './models/Character';
import CustomSnackbar from './components/customsnackbar/CustomSnackbar';
import UploadManager from './components/uploadmanager/UploadManager';
import T from 'i18n-react';
import { useLocalStorage } from './utils/helper';
import { v4 as uuidv4 } from 'uuid';

export const UserContext = createContext(null);
export const SnackbarContext = createContext(null);

interface Snackbar {
    type: 'error' | 'success';
    message: string;
}

export default function App() {

    const [characters, setCharacters] = useLocalStorage<Character[]>('characters', []);
    const [snackbar, setSnackbar] = useState<Snackbar>(null);
    const [open, setOpen] = useState<boolean>(false);

    // Supprime un personnage
    async function handleDeleteCharacter(charId: string): Promise<boolean> {
        try {
            const index = characters.findIndex((char) => char._id === charId);
            if (index > -1) characters.splice(index, 1);
            setCharacters([...characters]);
            return true;
        } catch (error) {
            console.error(error.message);
            return false;
        }
    }

    async function handleSaveCharacter(char: Character): Promise<boolean> {
        try {
            const index = characters.findIndex((c) => c._id === char._id);
            characters[index] = char;
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

    function handleCreateCharacter(char: Character) {
        try {
            const character = { ...char, _id: uuidv4() }
            characters.push(character);
            setCharacters(characters);
            setSnackbar({
                type: 'success',
                message: T.translate('generic.createsuccess') as string
            });

        } catch (error) {
            setSnackbar({
                type: 'error',
                message: error.message
            });
        }
    }

    return (
        <div className="App">
            <SnackbarContext.Provider value={{ setSnackbar }}>
                <HashRouter basename='/'>
                    <div className='router'>
                        <Switch>
                            <Route path='/' exact>
                                <HomePage
                                    characters={characters}
                                    onDelete={handleDeleteCharacter}
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
                        <UploadManager
                            open={open}
                            onClose={() => setOpen(false)}
                            onSave={handleCreateCharacter}
                        />
                        {snackbar && <CustomSnackbar {...snackbar} setSnackbar={setSnackbar} />}
                    </div>
                </HashRouter>
            </SnackbarContext.Provider>
        </div>
    );
}