import React, { Component } from 'react'
import { Card, CardMedia, CardContent, ListItemIcon, List, ListItem, ListItemText, ListSubheader, Divider, Dialog, DialogTitle, DialogActions, Button, IconButton } from '@material-ui/core';
import Character from '../../models/Character';
import { RouteComponentProps } from 'react-router-dom';
import { Add, Delete, Settings } from '@material-ui/icons';
import T from 'i18n-react';
import CharacterItem from './CharacterItem';
import SwipeableViews from 'react-swipeable-views';
import SettingsMenu from './SettingsMenu';
import User from '../../models/User';

interface ownProps {
    user: User;
    characters: Character[];
    deleteChar: (charId: number) => void;
}

interface State {
    tabs: number[];
    open: boolean;
    selectedChar: Character;
    selectedIndex: number;
    anchorEl: HTMLElement;
}

type Props = ownProps & RouteComponentProps;

export default class Home extends Component<Props, State> {

    public constructor(props: Props) {
        super(props);

        this.state = {
            tabs: [],
            open: false,
            selectedChar: null,
            selectedIndex: -1,
            anchorEl: null
        }
    }

    public selectCharacter = (charId: number) => {
        this.props.history.push('/stats/' + charId);
    }

    public handleCreate = () => {
        this.props.history.push('/create');
    }

    public onTabChange = (index: number, key: number, char: Character) => {
        let tabs = this.state.tabs;
        tabs[key] = index;
        this.setState({
            tabs,
            open: true,
            selectedChar: char,
            selectedIndex: key
        });
    }

    public handleClose = (event: React.MouseEvent<any>) => {
        let tabs = this.state.tabs;
        tabs[this.state.selectedIndex] = 1;
        this.setState({
            open: false,
            selectedChar: null,
            selectedIndex: -1,
            tabs
        });
    }

    public handleDelete = (event: React.MouseEvent<any>) => {
        let id = this.state.selectedChar.id;
        let tabs = this.state.tabs;
        tabs[this.state.selectedIndex] = 1;
        this.setState({
            open: false,
            selectedChar: null,
            selectedIndex: -1,
            tabs
        });
        this.props.deleteChar(id);
    }

    public openMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState({ anchorEl: event.currentTarget });
    }

    public render() {

        return (
            <Card style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <span
                    style={{ position: "absolute", top: '8px', left: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.7rem' }}
                >
                    Connecté : {' ' + this.props.user.name}
                </span>
                <CardMedia
                    image="images/logo.png"
                    title="logo"
                    style={{ height: '200px' }}
                />
                <CardContent style={{ flex: 1, height: 'calc(100% - 300px)' }} >
                    <List
                        component="nav"
                        disablePadding
                        subheader={
                            <ListSubheader style={{ background: 'white' }} component="div">
                                {T.translate('generic.heroslist')}
                            </ListSubheader>
                        }
                        style={{ height: 'calc(100% - 64px)', overflowY: 'auto' }}
                    >
                        {this.props.characters.map((char: Character, key: number) => (
                            <SwipeableViews
                                key={key}
                                index={this.state.tabs.length ? this.state.tabs[key] : 1}
                                onChangeIndex={(index) => this.onTabChange(index, key, char)}
                                resistance
                            >
                                <ListItem style={{ background: '#F44336', margin: '5px 0', height: 'calc(100% - 10px)', color: 'white', flexDirection: 'row-reverse' }}>
                                    <ListItemIcon>
                                        <Delete style={{ color: 'white' }} />
                                    </ListItemIcon>
                                </ListItem>
                                <CharacterItem char={char} onSelectCharacter={this.selectCharacter} />
                            </SwipeableViews>
                        ))}
                    </List>
                    <Divider />
                    <List component="nav">
                        <ListItem button onClick={this.handleCreate}>
                            <ListItemIcon>
                                <Add color='secondary' />
                            </ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{ color: 'secondary' }}
                                primary={T.translate('generic.newcharacter')}
                            />
                        </ListItem>
                    </List>
                </CardContent>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {T.translate('generic.confirmdelete', { who: this.state.selectedChar ? this.state.selectedChar.name : '' })}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            {T.translate('generic.no')}
                        </Button>
                        <Button onClick={this.handleDelete} autoFocus color='secondary'>
                            {T.translate('generic.yes')}
                        </Button>
                    </DialogActions>
                </Dialog>
                <IconButton onClick={this.openMenu} style={{ position: 'absolute', top: '3px', right: '3px' }}>
                    <Settings style={{ color: 'white' }} />
                </IconButton>
                <SettingsMenu
                    anchorEl={this.state.anchorEl}
                    onClose={() => this.setState({ anchorEl: null })}
                />
            </Card>
        );
    }
}
