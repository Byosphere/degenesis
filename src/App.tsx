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
import { getCharacters, storeCharacter, deleteCharacter } from './utils/StorageManager';

interface State {
    characters: Character[];
    headerTitle: string;
    displayTabs: boolean;
}

class App extends Component<{}, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            characters: getCharacters(),
            headerTitle: '',
            displayTabs: false
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
                        <Switch>
                            <Route path='/' exact render={
                                props => <Home {...props}
                                    characters={characters}
                                    setHeader={this.setHeader}
                                    deleteChar={this.handleDeleteChar}
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
                        </Switch>
                    </div>
                </HashRouter >
            </div>
        );
    }
}

export default App;
