import React from 'react';
import T from 'i18n-react';
import { useStyles } from './styles';

export default function Empty() {

    const classes = useStyles();

    return (
        <span className={classes.empty}>{T.translate('generic.empty')}</span>
    );
}