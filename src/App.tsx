import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import { Route, Switch, HashRouter } from "react-router-dom";
import Stats from './components/stats/Stats';
import Inventory from './components/inventory/Inventory';
import Notes from './components/notes/Notes';
import Potentials from './components/potentials/Potentials';
import Character from './models/Character';
import CharacterBuilder from './components/characterBuilder/CharacterBuilder';
import Home from './components/home/Home';
import { getCharacters, storeCharacter, deleteCharacter, getUser } from './utils/StorageManager';
import Connect from './components/connect/Connect';
import User from './models/User';

interface State {
    characters: Character[];
    headerTitle: string;
    displayTabs: boolean;
    user: User;
}

class App extends Component<{}, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            characters: getCharacters(),
            headerTitle: '',
            displayTabs: false,
            user: getUser()
        };
    }

    public handleCharChange = (char: Character, save: boolean) => {
        this.forceUpdate();
        if (char && save) storeCharacter(char);
    }

    public handleCreateCharacter = (char: Character) => {
        storeCharacter(char);
        this.setState({
            characters: getCharacters()
        });
    }

    public handleDeleteChar = (charId: number) => {
        deleteCharacter(charId);
        this.setState({
            characters: getCharacters()
        });
    }

    public setHeader = (title: string) => {
        this.setState({ headerTitle: title });
    }

    public handleConnected = (user: User) => {
        this.setState({
            user
        });
    }

    public render() {

        const { characters } = this.state;

        return (
            <div className="App">
                <HashRouter basename='/'>
                    <Header
                        title={this.state.headerTitle}
                        characters={characters}
                    />
                    <div className="app-content">
                        {this.state.user && <Switch>
                            <Route path='/' exact render={
                                props => <Home {...props}
                                    characters={characters}
                                    deleteChar={this.handleDeleteChar}
                                    user={this.state.user}
                                />
                            } />
                            <Route path="/create" exact render={
                                props => <CharacterBuilder {...props}
                                    characters={characters}
                                    createCharacter={this.handleCreateCharacter}
                                    setHeader={this.setHeader}
                                />
                            } />
                            <Route path="/stats/:id" render={
                                props => <Stats {...props}
                                    characters={characters}
                                    onCharChange={this.handleCharChange}
                                    setHeader={this.setHeader}
                                />
                            } />
                            <Route path="/inventory/:id" render={
                                props => <Inventory {...props}
                                    characters={characters}
                                    onCharChange={this.handleCharChange}
                                    setHeader={this.setHeader}
                                />
                            } />
                            <Route path="/potentials/:id" render={
                                props => <Potentials {...props}
                                    characters={characters}
                                    onCharChange={this.handleCharChange}
                                    setHeader={this.setHeader}
                                />
                            } />
                            <Route path="/notes/:id" render={
                                props => <Notes {...props}
                                    characters={characters}
                                    onCharChange={this.handleCharChange}
                                    setHeader={this.setHeader}
                                />
                            } />
                        </Switch>}
                        {!this.state.user && <Connect onConnected={this.handleConnected} />}
                    </div>
                </HashRouter >
            </div>
        );
    }
}

export default App;
