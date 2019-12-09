import React, { Component } from 'react'
import { Card, CircularProgress, CardContent, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import T from 'i18n-react';
import { userConnect } from '../../utils/fetchers';
import { saveUser } from '../../utils/StorageManager';
import User from '../../models/User';

interface Props {
    onConnected: (user: User) => void;
}

interface State {
    loading: boolean;
    name: string;
    password: string;
}

export default class Connect extends Component<Props, State> {

    public constructor(props: Props) {
        super(props);

        this.state = {
            loading: false,
            name: '',
            password: ''
        }
    }

    public componentDidMount() {

    }

    public render() {

        return (
            <Card style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: 'center', marginTop: '10%' }}>
                <figure style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <img src='./images/degenesis.png' alt='degenesis' />
                </figure>
                {this.state.loading && <React.Fragment>
                    <CircularProgress style={{ marginTop: '16%' }} color="secondary" />
                    <span style={{ marginTop: '10px' }}>{T.translate('generic.loading')}...</span>
                </React.Fragment>}
                {!this.state.loading && <CardContent style={{ flex: 1, display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <section>
                        <TextField
                            label="Identifiant"
                            variant="outlined"
                            fullWidth
                            style={{ marginBottom: '16px' }}
                            onChange={(event: any) => this.setState({ name: event.target.value })}
                        />
                        <TextField
                            type='password'
                            label="Mot de passe"
                            variant="outlined"
                            fullWidth
                            onChange={(event: any) => this.setState({ password: event.target.value })}
                        />
                        <Button
                            color="secondary"
                            variant='outlined'
                            style={{ marginTop: '32px' }}
                            onClick={this.handleConnect}
                            disabled={!this.state.name || !this.state.password}
                        >
                            Se connecter
                        </Button>
                    </section>
                </CardContent>}
            </Card>
        );
    }

    private handleConnect = async () => {
        this.setState({ loading: true });
        const response = await userConnect(this.state.name, this.state.password);

        if (response && !response.error) {
            saveUser(response.user);
            this.props.onConnected(response.user);
        }
    }
}
