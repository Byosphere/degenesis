import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import { getUserToken } from './utils/StorageManager';
import Loader from './components/Loader';
import { getUser, getCharactersAsync, deleteCharacterAsync, saveCharacterAsync } from './utils/fetchers';
import User from './models/User';
import Character from './models/Character';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import HomePage from './pages/HomePage';
import CharacterBuilder from './components/characterBuilder/CharacterBuilder';
import DetailPage from './pages/DetailPage';
import ConnectPage from './pages/connectpage/ConnectPage';

export default function App() {

    const token = getUserToken();

    const UserContext = createContext(null);
    const HeaderContext = createContext(null);

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
            setCharacters(characters);

        } catch (error) {
            setIsLoading(false);
            console.error(error.message);
        }
    }

    // Modifie un personnage
    async function handleEditCharacter(char: Character) {
        setIsLoading(true);
        try {
            const character = await saveCharacterAsync(char);
            const index = characters.findIndex((c) => c._id === char._id);
            characters[index] = new Character(character.data);
            setCharacters(characters);

        } catch (error) {
            setIsLoading(false);
            console.error(error.message);
        }
    }

    // sauvegarde un nouveau personnage
    async function handleSaveNewCharacter(char: Character) {
        setIsLoading(true);
        try {
            const character = await saveCharacterAsync(char);
            characters.push(new Character(character.data));
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
                setCharacters(characters.data.map((el) => new Character(el)));
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
                    <HeaderContext.Provider value={{}}>
                        <HashRouter basename='/'>
                            <Header title={headerTitle} />
                            <div className="app-content">
                                <Switch>
                                    <Route path='/' exact render={
                                        props => <HomePage {...props}
                                            onDisconnect={() => setUser(null)}
                                            user={user}
                                            characters={characters}
                                            onDelete={handleDeleteCharacter}
                                        />
                                    } />
                                    <Route path="/create" exact render={
                                        props => <CharacterBuilder {...props}
                                            createCharacter={handleSaveNewCharacter}
                                            setHeader={setHeaderTitle}
                                        />
                                    } />
                                    <Route path="/detail/:id" render={
                                        props => <DetailPage {...props}
                                            setHeader={setHeaderTitle}
                                            onModifyCharacter={handleEditCharacter}
                                            selectedCharacter={getSelectedChar(props)}
                                        />
                                    } />
                                </Switch>
                            </div>
                        </HashRouter>
                    </HeaderContext.Provider>
                </UserContext.Provider>
            </div>
        );
    }

    function getSelectedChar(props): Character {
        return characters.find((char: Character) => props.match.params.id === char._id);
    }
}