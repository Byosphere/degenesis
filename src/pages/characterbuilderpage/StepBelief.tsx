import React from 'react'
import { Typography, Chip, Divider } from '@material-ui/core';
import T from 'i18n-react';
import { KeyboardArrowRight } from '@material-ui/icons';
import { Character } from '../../models/Character';
import { useStyles } from './styles';

interface Props {
    newCharacter: Character;
    onChange: (field: string, attribute: string) => void;
    buttons: JSX.Element;
}

export default function StepBelief(props: Props) {

    const { newCharacter, onChange, buttons } = props;
    const classes = useStyles();

    return (
        <>
            <Typography className={classes.detailTypo} component='p'>
                {T.translate('create.beliefdesc', { who: newCharacter.name })}
            </Typography>
            <div className={classes.beliefDiv}>
                <KeyboardArrowRight />
                <Chip
                    color={newCharacter.belief === 'foi' ? 'secondary' : 'default'}
                    label={'(' + T.translate('attributes.psyche.short') + ') ' + T.translate('skills.foi')}
                    onClick={() => onChange('belief', 'foi')}
                />
                <Chip
                    color={newCharacter.belief === 'volonte' ? 'secondary' : 'default'}
                    label={'(' + T.translate('attributes.psyche.short') + ') ' + T.translate('skills.volonte')}
                    onClick={() => onChange('belief', 'volonte')}
                />
            </div>
            <Typography variant='body2'>{newCharacter.belief ? T.translate('create.' + newCharacter.belief) : ''}</Typography>
            <Divider variant="middle" className={classes.dividerBelief} />
            <div className={classes.beliefDiv}>
                <KeyboardArrowRight />
                <Chip
                    color={newCharacter.behavior === 'concentration' ? 'secondary' : 'default'}
                    label={'(' + T.translate('attributes.intellect.short') + ') ' + T.translate('skills.concentration')}
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
