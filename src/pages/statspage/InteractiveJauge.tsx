import React from 'react';
import { Typography } from '@material-ui/core';
import { TurnedIn, TurnedInNot, Close } from '@material-ui/icons';
import T from 'i18n-react';
import { useStyles } from './styles';

interface Props {
    label: string;
    currentValue: number;
    maximum: number;
    onChange?: (field: string, newValue: number) => void;
}

export default function InteractiveJauge(props: Props) {

    const { label, currentValue, maximum, onChange } = props;
    const classes = useStyles();
    let icons: JSX.Element[] = [];

    for (let i = 1; i <= maximum; i++) {
        const icon = i <= currentValue ?
            <TurnedIn className={classes.jaugeIcon} key={i} color='inherit' onClick={() => onChange(label, i)} /> :
            <TurnedInNot className={classes.jaugeIcon} key={i} color='inherit' onClick={() => onChange(label, i)} />
        icons.push(icon);
    }

    return (
        <div className={classes.jaugeContainer}>
            <div>
                <Typography variant='caption'>{T.translate('generic.' + label) + ' (' + currentValue + ') :'}</Typography>
                <div>
                    <Close className={classes.jaugeIcon} key={0} color='inherit' onClick={() => onChange(label, 0)} />
                    {icons}
                </div>
            </div>
        </div>
    );
}
