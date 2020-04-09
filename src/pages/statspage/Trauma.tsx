import React from 'react';
import { IconButton } from '@material-ui/core';
import { Clear, OfflineBolt, OfflineBoltOutlined } from '@material-ui/icons';
import { getTraumaMax } from '../../utils/characterTools';
import { Character } from '../../models/Character';

interface Props {
    char: Character;
    onClick: (val: number) => void;
}

export default function Trauma(props: Props) {

    const traumaMax = getTraumaMax(props.char);
    let trauma = [];

    trauma.push(
        <IconButton key={0} style={{ padding: '6px' }} onClick={() => props.onClick(0)}>
            <Clear />
        </IconButton>
    );

    for (let i = 1; i <= traumaMax; i++) {
        trauma.push(
            <IconButton key={i} style={{ padding: '6px' }} onClick={() => props.onClick(i)}>
                {i <= props.char.trauma ? <OfflineBolt /> : <OfflineBoltOutlined />}
            </IconButton>
        );
    }
    return <>{trauma}</>;
}