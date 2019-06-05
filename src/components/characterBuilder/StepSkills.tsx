import React, { Component } from 'react'
import Character from '../../models/Character';
import T from 'i18n-react';
import { Typography } from '@material-ui/core';

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

                {buttons}
            </React.Fragment>
        );
    }
}
