import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import { Route, Switch, HashRouter } from "react-router-dom";
import Stats from './components/stats/Stats';
import Inventory from './components/inventory/Inventory';
import Notes from './components/notes/Notes';
import Potentials from './components/potentials/Potentials';
import Navigator from './components/navigator/Navigator';
import Character from './models/Character';
import CharacterBuilder from './components/characterBuilder/CharacterBuilder';
import Home from './components/home/Home';
import { getCharacters, storeCharacter, deleteCharacter } from './utils/StorageManager';

interface State {
    characters: Character[];
    tabValue: number;
    headerTitle: string;
    displayTabs: boolean;
}

class App extends Component<{}, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            characters: getCharacters(),
            tabValue: 0,
            headerTitle: '',
            displayTabs: false
        };
    }

    public handleTabChange = (value: any) => {
        this.setState({ tabValue: value });
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

        const { tabValue, characters } = this.state;

        return (
            <div className="App">
                <HashRouter basename='/'>
                    <Header
                        onToggleTab={this.handleTabChange}
                        tab={tabValue}
                        displayTabs={this.state.displayTabs}
                        title={this.state.headerTitle}
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
                                    tab={tabValue}
                                    onTabChange={this.handleTabChange}
                                    onCharChange={this.handleCharChange}
                                    setHeader={this.setHeader}
                                />
                            } />
                            <Route path="/inventory" render={
                                props => <Inventory {...props}
                                    char={null}
                                    tab={tabValue}
                                    onTabChange={this.handleTabChange}
                                />
                            } />
                            <Route path="/potentials" render={
                                props => <Potentials {...props}
                                    char={null}
                                    tab={tabValue}
                                    onTabChange={this.handleTabChange}
                                />
                            } />
                            <Route path="/notes" render={
                                props => <Notes {...props}
                                    char={null}
                                    tab={tabValue}
                                    onTabChange={this.handleTabChange}
                                    onChangeChar={this.handleCharChange}
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
