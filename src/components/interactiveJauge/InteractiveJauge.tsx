import React, { Component } from 'react'
import { Typography, IconButton } from '@material-ui/core';
import { RemoveCircle, AddCircle, TurnedIn, TurnedInNot } from '@material-ui/icons';
import T from 'i18n-react';

interface Props {
    label: string;
    currentValue: number;
    maximum: number;
    onChange?: (field: string, newValue: number) => void;
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

        const { label, currentValue, maximum } = this.props;

        let icons: JSX.Element[] = [];
        for (let i = 1; i <= maximum; i++) {
            const icon = i <= currentValue ? <TurnedIn style={{ margin: '0 -2px' }} key={i} color='inherit' /> : <TurnedInNot style={{ margin: '0 -2px' }} key={i} color='inherit' />
            icons.push(icon);
        }

        return (
            <div style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Typography variant='caption'>{T.translate('generic.' + label) + ' (' + currentValue + ') :'}</Typography>
                    <div style={{ color: 'rgb(68, 68, 68)' }}>
                        {icons}
                    </div>
                </div>
                <div style={{ display: 'flex' }}>
                    <IconButton style={{ padding: '5px' }} onClick={this.handleRemove} disabled={currentValue === 0}>
                        <RemoveCircle color='primary' />
                    </IconButton>
                    <IconButton style={{ padding: '5px' }} onClick={this.handleAdd} disabled={currentValue === maximum}>
                        <AddCircle color='secondary' />
                    </IconButton>
                </div>
            </div>
        );
    }
}
