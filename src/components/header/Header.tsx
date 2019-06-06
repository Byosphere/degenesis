import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Tabs, Tab } from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import T from 'i18n-react';
import { RateReview, SpeakerNotes, ViewQuilt, ArrowBack } from '@material-ui/icons';
import Character from '../../models/Character';

interface OwnProps {
    tab: number;
    onToggleTab: (value: number) => void;
    onChangeChar: (char: Character, save: boolean) => void;
    displayTabs: boolean;
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

    public handleChangeChar = () => {
        this.props.onChangeChar(null, false);
    }

    public handleBack = () => {
        this.props.onChangeChar(null, false);
        this.props.history.push('/');
    }


    public render() {
        return (
            <AppBar position="relative" elevation={4}>
                <Toolbar>
                    {this.getSecondaryAction()}
                    <Typography variant='body1' component='h1' style={{ flexGrow: 1 }}>
                        {'Degenesis - ' + this.getPageTitle()}
                    </Typography>
                    {this.props.displayTabs && <IconButton>
                        {this.props.tab === 0 &&
                            <SpeakerNotes style={{ color: '#fff' }} />}
                        {this.props.tab === 1 &&
                            <RateReview style={{ color: '#fff' }} />}
                    </IconButton>}
                    {!this.props.displayTabs && <IconButton>
                        <ViewQuilt style={{ color: '#fff' }} />
                    </IconButton>}
                </Toolbar>
                {this.props.displayTabs && <Tabs value={this.props.tab} variant='fullWidth' onChange={this.handleTabChange}>
                    <Tab label={T.translate('generic.view')} />
                    <Tab label={T.translate('generic.edit')} />
                </Tabs>}
            </AppBar>
        );
    }

    private getSecondaryAction(): JSX.Element {
        switch (this.props.location.pathname) {
            case '/stats':
            case '/inventory':
            case '/potentials':
            case '/notes':
            case '/create':
                return (
                    <IconButton edge="start" color="inherit" onClick={this.handleBack}>
                        <ArrowBack />
                    </IconButton>
                );
            default:
                return null;
        }
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
            case '/create':
                return T.translate('navigator.create') as string;
            default:
                return T.translate('navigator.home') as string;
        }
    }
}

export default withRouter(Header);