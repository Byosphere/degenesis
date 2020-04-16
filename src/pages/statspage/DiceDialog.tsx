import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Chip, TextField, Avatar, Badge, Typography, InputAdornment, Divider } from '@material-ui/core';
import { Prompt } from 'react-router-dom';
import { ATTRIBUTES, SKILLS } from '../../constants';
import { LooksOne, LooksTwo, Looks3, Looks4, Looks5, Looks6, Add } from '@material-ui/icons';
import { Attribute, Skill } from '../../models/Character';
import T from 'i18n-react';
import { useStyles } from './styles';

interface Props {
    open: boolean;
    onClose: () => void;
    attribute: Attribute;
    skill: Skill;
}

export default function DiceDialog(props: Props) {

    let interval;
    const { open, onClose, attribute, skill } = props;
    const [rollInProgress, setRollInProgress] = useState<boolean>(false);
    const [rollResult, setRollResult] = useState<number[]>([]);
    const [modifier, setModifier] = useState<number>(0);
    const classes = useStyles();
    const attributeName = (T.translate('attributes.' + ATTRIBUTES[attribute.id] + '.name') as string).toUpperCase().slice(0, 3);
    const skillName = skill ? T.translate('skills.' + SKILLS[attribute.id][skill.id]) : '';
    const disabled = attribute.base + (skill ? skill.value : 0) + modifier <= 0;

    function roll() {
        setRollInProgress(true);
        const diceNumber = attribute.base + skill.value + modifier;
        let rollResult = [];
        let cpt = 0;
        interval = setInterval(() => {
            if (cpt === diceNumber) {
                clearInterval(interval);
                setRollInProgress(false);
            } else {
                cpt++;
                rollResult.push(Math.floor(Math.random() * 6) + 1);
                setRollResult([...rollResult]);
            }
        }, 1000);
    }

    function handleClose() {
        if (rollInProgress) {
            clearInterval(interval);
        }
        setRollResult([]);
        onClose();
    }

    function actionOnPrompt() {
        if (!rollInProgress) {
            setRollResult([]);
            onClose();
        }
        return false;
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            {open && <Prompt when={true} message={actionOnPrompt} />}
            <DialogTitle>{T.translate('generic.diceroll')}</DialogTitle>
            <DialogContent>
                <DialogContentText component='div'>
                    <Typography variant='body2'>{T.translate('generic.rolldicequestion', {
                        attribute: attributeName,
                        anum: attribute.base,
                        skill: skillName,
                        snum: skill ? skill.value : 0
                    })}</Typography>
                    <TextField
                        className={classes.diceContent}
                        label={T.translate('generic.bonusmalus')}
                        type='number'
                        fullWidth
                        variant='outlined'
                        onChange={(event) => setModifier(event.target.value ? parseInt(event.target.value) : 0)}
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>{T.translate('generic.dices')}</InputAdornment>
                        }}
                    />
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
                </DialogContentText>
                {(!rollInProgress && !!rollResult.length) && <DialogContentText>
                    {T.translate('generic.diceresult', {
                        success: rollResult.filter((i) => i > 3).length,
                        trigger: rollResult.filter((i) => i === 6).length
                    })}
                </DialogContentText>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    {T.translate('generic.cancel')}
                </Button>
                <Button disabled={rollInProgress || disabled} onClick={roll} color="secondary" autoFocus>
                    {T.translate('generic.roll')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
