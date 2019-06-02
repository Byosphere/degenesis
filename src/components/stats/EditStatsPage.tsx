import React, { Component } from 'react'
import Character from '../../models/Character';
import { Card } from '@material-ui/core';

interface Props {
    char: Character;
}

export default class EditStatsPage extends Component<Props, {}> {

    public render() {
        return (
            <div style={{ margin: '5px' }}>
                <Card>
                    
                </Card>
            </div>
        );
    }
}
