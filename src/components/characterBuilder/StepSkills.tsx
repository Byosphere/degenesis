import React, { Component } from 'react'
import Character, { Skill } from '../../models/Character';
import T from 'i18n-react';
import { Typography, List, ListSubheader, Snackbar, Button } from '@material-ui/core';
import { SKILLS, ATTRIBUTES } from '../../constants';
import AttributeRepartitor from '../attributeRepartitor/AttributeRepartitor';
import { Warning } from '@material-ui/icons';

interface Props {
    newCharacter: Character;
    skillPoints: number;
    onChange: (attributeId: number, skillId: number, value: number) => void;
    onReset: () => void;
    buttons: JSX.Element;
}

export default class StepSkills extends Component<Props, {}> {

    public render() {

        const { newCharacter, onChange, buttons, skillPoints } = this.props;

        return (
            <React.Fragment>
                <Typography variant='body2'>{T.translate('create.skillsdesc')}</Typography>
                <Snackbar
                    style={{ opacity: 0.9 }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={skillPoints > 0}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <Warning style={{ marginRight: '10px' }} />
                            {T.translate('create.skillsLeft', { num: skillPoints })}
                        </span>
                    }
                    action={[
                        <Button
                            key="undo"
                            size="small"
                            style={{ color: 'white' }}
                            onClick={this.props.onReset}
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
