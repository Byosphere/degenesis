import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';

interface OwnProps {
    title: string;
}

interface State {
    anchor: Element | null;
}

type Props = OwnProps & RouteComponentProps;

class Header extends Component<Props, State> {

    public constructor(props: Props) {
        super(props);

        this.state = {
            anchor: null
        }
    }

    public handleBack = () => {
        this.props.history.push('/');
    }


    public render() {

        if (this.props.location.pathname === '/') {
            return null;
        } else {
            return (
                <AppBar position="relative" elevation={4}>
                    <Toolbar>
                        {this.props.location.pathname !== '/' &&
                            <IconButton edge="start" color="inherit" onClick={this.handleBack}>
                                <ArrowBack />
                            </IconButton>
                        }
                        <Typography variant='body1' component='h1' style={{ flexGrow: 1 }}>
                            {this.props.title}
                        </Typography>
                    </Toolbar>
                </AppBar>
            );
        }
    }
}

export default withRouter(Header);