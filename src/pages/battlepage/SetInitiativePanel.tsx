import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Slider } from '@material-ui/core';
import { Character } from '../../models/Character';
import T from 'i18n-react';
import { getInitiative, getEgoMax } from '../../utils/characterTools';
import { Looks6, LooksOne, LooksTwo, Looks3, Looks4, Looks5 } from '@material-ui/icons';
import { Prompt } from 'react-router-dom';
import InteractiveJauge from '../statspage/InteractiveJauge';

interface Props {
    char: Character;
    onClose: (actions: number, usedEgo: number) => void;
    onCancel: () => void;
}

export default function SetInitiativePanel(props: Props) {

    const { char } = props;
    const [ego, setEgo] = useState<number>(char.ego);
    const [actions, setActions] = useState<number>(0);
    const [rollResult, setRollResult] = useState<number[]>([]);
    const [rollInProgress, setRollInProgress] = useState<boolean>(false);

    function roll() {
        setRollInProgress(true);
        const diceNumber = getInitiative(char) + ego;
        let rollResult = [];
        let cpt = 0;
        let interval = setInterval(() => {
            if (cpt === diceNumber) {
                clearInterval(interval);
                setRollInProgress(false);
                let nbOfTriggers = rollResult.filter((i) => i === 6).length;
                setActions(1 + Math.floor(nbOfTriggers / 2));
                char.ego += ego;
            } else {
                cpt++;
                rollResult.push(Math.floor(Math.random() * 6) + 1);
                setRollResult([...rollResult]);
            }
        }, 500);
    }

    function actionOnPrompt() {
        props.onCancel();
        return false;
    }

    function onEgoChange(value) {
        if (value === getEgoMax(char)) return;
        if (value - ego > 3) return;
        setEgo(value);
    }

    return (
        <Dialog
            open
            onClose={props.onCancel}
        >
            <Prompt when={true} message={actionOnPrompt} />
            <DialogTitle>{T.translate('battle.init')}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {T.translate('battle.initinfo')}
                </DialogContentText>
                <DialogContentText>
                    Dépenser de l'égo ? (3 points max.)
                </DialogContentText>
                <InteractiveJauge
                    label={T.translate('stats.ego.label') as string}
                    desc={T.translate('stats.ego.desc') as string}
                    currentValue={ego}
                    fixed={char.ego}
                    maximum={getEgoMax(char)}
                    onChange={onEgoChange}
                />
                <DialogContentText>
                    Nombre de dés à lancer : <b>PSY+Réactivité({getInitiative(char)})</b> + <b>Ego({ego - char.ego})</b>
                </DialogContentText>
                <p>
                    {rollResult.map((nb: number, index: number) => {
                        switch (nb) {
                            case 1:
                                return (<LooksOne key={index} fontSize='large' />);
                            case 2:
                                return (<LooksTwo key={index} fontSize='large' />);
                            case 3:
                                return (<Looks3 key={index} fontSize='large' />);
                            case 4:
                                return (<Looks4 key={index} fontSize='large' />);
                            case 5:
                                return (<Looks5 key={index} fontSize='large' />);
                            case 6:
                                return (<Looks6 key={index} fontSize='large' />);
                            default:
                                return null;
                        }
                    })}
                </p>
                {(!rollInProgress && !!rollResult.length) && <DialogContentText>
                    {T.translate('generic.diceresult', {
                        success: rollResult.filter((i) => i > 3).length,
                        trigger: rollResult.filter((i) => i === 6).length
                    })}
                </DialogContentText>}
                {!!actions && <DialogContentText>
                    Actions pour le prochain round : {actions}
                </DialogContentText>}
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={props.onCancel} disabled={rollInProgress}>
                    {T.translate('generic.cancel')}
                </Button>
                {!actions && <Button color="secondary" onClick={roll} disabled={rollInProgress}>
                    {T.translate('generic.roll')}
                </Button>}
                {!!actions && <Button color="secondary" onClick={() => props.onClose(actions, ego)}>
                    {T.translate('generic.validate')}
                </Button>}
            </DialogActions>
        </Dialog>
    );
}