import React, { Component } from 'react'
import { Typography, LinearProgress, IconButton } from '@material-ui/core';
import { RemoveCircle, AddCircle } from '@material-ui/icons';
import T from 'i18n-react';

interface Props {
    label: string;
    currentValue: number;
    maximum: number;
    onChange?: (field: string, newValue: number) => void;
    jaungeHeight?: number;
}

export default class InteractiveJauge extends Component<Props, {}> {

    public handleAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.currentValue + 1 <= this.props.maximum && this.props.onChange) {
            this.props.onChange(this.props.label, this.props.currentValue + 1);
        }
    }

    public handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.currentValue - 1 >= 0 && this.props.onChange) {
            this.props.onChange(this.props.label, this.props.currentValue - 1);
        }
    }

    public render() {

        const { label, jaungeHeight, currentValue, maximum } = this.props;
        const value = (maximum - currentValue) * 100 / maximum;

        return (
            <div>
                <Typography variant='caption'>{T.translate('generic.' + label) + ' (' + currentValue + ') :'}</Typography>
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
                    <IconButton style={{ padding: '5px' }} onClick={this.handleRemove} disabled={currentValue === 0}>
                        <RemoveCircle fontSize="small" color='primary' />
                    </IconButton>
                    <IconButton style={{ padding: '5px' }} onClick={this.handleAdd} disabled={currentValue === maximum}>
                        <AddCircle fontSize="small" color='secondary' />
                    </IconButton>
                </div>
            </div>
        );
    }
}
