import React, { Component } from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import Character, { } from '../../models/Character';
import T from 'i18n-react';
import SwipeableViews from 'react-swipeable-views';
import ViewStatsPage from './ViewStatsPage';
import EditStatsPage from './EditStatsPage';

interface ownProps {
    char: Character;
    onTabChange: (value: any) => void;
    tab: number;
}

type Props = ownProps & RouteComponentProps;

export default class Stats extends Component<Props, {}> {

    public render() {

        const { char } = this.props;

        return (
            <SwipeableViews
                index={this.props.tab}
                onChangeIndex={this.props.onTabChange}
                style={{ height: 'calc(100% - 48px)' }}
            >
                <ViewStatsPage char={char} />
                <EditStatsPage char={char} />
            </SwipeableViews>
        );
    }
}
