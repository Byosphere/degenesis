import React, { useState, useMemo } from 'react';
import { useParams, Prompt, useHistory, Redirect } from 'react-router-dom';
import Navigator from '../components/navigator/Navigator';
import NotesPage from './NotesPage';
import InventoryPage from './inventorypage/InventoryPage';
import { Character } from '../models/Character';
import PotentialsPage from './potentialspage/PotentialsPage';
import StatsPage from './statspage/StatsPage';
import { Fab, Snackbar, CircularProgress, Dialog, DialogContent, DialogActions, Button, DialogContentText, DialogTitle, Zoom } from '@material-ui/core';
import { Save, Check } from '@material-ui/icons';
import T from 'i18n-react';

interface Props {
    onSaveCharacter: (character: Character) => Promise<boolean>;
    characters: Character[];
}

export default function DetailPage(props: Props) {
    const { id } = useParams();
    const history = useHistory();
    const [tab, setTab] = useState<number>(0);
    const [dirty, setDirty] = useState<boolean>(false);
    const selectedCharacter = useMemo(() => props.characters.find((char) => char._id === id), [id, props.characters]);
    const [character, setCharacter] = useState<Character>(JSON.parse(JSON.stringify(selectedCharacter)));
    const [open, setOpen] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<string>('');

    function actionOnPrompt(location): boolean {
        if (dialogOpen) {
            setDialogOpen('');
            return true;
        } else {
            setDialogOpen(location.pathname);
            return false;
        }
    }

    function handleChange(char: Character) {
        setCharacter({ ...char });
        setDirty(true);
    }

    async function handleClick() {
        setDisabled(true);
        let result = await props.onSaveCharacter(character);
        if (result) {
            setOpen(true);
            setDirty(false);
        }
        setDisabled(false);
    }

    function handleCancel() {
        setDirty(false);
        history.push(dialogOpen);
    }

    async function handleOk() {
        setDisabled(true);
        let result = await props.onSaveCharacter(character);
        if (result) {
            setOpen(true);
            setDirty(false);
            history.push(dialogOpen);
        } else {
            // TODO
            setDisabled(false);
        }
    }

    function handleTabChange(event, value: number) {
        if (value <= 3) {
            setTab(value);
        } else {
            history.push('/');
        }
    }

    if (!id) return <Redirect to={'/'} />;

    return (
        <div style={{ height: 'calc(100% - 57px)', overflowY: 'auto' }}>
            <Prompt when={dirty} message={actionOnPrompt} />
            {tab === 0 && <StatsPage char={character} onChange={handleChange} />}
            {tab === 1 && <InventoryPage char={character} onChange={handleChange} />}
            {tab === 2 && <PotentialsPage char={character} onChange={handleChange} />}
            {tab === 3 && <NotesPage char={character} onChange={handleChange} />}
            <Navigator currentTab={tab} onTabChange={handleTabChange} />
            <Zoom
                in={dirty}
                unmountOnExit
            >
                <Fab
                    style={{
                        position: 'absolute',
                        right: '24px',
                        top: '24px',
                        zIndex: 1200,
                        pointerEvents: disabled ? 'none' : 'initial'
                    }}
                    color="secondary"
                    aria-label="save"
                    onClick={handleClick}
                >
                    {disabled ? <CircularProgress style={{ color: 'white' }} /> : <Save />}
                </Fab>
            </Zoom>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={<span style={{ display: 'flex', alignItems: 'center' }}>
                    <Check style={{ marginRight: '16px' }} />{T.translate('generic.charactersaved')}
                </span>}
                classes={{ root: 'success-snackbar' }}
            />
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                open={!!dialogOpen}
            >
                <DialogTitle>Alerte</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {T.translate('generic.savewarning', { name: character.name })}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} disabled={disabled} color="primary">
                        {T.translate('generic.no')}
                    </Button>
                    <Button onClick={handleOk} disabled={disabled} color="secondary">
                        {T.translate('generic.yes')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}