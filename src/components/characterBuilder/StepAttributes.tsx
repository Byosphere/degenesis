import React, { Component } from 'react'
import Character, { Attribute } from '../../models/Character';
import T from 'i18n-react';
import { Typography, List } from '@material-ui/core';
import { ATTRIBUTES } from '../../constants';
import AttributeRepartitor from '../attributeRepartitor/AttributeRepartitor';

interface Props {
    newCharacter: Character;
    attributePoints: number;
    onChange: (attributeId: number, skillId: number, value: number) => void;
    buttons: JSX.Element;
}

export default class StepAttributes extends Component<Props, {}> {
    public render() {

        const { newCharacter, onChange, buttons, attributePoints } = this.props;

        return (
            <React.Fragment>
                <Typography variant='body2'>{T.translate('create.attributesLeft', { num: attributePoints })}</Typography>
                <List>
                    {ATTRIBUTES.map((name: string, key: number) => {

                        const charAttribute: Attribute = newCharacter.attributes[key];

                        return (
                            <AttributeRepartitor
                                key={name}
                                attributeId={key}
                                value={charAttribute.base}
                                bonusMax={charAttribute.bonusMax || 0}
                                onChange={onChange}
                            />
                        );
                    })}
                </List>
                {buttons}
            </React.Fragment>
        );
    }
}
