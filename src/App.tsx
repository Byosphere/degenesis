import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import { Route, Switch, HashRouter } from "react-router-dom";
import Character from './models/Character';
import CharacterBuilder from './components/characterBuilder/CharacterBuilder';
import { getUserToken } from './utils/StorageManager';
import User from './models/User';
import { getUser, saveCharacterAsync, getCharactersAsync, deleteCharacterAsync } from './utils/fetchers';
import Loader from './components/Loader';
import ConnectPage from './pages/ConnectPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';

interface State {
    headerTitle: string;
    displayTabs: boolean;
    user: User;
    loading: boolean;
    token: string;
    characters: Character[];
}

class App extends Component<{}, State> {

    constructor(props: any) {
        super(props);

        const token = getUserToken();

        this.state = {
            characters: [],
            headerTitle: '',
            displayTabs: false,
            user: null,
            loading: !!token,
            token
        };
    }

    public componentDidMount() {
        if (this.state.token) {
            getUser(this.state.token).then(({ data }) => {
                this.setState({ user: data });
                getCharactersAsync().then(({ data }) => {

                    this.setState({
                        characters: data.map((el) => new Character(el)),
                        loading: false
                    });
                });
            });
        }
    }

    public setHeader = (title: string) => {
        this.setState({ headerTitle: title });
    }

    public handleConnect = (user: User) => {
        this.setState({ user });
    }

    public handleDisconnect = () => {
        this.setState({ user: null });
    }

    public handleSaveCharacter = (char: Character) => {
        this.setState({ loading: true });
        saveCharacterAsync(char).then(({ data }) => {
            let characters = this.state.characters;
            characters.push(new Character(data));
            this.setState({
                characters,
                loading: false
            });
        }).catch((err) => {
            this.setState({ loading: false });
        });
    }

    public handleDeleteCharacter = (charId: string) => {
        this.setState({ loading: true });
        deleteCharacterAsync(charId).then(({ data }) => {
            if (data) {
                let characters = this.state.characters;
                const index = characters.findIndex((char) => char._id === charId);
                if (index > -1) characters.splice(index, 1);
                this.setState({
                    characters,
                    loading: false
                });
            } else {
                // ERROR
            }
        });
    }

    public render() {

        if (this.state.loading) {
            return <div className="App">
                <Loader />
            </div>;
        } else if (!this.state.user) {
            return <div className="App">
                <ConnectPage onConnect={this.handleConnect} />
            </div>;
        } else {
            return (
                <div className="App">
                    <HashRouter basename='/'>
                        <Header title={this.state.headerTitle} />
                        <div className="app-content">
                            <Switch>
                                <Route path='/' exact render={
                                    props => <HomePage {...props}
                                        onDisconnect={this.handleDisconnect}
                                        user={this.state.user}
                                        characters={this.state.characters}
                                        onDelete={this.handleDeleteCharacter}
                                    />
                                } />
                                <Route path="/create" exact render={
                                    props => <CharacterBuilder {...props}
                                        createCharacter={this.handleSaveCharacter}
                                        setHeader={this.setHeader}
                                    />
                                } />
                                <Route path="/detail/:id" render={
                                    props => <DetailPage {...props}
                                        setHeader={this.setHeader}
                                        onModifyCharacter={() => { /* TODO */ }}
                                        selectedCharacter={this.getSelectedChar(props)}
                                    />
                                } />
                            </Switch>
                        </div>
                    </HashRouter>
                </div>
            );
        }
    }

    private getSelectedChar(props): Character {
        const char = this.state.characters.find((char) => props.match.params.id === char._id);
        return char;
    }
}

export default App;
