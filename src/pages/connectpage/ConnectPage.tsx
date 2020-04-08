import React, { useState } from 'react';
import Loader from '../../components/Loader';
import { Card, CardContent, TextField, Button, Snackbar } from '@material-ui/core';
import T from 'i18n-react';
import { userConnect, registerUser } from '../../utils/fetchers';
import { saveUserToken } from '../../utils/StorageManager';
import { Error } from '@material-ui/icons';
import User from '../../models/User';
import RegisterModal, { RegisterForm } from './RegisterModal';

interface Props {
    onConnect: (user: User) => void;
}

interface FormLogin {
    name: string;
    password: string;
}

export default function ConnectPage(props: Props) {

    const [loading, setLoading] = useState<boolean>(false);
    const [form, setForm] = useState<FormLogin>({ name: '', password: '' });
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [snackOpen, setSnackOpen] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    async function handleConnect() {
        setLoading(true);
        try {
            const { data } = await userConnect(form.name, form.password);
            if (data && data.token) {
                saveUserToken(data.token);
                props.onConnect(data.user);
            }
        } catch (err) {
            setErrorMessage(T.translate('generic.wrongpassword') as string);
            setSnackOpen(true);
            setLoading(false);
        }
    }

    function handleClose(event: React.SyntheticEvent<any, Event>, reason: string) {
        if (reason === 'clickaway') return;
        setSnackOpen(false);
    }

    async function handleRegister(form: RegisterForm) {
        setModalOpen(false);
        setLoading(true);
        try {
            const { data } = await registerUser(form);
            if (data && data.token) {
                saveUserToken(data.token);
                props.onConnect(data.user);
            }
        } catch (error) {
            setErrorMessage(error.message);
            setSnackOpen(true);
            setLoading(false);
        }
    }

    if (loading) return <Loader />;

    return (
        <Card style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: 'center', marginTop: '10%' }}>
            <figure style={{ textAlign: 'center', marginBottom: '16px', marginTop: '32px' }}>
                <img src='./images/degenesis.png' alt='degenesis' />
                <figcaption style={{ opacity: 0.8 }}>- Unofficial Player App -</figcaption>
            </figure>
            <CardContent style={{ flex: 1, display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <section>
                    <TextField
                        label={T.translate('connect.pseudo')}
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: '16px' }}
                        onChange={(event: any) => setForm({ ...form, name: event.target.value })}
                        error={!!errorMessage}
                        autoFocus
                    />
                    <TextField
                        type='password'
                        label={T.translate('connect.password')}
                        variant="outlined"
                        fullWidth
                        onChange={(event: any) => setForm({ ...form, password: event.target.value })}
                        error={!!errorMessage}
                    />
                    <Button
                        color="secondary"
                        variant='outlined'
                        style={{ marginTop: '32px', marginRight: '8px' }}
                        onClick={handleConnect}
                        disabled={!form.name || !form.password}
                    >
                        {T.translate('connect.connect')}
                    </Button>
                    <Button
                        color="primary"
                        variant='outlined'
                        style={{ marginTop: '32px', marginLeft: '8px' }}
                        onClick={() => setModalOpen(true)}
                    >
                        {T.translate('connect.register')}
                    </Button>
                </section>
            </CardContent>
            <Snackbar
                open={snackOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                message={<span style={{ display: 'flex', alignItems: 'center' }}>
                    <Error style={{ marginRight: '8px' }} />{errorMessage}
                </span>}
                classes={{ root: 'error-snackbar' }}
            />
            <RegisterModal
                open={modalOpen}
                onSend={handleRegister}
                onClose={() => setModalOpen(false)}
            />
        </Card>
    );
}