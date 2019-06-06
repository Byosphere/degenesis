import React, { Component } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import Character from '../../models/Character';
import SwipeableViews from 'react-swipeable-views';
import ViewStatsPage from './ViewStatsPage';
import EditStatsPage from './EditStatsPage';

interface ownProps {
    char: Character;
    onTabChange: (value: any) => void;
    onCharChange: (char: Character, save: boolean) => void;
    tab: number;
}

type Props = ownProps & RouteComponentProps;

export default class Stats extends Component<Props, {}> {

    public render() {

        const { char } = this.props;
        if (!char) return <Redirect to='/' />;

        return (
            <SwipeableViews
                index={this.props.tab}
                onChangeIndex={this.props.onTabChange}
                style={{ height: '100%' }}
            >
                <ViewStatsPage onCharChange={this.props.onCharChange} char={char} />
                <EditStatsPage onCharChange={this.props.onCharChange} char={char} visible={this.props.tab === 1} />
            </SwipeableViews>
        );
    }
}
