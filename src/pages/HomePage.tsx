import React, { useState, useContext } from 'react'
import { Card, CardMedia, CardContent, ListItemIcon, List, ListItem, ListItemText, ListSubheader, Divider, Dialog, DialogTitle, DialogActions, Button, IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Add, Delete, Settings } from '@material-ui/icons';
import T from 'i18n-react';
import CharacterItem from '../components/home/CharacterItem';
import SwipeableViews from 'react-swipeable-views';
import SettingsMenu from '../components/home/SettingsMenu';
import { UserContext } from '../App';
import { Character } from '../models/Character';

interface Props {
    onDisconnect: () => void;
    characters: Character[];
    onDelete: (charId: string) => void;
}

export default function HomePage(props: Props) {
    const { user } = useContext(UserContext);
    const [open, setOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory();
    const [tabs, setTabs] = useState<number[]>(props.characters.map(() => 1));
    const [index, setIndex] = useState<number>(-1);

    function onTabChange(tabIndex: number, charIndex: number) {
        setIndex(charIndex);
        tabs[charIndex] = tabIndex;
        setTabs([...tabs]);
        setOpen(true);
    }

    function handleClose() {
        tabs[index] = 1;
        setTabs([...tabs]);
        setOpen(false);
        setIndex(-1);
    }

    function handleDelete() {
        let id = props.characters[index]._id;
        tabs[index] = 1;
        setTabs([...tabs]);
        setOpen(false);
        setIndex(-1);
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
                    {props.characters.map((char: Character, charIndex: number) => (
                        <SwipeableViews
                            key={charIndex}
                            index={tabs[charIndex]}
                            onChangeIndex={(tabIndex) => onTabChange(tabIndex, charIndex)}
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
                    {T.translate('generic.confirmdelete', { who: props.characters[index] ? props.characters[index].name : '' })}
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