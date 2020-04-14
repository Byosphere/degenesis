import React, { useContext, useEffect, useState } from 'react';
import { Character } from '../../models/Character';
import T from 'i18n-react';
import { AppBar, Toolbar, IconButton, Badge, Avatar, Fab, Zoom, Slide, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { PlayArrow, FlipCameraAndroid, Block, ExitToApp } from '@material-ui/icons';
import FloatingAction from '../../components/floatingaction/FloatingAction';
import { getCharacterHealth, getEgoMax, canFight } from '../../utils/characterTools';
import SetInitiativePanel from './SetInitiativePanel';
import ActionsList from './ActionsList';
import ChipsManager from './ChipsManager';
import { Prompt } from 'react-router-dom';
import { HeaderContext } from '../detailpage/DetailPage';

interface Props {
    char: Character;
    step: number;
    setStep: (val: number) => void;
    onChange: (char: Character) => void;
}

interface InfoButtonProps {
    style: React.CSSProperties;
    title: string;
    value: any;
}

export default function BattlePage(props: Props) {

    const { char, step, setStep } = props;
    const { setHeaderTitle } = useContext(HeaderContext);
    const [actions, setActions] = useState<number>(0);
    const [round, setRound] = useState<number>(1);
    const [usedEgo, setUsedEgo] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        setHeaderTitle(T.translate('navigator.battle') as string);
    }, [setHeaderTitle]);

    function BattleFab() {
        return (
            <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zoom in={step === 0 && canFight(char)} unmountOnExit>
                    <Fab style={{ paddingLeft: '24px' }} color='secondary' variant='extended' onClick={() => setStep(1)}>
                        Engager le combat <PlayArrow style={{ marginLeft: '16px' }} />
                    </Fab>
                </Zoom>
                <Zoom in={step === 0 && !canFight(char)} unmountOnExit>
                    <Fab style={{ paddingRight: '24px' }} color='secondary' variant='extended'>
                        <Block style={{ marginRight: '16px' }} /> Trop faible pour se battre
                    </Fab>
                </Zoom>
            </div>
        );
    }

    function InfoButton(props: InfoButtonProps) {
        return (
            <IconButton size="small" style={props.style}>
                <Badge badgeContent={props.title} color='primary' anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                    <Avatar variant="rounded" style={{ width: '34px', height: '34px', backgroundColor: '#fafafa', color: 'black' }}>{props.value}</Avatar>
                </Badge>
            </IconButton>
        );
    }

    function handleClose(actions: number, usedEgo: number) {
        setUsedEgo(usedEgo);
        setActions(actions);
        setStep(2);
        props.onChange({ ...char });
    }

    function handleCancel() {
        if (round === 1) {
            setStep(0);
        } else if (round > 1) {
            setStep(2);
            setRound(round - 1);
        }
    }

    function endBattle() {
        // TODO
    }

    function goToNextRound() {
        setStep(1);
        setRound(round + 1);
    }

    function actionOnPrompt() {
        setOpen(false);
        return false;
    }

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}
        >
            <BattleFab />
            <Slide direction="down" in={step >= 1} mountOnEnter unmountOnExit>
                <AppBar elevation={1} position='relative' style={{ borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
                    <Toolbar>
                        <InfoButton title='Santé' style={{ marginRight: '20px' }} value={getCharacterHealth(char)} />
                        <Divider orientation='vertical' flexItem />
                        <InfoButton title='Ego' style={{ margin: '0 20px' }} value={getEgoMax(char) - char.ego} />
                        <Divider orientation='vertical' flexItem />
                        <InfoButton title='Act.' style={{ margin: '0 20px' }} value={actions} />
                        <Divider orientation='vertical' flexItem />
                        <div style={{ flex: 1, textAlign: 'center' }}>
                            {step === 1 && <>Lancer d'initiative...</>}
                            {step === 2 && <>Choix d'actions...</>}
                        </div>
                    </Toolbar>
                </AppBar>
            </Slide>
            {step === 2 && <ChipsManager trauma={char.trauma} usedEgo={usedEgo} />}
            {step === 2 && <ActionsList />}
            {step === 1 && <SetInitiativePanel char={char} onClose={handleClose} onCancel={handleCancel} />}
            {step > 0 && <FloatingAction
                // style={{ bottom: '16px', right: '88px' }}
                onClick={() => setOpen(true)}
                icon={<ExitToApp />}
            />}
            {step > 0 && <FloatingAction
                // style={{ bottom: '16px' }}
                onClick={goToNextRound}
                icon={<Badge badgeContent={round} color='primary' anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                    <FlipCameraAndroid />
                </Badge>}
            />}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                {open && <Prompt when={true} message={actionOnPrompt} />}
                <DialogTitle>{T.translate('generic.endbattle')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Terminer le combat ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        {T.translate('generic.no')}
                    </Button>
                    <Button onClick={endBattle} color="secondary">
                        {T.translate('generic.yes')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}