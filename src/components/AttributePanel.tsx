import React, { useState, useContext } from 'react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText } from '@material-ui/core';
import { ExpandMore, LooksTwo, LooksOne, Looks3, Looks4, Looks5, Looks6 } from '@material-ui/icons';
import { ATTRIBUTES, SKILLS } from '../constants';
import { Skill, Attribute, Character } from '../models/Character';
import T from 'i18n-react';
import { Prompt } from 'react-router-dom';
import AttributeJauge from './AttributeJauge';
import { getSkillXpCost, getAttributeXpCost } from '../utils/characterTools';
import { HeaderContext, SnackbarContext } from '../App';

interface Props {
    char: Character;
    attribute: Attribute;
    behavior: 'pulsions' | 'concentration';
    belief: 'volonte' | 'foi';
    onChange: (attribute: Attribute) => void;
    locked?: boolean;
}

export default function AttributePanel(props: Props) {

    const { attribute, onChange, behavior, belief, char } = props;
    const [open, setOpen] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [skill, setSkill] = useState<Skill>(undefined);
    const [rollInProgress, setRollInProgress] = useState<boolean>(false);
    const [rollResult, setRollResult] = useState<number[]>([]);
    const [edit, setEdit] = useState<any>(null);
    const { exp, setExp } = useContext(HeaderContext);
    const { setSnackbar } = useContext(SnackbarContext);

    function actionOnPrompt() {
        if (!rollInProgress) {
            setOpen(false);
            setRollResult([]);
        }
        return false;
    }

    function roll() {
        setRollInProgress(true);
        const diceNumber = attribute.base + skill.value;
        let rollResult = [];
        let cpt = 0;
        let interval = setInterval(() => {
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

    function handleChange(value: number, skillId?: number) {
        if (skillId !== undefined) {
            attribute.skills[skillId].value = value;
        } else {
            attribute.base = value;
        }
        onChange(attribute);
    }

    function openRollModal(event, selectedSkill: Skill) {
        setSkill(selectedSkill);
        setOpen(true);
    }

    function handleClose() {
        if (!rollInProgress) {
            setOpen(false);
            setRollResult([]);
        }
    }

    function handleChangeAttribute(cost: number) {
        if (cost <= exp) {
            if (edit.name) { //attribute
                let at: Attribute = edit;
                at.base = at.base + 1;
            } else { //skill
                let sk: Skill = edit;
                sk.value = sk.value + 1;
            }
            let xp = exp - cost;
            setExp(xp);
            char.exp = xp;
            onChange(attribute);
        } else {
            setSnackbar({
                type: 'error',
                message: T.translate('generic.xperror')
            });
        }
        setEdit(null);
    }

    function handleEdit(skill?: Skill) {
        if (skill) {
            setEdit(skill);
        } else {
            setEdit(attribute);
        }
    }

    function checkDisabled(name: string): boolean {
        if (name === 'pulsions' && behavior === 'concentration') return true;
        if (name === 'concentration' && behavior === 'pulsions') return true;
        if (name === 'volonte' && belief === 'foi') return true;
        if (name === 'foi' && belief === 'volonte') return true;
        return false;
    }

    return (
        <>
            <ExpansionPanel expanded={expanded} onChange={() => setExpanded(!expanded)} style={{ marginBottom: '5px' }}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}
                >
                    <AttributeJauge
                        label={T.translate('attributes.' + ATTRIBUTES[attribute.id] + '.name') as string}
                        desc={T.translate('attributes.' + ATTRIBUTES[attribute.id] + '.desc') as string}
                        value={attribute.base}
                        attribute
                        onClick={(value) => handleChange(value)}
                        onEdit={handleEdit}
                        locked={props.locked}
                    />
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
                    {attribute.skills.map((skill: Skill) => (
                        <AttributeJauge
                            key={skill.id}
                            label={T.translate('skills.' + SKILLS[attribute.id][skill.id]) as string}
                            value={skill.value}
                            onClick={(value) => handleChange(value, skill.id)}
                            onRollDice={(event) => openRollModal(event, skill)}
                            locked={props.locked}
                            onEdit={() => handleEdit(skill)}
                            disabled={checkDisabled(SKILLS[attribute.id][skill.id])}
                        />
                    ))}
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <Prompt when={true} message={actionOnPrompt} />
                <DialogTitle>{T.translate('generic.diceroll')}</DialogTitle>
                <DialogContent>
                    <DialogContentText component='div'>
                        {T.translate('generic.rolldicequestion', {
                            attribute: T.translate('attributes.' + ATTRIBUTES[attribute.id] + '.name'),
                            anum: attribute.base,
                            skill: skill ? T.translate('skills.' + SKILLS[attribute.id][skill.id]) : '',
                            snum: skill ? skill.value : 0
                        })}
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
                    <Button disabled={rollInProgress} onClick={handleClose}>
                        {T.translate('generic.cancel')}
                    </Button>
                    <Button disabled={rollInProgress} onClick={roll} color="secondary" autoFocus>
                        {T.translate('generic.roll')}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={!!edit}
                onClose={() => setEdit(null)}
            >
                <Prompt when={true} message={actionOnPrompt} />
                <DialogTitle>{T.translate('generic.upgrade')}</DialogTitle>
                {edit && <DialogContent>
                    {T.translate('potential.upgrade', {
                        cost: edit.name ? getAttributeXpCost(attribute, behavior) : getSkillXpCost(edit.id, attribute, behavior),
                        name: edit.name ? T.translate('attributes.' + ATTRIBUTES[attribute.id] + '.name') :
                            T.translate('skills.' + SKILLS[attribute.id][edit.id])
                    })}
                </DialogContent>}
                <DialogActions>
                    <Button onClick={() => setEdit(null)}>
                        {T.translate('generic.no')}
                    </Button>
                    <Button
                        onClick={() => handleChangeAttribute(edit.name ?
                            getAttributeXpCost(attribute, behavior) :
                            getSkillXpCost(edit.id, attribute, behavior)
                        )}
                        color="secondary" autoFocus
                    >
                        {T.translate('generic.yes')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}