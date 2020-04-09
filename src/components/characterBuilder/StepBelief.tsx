import React from 'react'
import { Typography, Chip, Divider } from '@material-ui/core';
import T from 'i18n-react';
import { KeyboardArrowRight } from '@material-ui/icons';
import { Character } from '../../models/Character';

interface Props {
    newCharacter: Character;
    onChange: (field: string, attribute: string) => void;
    buttons: JSX.Element;
}

export default function StepBelief(props: Props) {

    const { newCharacter, onChange, buttons } = props;

    return (
        <>
            <Typography style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '10px' }} component='p'>
                {T.translate('create.beliefdesc', { who: newCharacter.name })}
            </Typography>
            <div style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                <KeyboardArrowRight />
                <Chip
                    color={newCharacter.belief === 'foi' ? 'secondary' : 'default'}
                    label={'(' + T.translate('attributes.psyche.short') + ') ' + T.translate('skills.foi')}
                    style={{ marginRight: '5px' }}
                    onClick={() => onChange('belief', 'foi')}
                />
                <Chip
                    color={newCharacter.belief === 'volonte' ? 'secondary' : 'default'}
                    label={'(' + T.translate('attributes.psyche.short') + ') ' + T.translate('skills.volonte')}
                    onClick={() => onChange('belief', 'volonte')}
                />
            </div>
            <Typography variant='body2'>{newCharacter.belief ? T.translate('create.' + newCharacter.belief) : ''}</Typography>
            <Divider variant="middle" style={{ margin: '16px 0' }} />
            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <KeyboardArrowRight />
                <Chip
                    color={newCharacter.behavior === 'concentration' ? 'secondary' : 'default'}
                    label={'(' + T.translate('attributes.intellect.short') + ') ' + T.translate('skills.concentration')}
                    style={{ marginRight: '5px' }}
                    onClick={() => onChange('behavior', 'concentration')}

                />
                <Chip
                    color={newCharacter.behavior === 'pulsions' ? 'secondary' : 'default'}
                    label={'(' + T.translate('attributes.instinct.short') + ') ' + T.translate('skills.pulsions')}
                    onClick={() => onChange('behavior', 'pulsions')}
                />
            </div>
            <Typography variant='body2'>{newCharacter.behavior ? T.translate('create.' + newCharacter.behavior) : ''}</Typography>
            {buttons}
        </>
    );
}
