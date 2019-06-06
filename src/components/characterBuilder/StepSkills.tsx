import React, { Component } from 'react'
import Character, { Skill } from '../../models/Character';
import T from 'i18n-react';
import { Typography, List, ListSubheader } from '@material-ui/core';
import { SKILLS, ATTRIBUTES } from '../../constants';
import AttributeRepartitor from '../attributeRepartitor/AttributeRepartitor';

interface Props {
    newCharacter: Character;
    skillPoints: number;
    onChange: (attributeId: number, skillId: number, value: number) => void;
    buttons: JSX.Element;
}

export default class StepSkills extends Component<Props, {}> {
    public render() {

        const { newCharacter, onChange, buttons, skillPoints } = this.props;

        return (
            <React.Fragment>
                <Typography variant='body2'>{T.translate('create.skillsLeft', { num: skillPoints })}</Typography>
                <List>
                    {SKILLS.map((skills, attributeId) => {
                        return (
                            <List
                                key={attributeId}
                                style={{ border: '1px solid rgba(0,0,0,0.2)', borderRadius: '10px', paddingBottom: '0', marginBottom: '8px' }}
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
            </React.Fragment>
        );
    }
}
