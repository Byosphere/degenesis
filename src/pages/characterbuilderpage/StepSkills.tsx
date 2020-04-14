import React from 'react'
import { Skill, Character } from '../../models/Character';
import T from 'i18n-react';
import { Typography, List, ListSubheader, Snackbar, Button } from '@material-ui/core';
import { SKILLS, ATTRIBUTES } from '../../constants';
import AttributeRepartitor from './AttributeRepartitor';
import { Warning } from '@material-ui/icons';
import { useStyles } from './styles';

interface Props {
    newCharacter: Character;
    skillPoints: number;
    onChange: (attributeId: number, skillId: number, value: number) => void;
    onReset: () => void;
    buttons: JSX.Element;
}

export default function StepSkills(props: Props) {

    const { newCharacter, onChange, buttons, skillPoints } = props;
    const classes = useStyles();

    return (
        <>
            <Typography variant='body2'>{T.translate('create.skillsdesc')}</Typography>
            <Snackbar
                className={classes.skillSnackbar}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={skillPoints > 0}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={
                    <span className={classes.message}>
                        <Warning /> {T.translate('create.skillsLeft', { num: skillPoints })}
                    </span>
                }
                action={[
                    <Button
                        key="undo"
                        size="small"
                        onClick={props.onReset}
                    >
                        {T.translate('generic.reset')}
                    </Button>,
                ]}
            />
            <List>
                {SKILLS.map((skills, attributeId) => {
                    return (
                        <List
                            key={attributeId}
                            className={classes.skillList}
                            subheader={
                                <ListSubheader component="div">
                                    {T.translate('attributes.' + ATTRIBUTES[attributeId] + '.name')}
                                </ListSubheader>
                            }
                        >
                            {skills.map((skill, skillId) => {

                                const charSkill: Skill = newCharacter.attributes[attributeId].skills[skillId];
                                return (
                                    <AttributeRepartitor
                                        key={attributeId + '-' + skillId}
                                        attributeId={attributeId}
                                        skillId={skillId}
                                        value={charSkill.value}
                                        bonusMax={charSkill.bonusMax || 0}
                                        onChange={onChange}
                                        disabled={
                                            (skill === 'foi' && newCharacter.belief !== skill) ||
                                            (skill === 'volonte' && newCharacter.belief !== skill) ||
                                            (skill === 'concentration' && newCharacter.behavior !== skill) ||
                                            (skill === 'pulsions' && newCharacter.behavior !== skill)
                                        }
                                    />
                                );
                            })}
                        </List>
                    );
                })}
            </List>
            {buttons}
        </>
    );
}
