import React, { Component } from 'react';
import Character from '../../models/Character';
import { RouteComponentProps, Redirect } from 'react-router-dom';
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

        if (!char) return <Redirect to='/' />;

        return (
            <SwipeableViews
                index={this.props.tab}
                onChangeIndex={this.props.onTabChange}
                style={{ height: '100%' }}
            >
                <ViewInventoryPage char={char} />
                <EditInventoryPage char={char} />
            </SwipeableViews>
        );
    }
}
