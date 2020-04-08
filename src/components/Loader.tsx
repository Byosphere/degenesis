import React from 'react';
import { Card, CircularProgress } from '@material-ui/core';
import T from 'i18n-react';

export default function () {
    return (
        <Card style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: 'center' }}>
            <figure style={{ textAlign: 'center', marginBottom: '16px', marginTop: '32px' }}>
                <img src='./images/degenesis.png' alt='degenesis' />
            </figure>
            <CircularProgress style={{ marginTop: 'calc(50% - 25px)' }} color="secondary" />
            <span style={{ marginTop: '10px' }}>{T.translate('generic.loading')}...</span>
        </Card>
    );
}