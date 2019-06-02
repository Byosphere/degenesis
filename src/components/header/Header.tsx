import React, { Component } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router-dom';


interface State {

}

class Header extends Component<RouteComponentProps, State> {

    constructor(props: RouteComponentProps) {
        super(props);

    }
    public render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography>Degenesis App</Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withRouter(Header);