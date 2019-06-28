import React, { Component } from 'react'
import { Card, CardMedia, CardContent, ListItemIcon, List, ListItem, ListItemText, ListSubheader, Divider, Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';
import Character from '../../models/Character';
import { RouteComponentProps } from 'react-router-dom';
import { Add, Delete } from '@material-ui/icons';
import T from 'i18n-react';
import CharacterItem from './CharacterItem';
import SwipeableViews from 'react-swipeable-views';

interface ownProps {
    characters: Character[];
    setHeader: (title: string) => void;
    deleteChar: (charId: number) => void;
}

interface State {
    tabs: number[];
    open: boolean;
    selectedChar: Character;
    selectedIndex: number;
}

type Props = ownProps & RouteComponentProps;

export default class Home extends Component<Props, State> {

    public constructor(props: Props) {
        super(props);

        this.state = {
            tabs: [],
            open: false,
            selectedChar: null,
            selectedIndex: -1
        }
    }

    public componentDidMount() {
        this.props.setHeader(T.translate('navigator.home') as string);
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
        tabs[this.state.selectedIndex] = 0;
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
        tabs[this.state.selectedIndex] = 0;
        this.setState({
            open: false,
            selectedChar: null,
            selectedIndex: -1,
            tabs
        });
        this.props.deleteChar(id);
    }

    public render() {
        return (
            <Card style={{ flex: 1, display: "flex", flexDirection: "column" }}>
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
                                index={this.state.tabs[key]}
                                onChangeIndex={(index) => this.onTabChange(index, key, char)}
                                resistance
                            >
                                <CharacterItem char={char} onSelectCharacter={this.selectCharacter} />
                                <ListItem style={{ background: '#F44336', margin: '5px 0', height: 'calc(100% - 10px)', color: 'white' }}>
                                    <ListItemIcon>
                                        <Delete style={{ color: 'white' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={T.translate('generic.delete')} />
                                </ListItem>
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
                                primary="Créer un nouveau personnage"
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
            </Card>
        );
    }

}
