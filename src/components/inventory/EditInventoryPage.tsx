import React, { Component } from 'react'
import Character from '../../models/Character';
import { Build } from '@material-ui/icons';

interface Props {
    char: Character;
}

export default class EditInventoryPage extends Component<Props, {}> {
    render() {
        return (
            <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Build style={{ marginRight: '10px' }} />
                Work in Progress
            </div>
        )
    }
}
