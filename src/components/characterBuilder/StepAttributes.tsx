import React from 'react';
import { Attribute, Character } from '../../models/Character';
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

export default function StepAttributes(props: Props) {

    const { newCharacter, onChange, buttons, attributePoints } = props;

    return (
        <>
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
        </>
    )
}
