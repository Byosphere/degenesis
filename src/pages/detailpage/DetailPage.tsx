import React, { useState, useMemo, useEffect, useContext, createContext } from 'react';
import { useParams, Prompt, useHistory, Redirect } from 'react-router-dom';
import Navigator from '../../components/navigator/Navigator';
import NotesPage from '../notespage/NotesPage';
import InventoryPage from '../inventorypage/InventoryPage';
import { Character } from '../../models/Character';
import PotentialsPage from '../potentialspage/PotentialsPage';
import StatsPage from '../statspage/StatsPage';
import { Dialog, DialogContent, DialogActions, Button, DialogContentText, DialogTitle } from '@material-ui/core';
import T from 'i18n-react';
import { SnackbarContext } from '../../App';
import BattlePage from '../battlepage/BattlePage';
import { useStyles } from './styles';
import Header from '../../components/header/Header';

interface Props {
    onSaveCharacter: (character: Character) => Promise<boolean>;
    characters: Character[];
}

export const HeaderContext = createContext(null);

export default function DetailPage(props: Props) {
    const { id } = useParams();
    const history = useHistory();
    const [tab, setTab] = useState<number>(0);
    const [dirty, setDirty] = useState<boolean>(false);
    const selectedCharacter = useMemo(() => props.characters.find((char) => char._id === id), [id, props.characters]);
    const [character, setCharacter] = useState<Character>(JSON.parse(JSON.stringify(selectedCharacter)));
    const [disabled, setDisabled] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<string>('');
    const { setSnackbar } = useContext(SnackbarContext);
    const [step, setStep] = useState<number>(0);
    const [headerTitle, setHeaderTitle] = useState<string>('');
    const [xp, setXp] = useState<number>(0);
    const classes = useStyles();

    useEffect(() => {
        setXp(character.exp);
    }, [character.exp, setXp]);

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

    async function handleSave() {
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
            setSnackbar({
                type: 'error',
                message: T.translate('generic.error') as string
            });
            setDisabled(false);
        }
    }
    function handleXpChange(value: number) {
        setXp(value);
        setDirty(true);
        setCharacter({ ...character, exp: character.exp + value });
    }

    if (!id) return <Redirect to={'/'} />;

    return (
        <HeaderContext.Provider value={{ headerTitle, setHeaderTitle, xp, setXp }}>
            <Header title={headerTitle} exp={xp} onAddXp={handleXpChange} dirty={dirty} disabled={disabled} onSave={handleSave} />
            <div className={classes.container}>
                <Prompt when={dirty} message={actionOnPrompt} />
                {tab === 0 && <StatsPage char={character} onChange={handleChange} />}
                {tab === 1 && <InventoryPage char={character} onChange={handleChange} />}
                {tab === 2 && <PotentialsPage char={character} onChange={handleChange} />}
                {tab === 3 && <BattlePage char={character} onChange={handleChange} step={step} setStep={setStep} />}
                {tab === 4 && <NotesPage char={character} onChange={handleChange} />}

                <Navigator currentTab={tab} onTabChange={(event, value) => setTab(value)} />

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
        </HeaderContext.Provider>
    );
}