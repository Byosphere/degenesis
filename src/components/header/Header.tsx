import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Avatar } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';

interface Props {
    title: string;
    exp: number;
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
                    <IconButton aria-label="show 4 new mails" color="inherit">
                        <Badge
                            badgeContent={4}
                            overlap="circle"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                        >
                            <Avatar>Xp</Avatar>
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}