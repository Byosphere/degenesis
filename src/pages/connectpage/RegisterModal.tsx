import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, InputAdornment } from '@material-ui/core';
import T from 'i18n-react';
import { VpnKey, AccountCircle, Dns } from '@material-ui/icons';

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

    return (
        <Dialog open={props.open} onClose={props.onClose} fullScreen>
            <DialogTitle id="form-dialog-title">{T.translate('connect.register')}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {T.translate('connect.registertext')}
                </DialogContentText>
                <TextField
                    autoFocus
                    label={T.translate('connect.pseudo')}
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: '16px' }}
                    onChange={(event) => setRegisterForm({ ...registerForm, pseudo: event.target.value })}
                    margin="dense"
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
                    style={{ marginBottom: '16px' }}
                    margin="dense"
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
                    style={{ marginBottom: '16px' }}
                    margin="dense"
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
                <TextField
                    label={T.translate('connect.servercode')}
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: '16px' }}
                    margin="dense"
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