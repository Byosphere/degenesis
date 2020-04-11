import React from 'react';
import { Character } from '../../models/Character';

interface Props {
    char: Character;
}

export default function BattlePage(props: Props) {
    return (
        <div style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.5
        }}>
            Coming soon
        </div>
    );
}