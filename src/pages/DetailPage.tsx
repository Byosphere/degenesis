import React, { useState, useMemo, useEffect, useContext } from 'react';
import { useParams, Prompt, useHistory, Redirect } from 'react-router-dom';
import Navigator from '../components/navigator/Navigator';
import NotesPage from './NotesPage';
import InventoryPage from './inventorypage/InventoryPage';
import { Character } from '../models/Character';
import PotentialsPage from './potentialspage/PotentialsPage';
import StatsPage from './statspage/StatsPage';
import { CircularProgress, Dialog, DialogContent, DialogActions, Button, DialogContentText, DialogTitle, IconButton, Badge } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import T from 'i18n-react';
import { HeaderContext, SnackbarContext } from '../App';
import BattlePage from './battlepage/BattlePage';

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
    const [disabled, setDisabled] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<string>('');
    const { setExp } = useContext(HeaderContext);
    const { setSnackbar } = useContext(SnackbarContext);
    const [step, setStep] = useState<number>(0);

    useEffect(() => {
        setExp(character.exp);
    }, [character.exp, setExp]);

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
            setDirty(false);
            setSnackbar({
                type: 'success',
                message: T.translate('generic.charactersaved') as string
            });
        }
        setDisabled(false);
    }

    function handleCancel() {
        setDirty(false);
        history.replace(dialogOpen);
    }

    async function handleOk() {
        setDisabled(true);
        let result = await props.onSaveCharacter(character);
        if (result) {
            setDirty(false);
            history.replace(dialogOpen);
            setSnackbar({
                type: 'success',
                message: T.translate('generic.charactersaved') as string
            });
        } else {
            // TODO
            setDisabled(false);
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
            {tab === 4 && <BattlePage char={character} onChange={handleChange} step={step} setStep={setStep} />}
            <Navigator currentTab={tab} onTabChange={(event, value) => setTab(value)} />
            <IconButton
                style={{
                    position: 'absolute',
                    right: '4px',
                    top: '4px',
                    zIndex: 1200,
                    pointerEvents: disabled ? 'none' : 'initial',
                    color: 'white',
                    opacity: (!dirty) ? 0.4 : 1
                }}
                disabled={disabled || !dirty}
                onClick={handleClick}
            >
                <Badge color="secondary" invisible={!dirty || disabled} variant="dot">
                    {disabled ? <CircularProgress disableShrink size={24} style={{ color: 'white' }} /> : <Save />}
                </Badge>
            </IconButton>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                open={!!dialogOpen}
            >
                <DialogTitle>{T.translate('generic.savewarningtitle')}</DialogTitle>
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