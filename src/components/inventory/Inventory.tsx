import React, { Component } from 'react';
import Character from '../../models/Character';
import { RouteComponentProps } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import ViewInventoryPage from './ViewInventoryPage';
import EditInventoryPage from './EditInventoryPage';

interface ownProps {
    char: Character;
    onTabChange: (value: any) => void;
    tab: number;
}

type Props = ownProps & RouteComponentProps;

export default class Inventory extends Component<Props, {}> {


    public render() {
        const { char } = this.props;

        return (
            <SwipeableViews
                index={this.props.tab}
                onChangeIndex={this.props.onTabChange}
                style={{ height: 'calc(100% - 48px)' }}
            >
                <ViewInventoryPage char={char} />
                <EditInventoryPage char={char} />
            </SwipeableViews>
        );
    }
}
