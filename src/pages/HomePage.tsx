import React, { Component, useState, useEffect, useContext } from 'react'
import { Card, CardMedia, CardContent, ListItemIcon, List, ListItem, ListItemText, ListSubheader, Divider, Dialog, DialogTitle, DialogActions, Button, IconButton } from '@material-ui/core';
import Character from '../models/Character';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Add, Delete, Settings } from '@material-ui/icons';
import T from 'i18n-react';
import CharacterItem from '../components/home/CharacterItem';
import SwipeableViews from 'react-swipeable-views';
import SettingsMenu from '../components/home/SettingsMenu';
import User from '../models/User';
import { UserContext } from '../App';

interface Props {
    onDisconnect: () => void;
    characters: Character[];
    onDelete: (charId: string) => void;
}

interface Slider {
    tabs: number[];
    selectedChar: Character;
    index: number;
}

export default function HomePage(props: Props) {
    const { user } = useContext(UserContext);
    const [open, setOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory();
    const [slider, setSlider] = useState<Slider>({
        tabs: props.characters.map(() => 1),
        selectedChar: null,
        index: -1
    });

    function onTabChange(index: number, key: number, char: Character) {
        let tabs = slider.tabs;
        tabs[key] = index;

        setSlider({ tabs, selectedChar: char, index });
        setOpen(true);
    }

    function handleClose() {
        let tabs = slider.tabs;
        tabs[slider.index] = 1;

        setSlider({ tabs, selectedChar: null, index: -1 });
        setOpen(false);
    }

    function handleDelete() {
        let id = slider.selectedChar._id;
        let tabs = slider.tabs;
        tabs[slider.index] = 1;

        setSlider({ tabs, selectedChar: null, index: -1 });
        setOpen(false);
        props.onDelete(id);
    }

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
                    {props.characters.map((char: Character, key: number) => (
                        <SwipeableViews
                            key={key}
                            index={slider.tabs.length ? slider.tabs[key] : 1}
                            onChangeIndex={(index) => onTabChange(index, key, char)}
                            resistance
                        >
                            <ListItem style={{ background: '#F44336', margin: '5px 0', height: 'calc(100% - 10px)', color: 'white', flexDirection: 'row-reverse' }}>
                                <ListItemIcon>
                                    <Delete style={{ color: 'white' }} />
                                </ListItemIcon>
                            </ListItem>
                            <CharacterItem char={char} onSelectCharacter={(id) => history.push('/detail/' + id)} />
                        </SwipeableViews>
                    ))}
                </List>
                <Divider />
                <List component="nav">
                    <ListItem button onClick={() => history.push('/create')}>
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
            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} style={{ position: 'absolute', top: '3px', right: '3px' }}>
                <Settings style={{ color: 'white' }} />
            </IconButton>
            <SettingsMenu
                accountName={user.pseudo}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                onDisconnect={props.onDisconnect}
            />
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    {T.translate('generic.confirmdelete', { who: slider.selectedChar ? slider.selectedChar.name : '' })}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {T.translate('generic.no')}
                    </Button>
                    <Button onClick={handleDelete} autoFocus color='secondary'>
                        {T.translate('generic.yes')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}