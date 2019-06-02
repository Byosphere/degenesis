import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Tabs, Tab, Tooltip } from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import T from 'i18n-react';
import { RateReview, SpeakerNotes, PowerSettingsNew } from '@material-ui/icons';
import Character from '../../models/Character';

interface OwnProps {
    tab: number;
    onToggleTab: (value: number) => void;
    onChangeChar: (char: Character) => void;
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

    public handleTabChange = (event: React.ChangeEvent<{}>, value: any) => {
        this.props.onToggleTab(value);
    }

    public handleChangeChar = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onChangeChar(null);
    }

    public render() {
        return (
            <AppBar position="relative" elevation={4}>
                <Toolbar>
                    <IconButton edge="start">
                        {this.props.tab === 0 &&
                            <SpeakerNotes style={{ color: '#fff' }} />}
                        {this.props.tab === 1 &&
                            <RateReview style={{ color: '#fff' }} />}
                    </IconButton>
                    <Typography variant='body1' component='h1' style={{ flexGrow: 1 }}>
                        {'Degenesis App - ' + this.getPageTitle()}
                    </Typography>
                    <Tooltip title={T.translate('generic.changechar')}>
                        <IconButton color="inherit" onClick={this.handleChangeChar}>
                            <PowerSettingsNew />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
                <Tabs value={this.props.tab} variant='fullWidth' onChange={this.handleTabChange}>
                    <Tab label={T.translate('generic.view')} />
                    <Tab label={T.translate('generic.edit')} />
                </Tabs>
            </AppBar>
        );
    }

    private getPageTitle(): string {
        switch (this.props.location.pathname) {
            case '/stats':
                return T.translate('navigator.stats') as string;
            case '/inventory':
                return T.translate('navigator.inventory') as string;
            case '/potentials':
                return T.translate('navigator.potentials') as string;
            case '/notes':
                return T.translate('navigator.notes') as string;
            default:
                return T.translate('navigator.home') as string;
        }
    }
}

export default withRouter(Header);