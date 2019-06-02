import React, { Component } from 'react'
import { Typography, LinearProgress, IconButton } from '@material-ui/core';
import { PlusOne, Remove, RemoveCircle, AddCircle } from '@material-ui/icons';

interface Props {
    label: string;
    currentValue: number;
    maximum: number;
    onChange?: (newValue: number) => void;
    jaungeHeight?: number;
}

export default class InteractiveJauge extends Component<Props, {}> {

    public render() {

        const { label, jaungeHeight, currentValue, maximum } = this.props;
        const value = (maximum - currentValue) * 100 / maximum;

        return (
            <div>
                <Typography variant='caption'>{label + ' (' + currentValue + ') :'}</Typography>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '-14px' }}>
                    <LinearProgress
                        variant="determinate"
                        value={value}
                        style={{
                            height: jaungeHeight ? jaungeHeight + 'px' : '5px',
                            width: 'calc(100% - 70px)',
                            marginRight: '10px'
                        }}
                    />
                    <IconButton style={{ padding: '5px' }}>
                        <RemoveCircle fontSize="small" color='primary' />
                    </IconButton>
                    <IconButton style={{ padding: '5px' }}>
                        <AddCircle fontSize="small" color='secondary' />
                    </IconButton>
                </div>
            </div>
        );
    }
}
