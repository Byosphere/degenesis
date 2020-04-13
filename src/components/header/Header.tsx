import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Avatar, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Divider, CircularProgress } from '@material-ui/core';
import { useHistory, Prompt } from 'react-router-dom';
import { ArrowBack, Save } from '@material-ui/icons';
import T from 'i18n-react';
import { useStyles } from './styles';

interface Props {
    title: string;
    exp: number;
    onAddXp: (value: number) => void;
    onSave: () => void;
    dirty: boolean;
    disabled: boolean;
}

export default function Header(props: Props) {

    const { dirty, disabled } = props;
    const history = useHistory();
    const [open, setOpen] = useState<boolean>(false);
    const [xp, setXp] = useState<string>('');
    const classes = useStyles({ dirty, disabled });

    function handleBack() {
        history.replace('/');
    }

    function actionOnPrompt(): boolean {
        setOpen(false);
        return false;
    }

    function handleValidate() {
        props.onAddXp(parseInt(xp, 10));
        setXp('');
        setOpen(false);
    }

    return (
        <>
            <AppBar position="fixed" elevation={4}>
                <Toolbar className={classes.toolbar}>
                    <IconButton edge="start" color="inherit" onClick={handleBack}>
                        <ArrowBack />
                    </IconButton>
                    <Divider className={classes.divider1} orientation="vertical" flexItem />
                    <Typography variant='body1' component='h1' style={{ flexGrow: 1, textAlign: 'center' }}>
                        {props.title}
                    </Typography>
                    <Divider className={classes.divider2} orientation="vertical" flexItem />
                    <IconButton
                        className={classes.xpButton}
                        onClick={() => setOpen(true)}
                    >
                        <Badge
                            badgeContent={props.exp}
                            overlap="circle"
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            color='secondary'
                            max={999}
                        >
                            <Avatar className={classes.avatar}>Xp</Avatar>
                        </Badge>
                    </IconButton>
                    <Divider className={classes.divider3} orientation="vertical" flexItem />
                    <IconButton disabled={disabled || !dirty} onClick={props.onSave} className={classes.saveButton}>
                        <Badge color="secondary" invisible={!dirty || disabled} variant="dot">
                            {disabled ? <CircularProgress disableShrink size={24} className={classes.progress} /> : <Save />}
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                {open && <Prompt when={true} message={actionOnPrompt} />}
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
                    <Button onClick={handleValidate} color="secondary" disabled={!xp}>
                        {T.translate('generic.validate')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}