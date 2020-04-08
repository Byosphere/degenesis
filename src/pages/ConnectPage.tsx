import React, { Component } from 'react'
import { Card, CircularProgress, CardContent, TextField, Button, Snackbar } from '@material-ui/core';
import { Error } from '@material-ui/icons';
import T from 'i18n-react';
import { userConnect, getUser } from '../utils/fetchers';
import User from '../models/User';
import { saveUserToken, getUserToken } from '../utils/StorageManager';
import Loader from '../components/Loader';

interface Props {
    onConnect: (user: User) => void;
}

interface State {
    loading: boolean;
    name: string;
    password: string;
    errorMessage: string;
    snackOpen: boolean;
}

export default class ConnectPage extends Component<Props, State> {

    public constructor(props: Props) {
        super(props);

        this.state = {
            name: '',
            password: '',
            errorMessage: '',
            snackOpen: false,
            loading: false
        }
    }

    public render() {

        if (this.state.loading) return <Loader />;

        return (
            <Card style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: 'center', marginTop: '10%' }}>
                <figure style={{ textAlign: 'center', marginBottom: '16px', marginTop: '32px' }}>
                    <img src='./images/degenesis.png' alt='degenesis' />
                </figure>
                <CardContent style={{ flex: 1, display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <section>
                        <TextField
                            label={T.translate('connect.pseudo')}
                            variant="outlined"
                            fullWidth
                            style={{ marginBottom: '16px' }}
                            onChange={(event: any) => this.setState({ name: event.target.value })}
                            error={!!this.state.errorMessage}
                        />
                        <TextField
                            type='password'
                            label={T.translate('connect.password')}
                            variant="outlined"
                            fullWidth
                            onChange={(event: any) => this.setState({ password: event.target.value })}
                            error={!!this.state.errorMessage}
                        />
                        <Button
                            color="secondary"
                            variant='outlined'
                            style={{ marginTop: '32px' }}
                            onClick={this.handleConnect}
                            disabled={!this.state.name || !this.state.password}
                        >
                            {T.translate('connect.connect')}
                        </Button>
                    </section>
                </CardContent>
                <Snackbar
                    open={this.state.snackOpen}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message={<span style={{ display: 'flex', alignItems: 'center' }}><Error style={{ marginRight: '8px' }} />{this.state.errorMessage}</span>}
                    classes={{ root: 'error-snackbar' }}
                />
            </Card>
        );
    }

    private handleClose = (event: React.SyntheticEvent<any, Event>, reason: string) => {
        if (reason === 'clickaway') return;

        this.setState({
            snackOpen: false
        });
    }

    private handleConnect = async () => {
        this.setState({ loading: true });
        try {
            const { data } = await userConnect(this.state.name, this.state.password);
            if (data && data.token) {
                saveUserToken(data.token);
                this.props.onConnect(data.user);
            }
        } catch (err) {
            this.setState({
                errorMessage: T.translate('generic.wrongpassword') as string,
                snackOpen: true,
                loading: false,
            });
        }
    }
}
