import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Avatar, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Divider } from '@material-ui/core';
import { useHistory, useLocation, Prompt } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';
import T from 'i18n-react';

interface Props {
    title: string;
    exp: number;
    onAddXp: (id: string, value: number) => Promise<boolean>;
}

export default function Header(props: Props) {

    const history = useHistory();
    const location = useLocation();
    const [open, setOpen] = useState<boolean>(false);
    const [xp, setXp] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(false);

    function handleBack() {
        history.push('/');
    }

    async function handleAddXp() {
        const id = location.pathname.split('/')[2];
        if (!id) return;
        setOpen(false);
        setDisabled(true);
        const result = await props.onAddXp(id, parseInt(xp, 10));
        if (result) {
            setXp('');
            setDisabled(false);
        } else {
            // TODO
        }
    }

    function actionOnPrompt(location): boolean {
        setOpen(false);
        return false;
    }

    if (location.pathname === '/') {
        return null;
    } else {
        return (
            <>
                <AppBar position="relative" elevation={4}>
                    <Toolbar style={{ marginRight: '58px', paddingRight: 0, borderRight: location.pathname !== '/create' ? '1px solid rgba(0, 0, 0, 0.12)' : '' }}>
                        <IconButton edge="start" color="inherit" onClick={handleBack}>
                            <ArrowBack />
                        </IconButton>
                        <Divider style={{ margin: '0 5px' }} orientation="vertical" flexItem />
                        <Typography variant='body1' component='h1' style={{ flexGrow: 1, textAlign: 'center' }}>
                            {props.title}
                        </Typography>
                        {location.pathname !== '/create' && <>
                            <Divider style={{ margin: '0 0 0 5px' }} orientation="vertical" flexItem />
                            <IconButton
                                onClick={() => setOpen(true)}
                                disabled={disabled}
                                style={{ margin: '0 6px' }}
                            >
                                <Badge
                                    badgeContent={props.exp}
                                    overlap="circle"
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    color='secondary'
                                    showZero
                                    max={999}
                                >
                                    <Avatar style={{ backgroundColor: '#555', width: '24px', height: '24px' }}>Xp</Avatar>
                                </Badge>
                            </IconButton>
                        </>}
                    </Toolbar>
                </AppBar>
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <Prompt when={true} message={actionOnPrompt} />
                    <DialogTitle>{T.translate('generic.addxp')}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            label="Points gagnés"
                            type="number"
                            fullWidth
                            variant='outlined'
                            value={xp}
                            onChange={(event) => setXp(event.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} color="primary">
                            {T.translate('generic.cancel')}
                        </Button>
                        <Button onClick={handleAddXp} color="secondary">
                            {T.translate('generic.validate')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}