import React from 'react';
import { Typography } from '@material-ui/core';
import { TurnedIn, TurnedInNot, Close } from '@material-ui/icons';
import T from 'i18n-react';

interface Props {
    label: string;
    currentValue: number;
    maximum: number;
    onChange?: (field: string, newValue: number) => void;
}

export default function InteractiveJauge(props: Props) {

    const { label, currentValue, maximum, onChange } = props;

    let icons: JSX.Element[] = [];

    for (let i = 1; i <= maximum; i++) {
        const icon = i <= currentValue ?
            <TurnedIn style={{ margin: '0' }} key={i} color='inherit' onClick={() => onChange(label, i)} /> :
            <TurnedInNot style={{ margin: '0' }} key={i} color='inherit' onClick={() => onChange(label, i)} />
        icons.push(icon);
    }

    return (
        <div style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <Typography variant='caption'>{T.translate('generic.' + label) + ' (' + currentValue + ') :'}</Typography>
                <div style={{ color: 'rgb(68, 68, 68)' }}>
                    <Close style={{ margin: '0' }} key={0} color='inherit' onClick={() => onChange(label, 0)} />
                    {icons}
                </div>
            </div>
        </div>
    );
}
