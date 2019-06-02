import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Stats from './components/stats/Stats';
import Inventory from './components/inventory/Inventory';
import Notes from './components/notes/Notes';
import Potentials from './components/potentials/Potentials';
import Documents from './components/documents/Documents';
import Navigator from './components/navigator/Navigator';
import Character from './models/Character';
import char from './data/data.json';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import T from 'i18n-react';

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
                    <Header />
                    <div className="app-content">
                        <AppBar position="static" color="default">
                            <Tabs
                                value={this.state.tabValue}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                                onChange={(event, value) => this.handleTabChange(value)}
                            >
                                <Tab label={T.translate('generic.view')} />
                                <Tab label={T.translate('generic.edit')} />
                            </Tabs>
                        </AppBar>
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
                            <Route path="/notes" component={Notes} />
                            <Route path="/documents" component={Documents} />
                        </Switch>
                    </div>
                    <Navigator />
                </Router >
            </div>
        );
    }
}

export default App;
