import React from 'react';
import { Card, CircularProgress } from '@material-ui/core';
import T from 'i18n-react';
import { useStyles } from './styles';

export default function Loader() {

    const classes = useStyles();

    return (
        <div className="App">
            <Card className={classes.card}>
                <figure className={classes.figure}>
                    <img src='./images/degenesis.png' alt='degenesis' />
                </figure>
                <CircularProgress className={classes.progress} color="secondary" />
                <span className={classes.text}>{T.translate('generic.loading')}...</span>
            </Card>
        </div>
    );
}