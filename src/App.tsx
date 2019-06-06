import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Stats from './components/stats/Stats';
import Inventory from './components/inventory/Inventory';
import Notes from './components/notes/Notes';
import Potentials from './components/potentials/Potentials';
import Navigator from './components/navigator/Navigator';
import Character from './models/Character';
import CharacterBuilder from './components/characterBuilder/CharacterBuilder';
import Home from './components/home/Home';
import { getCharacters, storeCharacter } from './utils/StorageManager';

interface State {
    characters: Character[];
    selectedCharacter: Character;
    tabValue: number;
}

interface Props {

}

class App extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            characters: getCharacters(),
            selectedCharacter: null,
            tabValue: 0
        };
    }

    public handleTabChange = (value: any) => {
        this.setState({ tabValue: value });
    }

    public handleCharChange = (char: Character, save: boolean) => {
        this.setState({ selectedCharacter: char });
        if (char && save) storeCharacter(char);
    }

    public handleCreateCharacter = (char: Character) => {
        storeCharacter(char);
        this.setState({
            characters: getCharacters()
        });
    }

    public render() {

        const { tabValue, selectedCharacter, characters } = this.state;

        return (
            <div className="App">
                <Router>
                    <Header
                        onToggleTab={this.handleTabChange}
                        onChangeChar={this.handleCharChange}
                        tab={tabValue}
                        displayTabs={Boolean(selectedCharacter)}
                    />
                    <div className="app-content">
                        <Switch>
                            <Route path="/create" exact render={
                                props => <CharacterBuilder {...props}
                                    characters={characters}
                                    selectedCharacter={selectedCharacter}
                                    createCharacter={this.handleCreateCharacter}
                                />
                            } />
                            <Route path="/stats" exact render={
                                props => <Stats {...props}
                                    char={selectedCharacter}
                                    tab={tabValue}
                                    onTabChange={this.handleTabChange}
                                    onCharChange={this.handleCharChange}
                                />
                            } />
                            <Route path="/inventory" render={
                                props => <Inventory {...props}
                                    char={selectedCharacter}
                                    tab={tabValue}
                                    onTabChange={this.handleTabChange}
                                />
                            } />
                            <Route path="/potentials" render={
                                props => <Potentials {...props}
                                    char={selectedCharacter}
                                    tab={tabValue}
                                    onTabChange={this.handleTabChange}
                                />
                            } />
                            <Route path="/notes" render={
                                props => <Notes {...props}
                                    char={selectedCharacter}
                                    tab={tabValue}
                                    onTabChange={this.handleTabChange}
                                />
                            } />
                            <Route path='/' render={
                                props => <Home {...props}
                                    characters={characters}
                                    selectedCharacter={selectedCharacter}
                                    onChangeChar={this.handleCharChange}
                                />
                            } />
                        </Switch>
                    </div>
                    {selectedCharacter && <Navigator />}
                </Router >
            </div>
        );
    }
}

export default App;
