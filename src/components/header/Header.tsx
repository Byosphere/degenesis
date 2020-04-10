import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Fab, Snackbar } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { ArrowBack, Save, Check } from '@material-ui/icons';
import T from 'i18n-react';

interface Props {
    title: string;
    onSave: () => Promise<boolean>;
}

export default function Header(props: Props) {

    const history = useHistory();
    const location = useLocation();
    const [open, setOpen] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);

    function handleBack() {
        history.push('/');
    }

    async function handleClick() {
        setDisabled(true);
        let result = await props.onSave();
        if (result) {
            setOpen(true);
        } else {

        }
        setDisabled(false);
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
                {location.pathname !== '/create' && <Fab
                    style={{ position: 'absolute', right: '24px', top: '24px' }}
                    color="secondary"
                    aria-label="save"
                    onClick={handleClick}
                    disabled={disabled}
                >
                    <Save />
                </Fab>}
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={<span style={{ display: 'flex', alignItems: 'center' }}>
                        <Check style={{ marginRight: '16px' }} />{T.translate('generic.charactersaved')}
                    </span>}
                    classes={{ root: 'success-snackbar' }}
                />
            </AppBar>
        );
    }
}