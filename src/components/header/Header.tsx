import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Switch, IconButton } from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import T from 'i18n-react';
import { RateReview, SpeakerNotes } from '@material-ui/icons';

interface State {

}

interface OwnProps {
    tab: number;
    onToggleTab: (value: number) => void;
}

type Props = OwnProps & RouteComponentProps;

class Header extends Component<Props, State> {

    public handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        this.props.onToggleTab(checked ? 1 : 0);
    }

    public handleClick = (value: number) => {
        this.props.onToggleTab(value);
    }

    public render() {
        return (
            <AppBar position="relative" elevation={4}>
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <Typography variant='body1' component='h1'>{'Degenesis App - ' + this.getPageTitle()}</Typography>
                    <div>
                        <IconButton
                            disabled={this.props.tab === 0}
                            style={{ paddingRight: '0px' }}
                            onClick={() => this.handleClick(0)}
                        >
                            <SpeakerNotes style={{ color: this.props.tab === 1 ? '#fff' : '' }} />
                        </IconButton>
                        <Switch checked={this.props.tab === 1} onChange={this.handleChange} />
                        <IconButton
                            disabled={this.props.tab === 1}
                            style={{ paddingLeft: '0px' }}
                            onClick={() => this.handleClick(1)}
                        >
                            <RateReview style={{ color: this.props.tab === 0 ? '#fff' : '' }} />
                        </IconButton>

                    </div>
                </Toolbar>
            </AppBar>
        );
    }

    private getPageTitle(): string {
        switch (this.props.location.pathname) {
            case '/':
                return T.translate('navigator.stats') as string;
            case '/inventory':
                return T.translate('navigator.inventory') as string;
            case '/potentials':
                return T.translate('navigator.potentials') as string;
            case '/notes':
                return T.translate('navigator.notes') as string;
            default:
                return T.translate('navigator.stats') as string;
        }
    }
}

export default withRouter(Header);