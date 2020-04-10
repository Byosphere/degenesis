import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';

interface Props {
    title: string;
    onSave: () => Promise<boolean>;
}

export default function Header(props: Props) {

    const history = useHistory();
    const location = useLocation();

    function handleBack() {
        history.push('/');
    }

    if (location.pathname === '/') {
        return null;
    } else {
        return (
            <AppBar position="relative" elevation={4}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleBack}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant='body1' component='h1' style={{ flexGrow: 1 }}>
                        {props.title}
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}