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
import { useStyles } from './styles';

interface Props {
    char: Character;
    step: number;
    setStep: (val: number) => void;
    onChange: (char: Character) => void;
}

interface InfoButtonProps {
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
    const classes = useStyles();

    useEffect(() => {
        setHeaderTitle(T.translate('navigator.battle') as string);
    }, [setHeaderTitle]);

    function BattleFab() {
        return (
            <div className={classes.battleFab}>
                <Zoom in={step === 0 && canFight(char)} unmountOnExit>
                    <Fab color='secondary' variant='extended' onClick={() => setStep(1)}>
                        {T.translate('battle.fight')} <PlayArrow />
                    </Fab>
                </Zoom>
                <Zoom in={step === 0 && !canFight(char)} unmountOnExit>
                    <Fab color='secondary' variant='extended'>
                        {T.translate('battle.tooweak')} <Block />
                    </Fab>
                </Zoom>
            </div>
        );
    }

    function InfoButton(props: InfoButtonProps) {
        return (
            <IconButton size="small">
                <Badge badgeContent={props.title} color='primary' anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                    <Avatar variant="rounded" className={classes.infoButton}>{props.value}</Avatar>
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
        <div className={classes.container}>
            <BattleFab />
            <Slide direction="down" in={step >= 1} mountOnEnter unmountOnExit>
                <AppBar elevation={1} position='relative' className={classes.topBar}>
                    <Toolbar>
                        <InfoButton title={T.translate('battle.topbar.health') as string} value={getCharacterHealth(char)} />
                        <Divider orientation='vertical' flexItem />
                        <InfoButton title={T.translate('battle.topbar.ego') as string} value={getEgoMax(char) - char.ego} />
                        <Divider orientation='vertical' flexItem />
                        <InfoButton title={T.translate('battle.topbar.action') as string} value={actions} />
                        <Divider orientation='vertical' flexItem />
                        <div className={classes.topText}>
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