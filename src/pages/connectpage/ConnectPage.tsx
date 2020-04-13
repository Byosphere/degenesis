import React, { useState, useContext } from 'react';
import Loader from '../../components/Loader';
import { Card, CardContent, TextField, Button } from '@material-ui/core';
import T from 'i18n-react';
import { userConnect, registerUser } from '../../utils/fetchers';
import { saveUserToken } from '../../utils/StorageManager';
import User from '../../models/User';
import RegisterModal, { RegisterForm } from './RegisterModal';
import { useStyles } from './styles';
import { SnackbarContext } from '../../App';

interface Props {
    onConnect: (user: User) => void;
}

interface FormLogin {
    name: string;
    password: string;
}

export default function ConnectPage(props: Props) {

    const classes = useStyles();
    const [loading, setLoading] = useState<boolean>(false);
    const [form, setForm] = useState<FormLogin>({ name: '', password: '' });
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const { setSnackbar } = useContext(SnackbarContext);

    async function handleConnect() {
        setLoading(true);
        setError(false);
        try {
            const { data } = await userConnect(form.name, form.password);
            if (data && data.token) {
                saveUserToken(data.token);
                props.onConnect(data.user);
            }
        } catch (err) {
            setSnackbar({
                type: 'error',
                message: T.translate('generic.wrongpassword')
            });
            setError(true);
            setLoading(false);
        }
    }

    async function handleRegister(form: RegisterForm) {
        setModalOpen(false);
        setLoading(true);
        setError(false);
        try {
            const { data } = await registerUser(form);
            if (data && data.token) {
                saveUserToken(data.token);
                props.onConnect(data.user);
            }
        } catch (error) {
            setSnackbar({
                type: 'error',
                message: error.message
            });
            setError(true);
            setLoading(false);
        }
    }

    if (loading) return <Loader />;

    return (
        <Card className={classes.mainCard}>
            <figure className={classes.figure}>
                <img src='./images/degenesis.png' alt='degenesis' />
                <figcaption className={classes.figcaption}>- Unofficial Player App -</figcaption>
            </figure>
            <CardContent className={classes.cardContent}>
                <section>
                    <TextField
                        label={T.translate('connect.pseudo')}
                        variant="outlined"
                        fullWidth
                        className={classes.pseudo}
                        onChange={(event: any) => setForm({ ...form, name: event.target.value })}
                        error={error}
                        autoFocus
                    />
                    <TextField
                        type='password'
                        label={T.translate('connect.password')}
                        variant="outlined"
                        fullWidth
                        onChange={(event: any) => setForm({ ...form, password: event.target.value })}
                        error={error}
                    />
                    <Button
                        color="secondary"
                        variant='outlined'
                        className={classes.connect}
                        onClick={handleConnect}
                        disabled={!form.name || !form.password}
                    >
                        {T.translate('connect.connect')}
                    </Button>
                    <Button
                        color="primary"
                        variant='outlined'
                        className={classes.register}
                        onClick={() => setModalOpen(true)}
                    >
                        {T.translate('connect.register')}
                    </Button>
                </section>
            </CardContent>
            <RegisterModal
                open={modalOpen}
                onSend={handleRegister}
                onClose={() => setModalOpen(false)}
            />
        </Card>
    );
}