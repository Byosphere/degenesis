import React, { useState, useContext } from 'react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Dialog, DialogTitle, DialogActions, Button, DialogContent } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { ATTRIBUTES, SKILLS } from '../../constants';
import { Skill, Attribute, Character } from '../../models/Character';
import T from 'i18n-react';
import { Prompt } from 'react-router-dom';
import AttributeJauge from '../../components/attributejauge/AttributeJauge';
import { getSkillXpCost, getAttributeXpCost } from '../../utils/characterTools';
import { SnackbarContext } from '../../App';
import { HeaderContext } from '../detailpage/DetailPage';
import { useStyles } from './styles';
import DiceDialog from './DiceDialog';

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
    const [edit, setEdit] = useState<any>(null);
    const { xp, setXp } = useContext(HeaderContext);
    const { setSnackbar } = useContext(SnackbarContext);
    const classes = useStyles();

    function actionOnPromptUpgrade() {
        setEdit(null);
        return false
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

    function handleChangeAttribute(cost: number) {
        if (cost <= xp) {
            if (edit.name) { //attribute
                let at: Attribute = edit;
                at.base = at.base + 1;
            } else { //skill
                let sk: Skill = edit;
                sk.value = sk.value + 1;
            }
            let exp = xp - cost;
            setXp(exp);
            char.exp = exp;
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
            <ExpansionPanel
                expanded={expanded}
                onChange={() => setExpanded(!expanded)}
                className={classes.expansion}
                TransitionProps={{ unmountOnExit: true }}
            >
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
                <ExpansionPanelDetails className={classes.expansionDetail}>
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
            <DiceDialog
                open={open}
                onClose={() => setOpen(false)}
                attribute={attribute}
                skill={skill}
            />
            <Dialog
                open={!!edit}
                onClose={() => setEdit(null)}
            >
                {!!edit && <Prompt when={true} message={actionOnPromptUpgrade} />}
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