import React from 'react';
import { IconButton } from '@material-ui/core';
import { Clear, OfflineBolt, OfflineBoltOutlined } from '@material-ui/icons';
import { getTraumaMax } from '../../utils/characterTools';
import { Character } from '../../models/Character';
import { useStyles } from './styles';

interface Props {
    char: Character;
    onClick: (val: number) => void;
}

export default function Trauma(props: Props) {

    const traumaMax = getTraumaMax(props.char);
    const classes = useStyles();
    let trauma = [];

    trauma.push(
        <IconButton key={0} className={classes.traumaButton} onClick={() => props.onClick(0)}>
            <Clear />
        </IconButton>
    );

    for (let i = 1; i <= traumaMax; i++) {
        trauma.push(
            <IconButton key={i} className={classes.traumaButton} onClick={() => props.onClick(i)}>
                {i <= props.char.trauma ? <OfflineBolt /> : <OfflineBoltOutlined />}
            </IconButton>
        );
    }
    return <>{trauma}</>;
}