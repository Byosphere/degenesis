import React, { Component } from 'react';
import Character from '../../models/Character';
import { RouteComponentProps } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import ViewPotentialsPage from './ViewPotentialsPage';
import EditPotentialsPage from './EditPotentialsPage';

interface ownProps {
    char: Character;
    onTabChange: (value: any) => void;
    tab: number;
}

type Props = ownProps & RouteComponentProps;

export default class Potentials extends Component<Props, {}> {


    public render() {
        const { char } = this.props;

        return (
            <SwipeableViews
                index={this.props.tab}
                onChangeIndex={this.props.onTabChange}
                style={{ height: 'calc(100% - 48px)' }}
            >
                <ViewPotentialsPage char={char} />
                <EditPotentialsPage char={char} />
            </SwipeableViews>
        );
    }
}
