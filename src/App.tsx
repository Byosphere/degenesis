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
import char from './data/data.json';
import char2 from './data/data1.json';
import char3 from './data/data2.json';
import CharacterBuilder from './components/characterBuilder/CharacterBuilder';
import Home from './components/home/Home';

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
            characters: [char, char2, char3],
            selectedCharacter: null,
            tabValue: 0
        };
    }

    public handleTabChange = (value: any) => {
        this.setState({ tabValue: value });
    }

    public handleCharChange = (char: Character) => {
        this.setState({ selectedCharacter: char });
    }

    public render() {

        const { tabValue, selectedCharacter, characters } = this.state;

        return (
            <div className="App">
                <Router >
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
                                    onChangeChar={this.handleCharChange}
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
