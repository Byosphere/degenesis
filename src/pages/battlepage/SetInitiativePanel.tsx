import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Slider } from '@material-ui/core';
import { Character } from '../../models/Character';
import T from 'i18n-react';
import { getInitiative } from '../../utils/characterTools';
import { Looks6, LooksOne, LooksTwo, Looks3, Looks4, Looks5 } from '@material-ui/icons';
import { Prompt } from 'react-router-dom';

interface Props {
    char: Character;
    onClose: (actions: number, usedEgo: number) => void;
    onCancel: () => void;
}

export default function SetInitiativePanel(props: Props) {

    const { char } = props;
    const [ego, setEgo] = useState<number>(0);
    const [actions, setActions] = useState<number>(0);
    const [rollResult, setRollResult] = useState<number[]>([]);
    const [rollInProgress, setRollInProgress] = useState<boolean>(false);

    function setMarks() {
        const max = (char.ego + 1) > 3 ? char.ego : 3;
        let marks = [];
        for (let i = 0; i <= max; i++) {
            marks.push({ value: i, label: i });
        }
        return marks;
    }

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

    return (
        <Dialog
            open
            onClose={props.onCancel}
        >
            <Prompt when={true} message={actionOnPrompt} />
            <DialogTitle>Lancer d'initiative</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    L'initiative permet de déterminer le nombre d'action à effectuer par le personnage dans le round à venir ainsi que son ordre de passage.
                </DialogContentText>
                <DialogContentText>
                    Dépenser de l'égo ?
                </DialogContentText>
                <Slider
                    defaultValue={0}
                    valueLabelDisplay="auto"
                    step={1}
                    marks={setMarks()}
                    min={0}
                    max={3}
                    color='secondary'
                    onChange={(event, value: number) => setEgo(value)}
                />
                <DialogContentText>
                    Nombre de dés à lancer : <b>PSY+Réactivité({getInitiative(char)})</b> + <b>Ego({ego})</b>
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