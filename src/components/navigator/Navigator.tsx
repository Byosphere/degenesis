import React, { Component } from 'react';
import './style.css';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Dashboard, LibraryBooks, Note, AccessibilityNew } from '@material-ui/icons';
import T from 'i18n-react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

class Navigator extends Component<RouteComponentProps, {}> {

    public handleChange = (event: React.ChangeEvent<{}>, value: any) => {
        switch (value) {
            case 0:
                this.props.history.push('/');
                break;
            case 1:
                this.props.history.push('/inventory');
                break;
            case 2:
                this.props.history.push('/potentials');
                break;
            case 3:
                this.props.history.push('/notes');
                break;
            default:
                this.props.history.push('/');
        }
    }

    public render() {

        return (
            <div className='bottom-navigator'>
                <BottomNavigation
                    value={this.getLocationValue(this.props.location.pathname)}
                    showLabels
                    onChange={this.handleChange}
                >
                    <BottomNavigationAction label={T.translate('navigator.stats')} icon={<Dashboard />} />
                    <BottomNavigationAction label={T.translate('navigator.inventory')} icon={<LibraryBooks />} />
                    <BottomNavigationAction label={T.translate('navigator.potentials')} icon={<AccessibilityNew />} />
                    <BottomNavigationAction label={T.translate('navigator.notes')} icon={<Note />} />
                </BottomNavigation>
            </div>
        );
    }

    private getLocationValue(path: string): number {
        switch (path) {
            case '/':
                return 0;
            case '/inventory':
                return 1;
            case '/potentials':
                return 2;
            case '/notes':
                return 3;
            default:
                return 0;
        }
    }
}

export default withRouter(Navigator);
