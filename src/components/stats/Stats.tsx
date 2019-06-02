import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Character, { } from '../../models/Character';
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
                style={{ height: '100%' }}
            >
                <ViewStatsPage char={char} />
                <EditStatsPage char={char} />
            </SwipeableViews>
        );
    }
}
