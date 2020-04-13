import React, { useState, useContext, useEffect } from 'react'
import { Card, CardMedia, CardContent, ListItemIcon, List, ListItem, ListItemText, ListSubheader, Divider, Dialog, DialogTitle, DialogActions, Button, IconButton } from '@material-ui/core';
import { useHistory, Prompt } from 'react-router-dom';
import { Add, Delete, Settings } from '@material-ui/icons';
import T from 'i18n-react';
import CharacterItem from './CharacterItem';
import SwipeableViews from 'react-swipeable-views';
import SettingsMenu from './SettingsMenu';
import { UserContext } from '../../App';
import { Character } from '../../models/Character';
import { CHAR_MAX } from '../../constants';
import { useStyles } from './styles';

interface Props {
    onDisconnect: () => void;
    characters: Character[];
    onDelete: (charId: string) => Promise<boolean>;
    onUpload: () => void;
}

export default function HomePage(props: Props) {
    const { user } = useContext(UserContext);
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory();
    const [tabs, setTabs] = useState<number[]>([]);
    const [index, setIndex] = useState<number>(-1);
    const [disabled, setDisabled] = useState<boolean>(false);

    useEffect(() => {
        setTabs(props.characters.map(() => 1))
    }, [setTabs, props.characters]);

    function onTabChange(tabIndex: number, charIndex: number) {
        setIndex(charIndex);
        tabs[charIndex] = tabIndex;
        setTabs([...tabs]);
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
        tabs[index] = 1;
        setTabs([...tabs]);
    }

    async function handleDelete() {
        setDisabled(true);
        let id = props.characters[index]._id;
        tabs[index] = 1;
        setTabs([...tabs]);
        setOpen(false);
        setIndex(-1);
        await props.onDelete(id);
        setDisabled(false);
    }

    function actionOnPrompt() {
        handleClose();
        return false;
    }

    function handleUpload() {
        setAnchorEl(null);
        props.onUpload();
    }

    return (
        <Card className={classes.card}>
            <CardMedia image="images/logo.png" title="logo" />
            <CardContent className={classes.cardContent} >
                <List
                    className={classes.mainList}
                    component="nav"
                    disablePadding
                    subheader={
                        <ListSubheader component="div" className={classes.subHeader}>
                            {T.translate('generic.heroslist')}
                            <span>{props.characters.length}/{CHAR_MAX}</span>
                        </ListSubheader>
                    }
                >
                    {!disabled && props.characters.map((char: Character, charIndex: number) => (
                        <SwipeableViews
                            key={charIndex}
                            index={tabs[charIndex]}
                            onChangeIndex={(tabIndex) => onTabChange(tabIndex, charIndex)}
                            resistance
                        >
                            <ListItem className={classes.listItem}>
                                <ListItemIcon>
                                    <Delete />
                                </ListItemIcon>
                            </ListItem>
                            <CharacterItem char={char} onSelectCharacter={(id) => history.push('/detail/' + id)} />
                        </SwipeableViews>
                    ))}
                </List>
                <Divider />
                <List component="nav">
                    <ListItem disabled={props.characters.length === CHAR_MAX} button onClick={() => history.push('/create')}>
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
            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} className={classes.settingsMenu}>
                <Settings />
            </IconButton>
            <SettingsMenu
                accountName={user.pseudo}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                onUpload={handleUpload}
                onDisconnect={props.onDisconnect}
            />
            <Dialog
                open={open}
                onClose={handleClose}
            >
                {open && <Prompt when={true} message={actionOnPrompt} />}
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