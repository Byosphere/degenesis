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

interface State {
    character: Character;
    tabValue: number;
}

interface Props {

}

class App extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            character: char,
            tabValue: 0
        };
    }

    public handleTabChange = (value: any) => {
        this.setState({ tabValue: value });
    }

    public render() {
        return (
            <div className="App">
                <Router >
                    <Header onToggleTab={this.handleTabChange} tab={this.state.tabValue} />
                    <div className="app-content">
                        <Switch>
                            <Route path="/" exact render={
                                props => <Stats {...props}
                                    char={this.state.character}
                                    tab={this.state.tabValue}
                                    onTabChange={this.handleTabChange}
                                />
                            } />
                            <Route path="/inventory" render={
                                props => <Inventory {...props}
                                    char={this.state.character}
                                    tab={this.state.tabValue}
                                    onTabChange={this.handleTabChange}
                                />
                            } />
                            <Route path="/potentials" render={
                                props => <Potentials {...props}
                                    char={this.state.character}
                                    tab={this.state.tabValue}
                                    onTabChange={this.handleTabChange}
                                />
                            } />
                            <Route path="/notes" render={
                                props => <Notes {...props}
                                    char={this.state.character}
                                    tab={this.state.tabValue}
                                    onTabChange={this.handleTabChange}
                                />
                            } />
                        </Switch>
                    </div>
                    <Navigator />
                </Router >
            </div>
        );
    }
}

export default App;
