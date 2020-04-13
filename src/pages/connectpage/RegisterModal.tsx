import React, { useState } from 'react';
import { Dialog, DialogContent, DialogContentText, TextField, DialogActions, Button, InputAdornment, AppBar, Toolbar, IconButton, Typography, Divider } from '@material-ui/core';
import T from 'i18n-react';
import { VpnKey, AccountCircle, Dns, Close } from '@material-ui/icons';
import { Prompt } from 'react-router-dom';
import TransitionUp from '../../components/TransitionUp';
import { useStyles } from './styles';

interface Props {
    open: boolean;
    onSend: (registerForm: RegisterForm) => void;
    onClose: () => void;
}

export interface RegisterForm {
    pseudo: string;
    password: string;
    passwordConfirm: string;
    serverCode: string;
}

interface FormErrors {
    pseudo: boolean;
    password: boolean;
    passwordConfirm: boolean;
    serverCode: boolean;
}

export default function RegisterModal(props: Props) {

    const classes = useStyles();
    const [registerForm, setRegisterForm] = useState<RegisterForm>({
        pseudo: '',
        password: '',
        passwordConfirm: '',
        serverCode: ''
    });

    const [errors, setErrors] = useState<FormErrors>({
        pseudo: false,
        password: false,
        passwordConfirm: false,
        serverCode: false
    });

    function verifyFields() {
        errors.pseudo = registerForm.pseudo.length < 6;
        errors.password = registerForm.password.length < 8;
        errors.passwordConfirm = registerForm.password !== registerForm.passwordConfirm;
        errors.serverCode = !registerForm.serverCode;
        setErrors({ ...errors });

        if (!errors.pseudo && !errors.password && !errors.passwordConfirm && !errors.serverCode) {
            props.onSend(registerForm);
        }
    }

    function actionOnPrompt(): boolean {
        props.onClose();
        return false;
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} fullScreen TransitionComponent={TransitionUp}>
            {props.open && <Prompt when={true} message={actionOnPrompt} />}
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="Close">
                        <Close />
                    </IconButton>
                    <Typography variant="h6">
                        {T.translate('connect.register')}
                    </Typography>
                </Toolbar>
            </AppBar>
            <DialogContent className={classes.dialogContent}>
                <DialogContentText>
                    {T.translate('connect.registertext')}
                </DialogContentText>
                <TextField
                    autoFocus
                    label={T.translate('connect.pseudo')}
                    variant="outlined"
                    fullWidth
                    className={classes.dialogPseudo}
                    onChange={(event) => setRegisterForm({ ...registerForm, pseudo: event.target.value })}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    error={errors.pseudo}
                    helperText={T.translate('connect.pseudoalpha')}
                />
                <TextField
                    label={T.translate('connect.password')}
                    variant="outlined"
                    fullWidth
                    className={classes.dialogMargin}
                    type='password'
                    onChange={(event) => setRegisterForm({ ...registerForm, password: event.target.value })}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <VpnKey />
                            </InputAdornment>
                        ),
                    }}
                    helperText={T.translate('connect.passwordmin')}
                    error={errors.password}
                />
                <TextField
                    label={T.translate('connect.passwordconfirm')}
                    variant="outlined"
                    fullWidth
                    className={classes.dialogMargin}
                    type='password'
                    onChange={(event) => setRegisterForm({ ...registerForm, passwordConfirm: event.target.value })}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <VpnKey />
                            </InputAdornment>
                        ),
                    }}
                    helperText={errors.passwordConfirm ? T.translate('connect.passworderror') : ''}
                    error={errors.passwordConfirm}
                />
                <Divider className={classes.dialogMargin} />
                <TextField
                    label={T.translate('connect.servercode')}
                    variant="outlined"
                    fullWidth
                    className={classes.dialogMargin}
                    type='password'
                    onChange={(event) => setRegisterForm({ ...registerForm, serverCode: event.target.value })}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Dns />
                            </InputAdornment>
                        ),
                    }}
                    helperText={T.translate('connect.codehelper')}
                    error={errors.serverCode}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">{T.translate('generic.cancel')}</Button>
                <Button onClick={verifyFields} color="secondary">{T.translate('connect.register')}</Button>
            </DialogActions>
        </Dialog>
    );
}