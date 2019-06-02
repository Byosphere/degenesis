import React, { Component } from 'react';
import { FormGroup, Checkbox, Typography, IconButton } from '@material-ui/core';
import { LooksOne, LooksOneOutlined, LooksTwo, LooksTwoOutlined, Looks6Outlined, Looks3Outlined, Looks3, Looks4Outlined, Looks4, Looks5Outlined, Looks5, Looks6, Casino } from '@material-ui/icons';

interface Props {
    label: string;
    value: number;
    attribute?: boolean;
    potential?: boolean;
    onRollDice?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface State {

}

export default class AttributeJauge extends Component<Props, State> {

    render() {

        const color = this.props.attribute ? '#FFF' : 'rgba(0, 0, 0, 0.54)';

        return (
            <FormGroup
                row
                style={{
                    alignItems: "center",
                    paddingLeft: '10px',
                    backgroundColor: this.props.attribute ? '#444' : '',
                    color,
                    width: '100%',
                    marginRight: this.props.attribute ? '10px' : '',
                }}
            >
                <Typography
                    variant="body1"
                    component="span"
                    style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: this.props.potential ? '60%' : '30%' }}
                >
                    {this.props.label}
                </Typography>
                <div style={{
                    borderRight: '1px solid',
                    paddingRight: this.props.attribute ? '20px' : '12px',
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <Checkbox
                        disabled
                        style={{ color, padding: '9px 2px' }}
                        icon={<LooksOneOutlined />} checkedIcon={<LooksOne />}
                        value="checkedH"
                        checked={this.props.value > 0}
                    />
                    <Checkbox
                        disabled
                        style={{ color, padding: '9px 2px' }}
                        icon={<LooksTwoOutlined />}
                        checkedIcon={<LooksTwo />}
                        value="checkedH"
                        checked={this.props.value >= 2}
                    />
                    <Checkbox
                        disabled
                        style={{ color, padding: '9px 2px' }}
                        icon={<Looks3Outlined />}
                        checkedIcon={<Looks3 />}
                        value="checkedH"
                        checked={this.props.value >= 3}
                    />
                    {!this.props.potential && <Checkbox
                        disabled
                        style={{ color, padding: '9px  2px' }}
                        icon={<Looks4Outlined />} checkedIcon={<Looks4 />}
                        value="checkedH"
                        checked={this.props.value >= 4}
                    />}
                    {!this.props.potential && <Checkbox
                        disabled
                        style={{ color, padding: '9px 2px' }}
                        icon={<Looks5Outlined />} checkedIcon={<Looks5 />}
                        value="checkedH"
                        checked={this.props.value >= 5}
                    />}
                    {!this.props.potential && <Checkbox
                        disabled
                        style={{ color, padding: '9px 2px' }}
                        icon={<Looks6Outlined />} checkedIcon={<Looks6 />}
                        value="checkedH"
                        checked={this.props.value === 6}
                    />}
                </div>
                {!this.props.attribute && <IconButton onClick={this.props.onRollDice}>
                    <Casino color='secondary' />
                </IconButton>}
            </FormGroup>
        )
    }
}
