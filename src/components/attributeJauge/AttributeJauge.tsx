import React, { Component } from 'react';
import { FormGroup, Typography, IconButton } from '@material-ui/core';
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
                    // borderRight: this.props.attribute ? '' : '1px solid',
                    paddingRight: this.props.attribute ? '20px' : '12px',
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                }}>
                    {this.props.value > 0 ? <LooksOne /> : <LooksOneOutlined />}
                    {this.props.value >= 2 ? <LooksTwo /> : <LooksTwoOutlined />}
                    {this.props.value >= 3 ? <Looks3 /> : <Looks3Outlined />}
                    {!this.props.potential &&
                        <React.Fragment>
                            {this.props.value >= 4 ? <Looks4 /> : <Looks4Outlined />}
                            {this.props.value >= 5 ? <Looks5 /> : <Looks5Outlined />}
                            {this.props.value === 6 ? <Looks6 /> : <Looks6Outlined />}
                        </React.Fragment>
                    }
                </div>
                {/* {!this.props.attribute && <IconButton onClick={this.props.onRollDice}>
                    <Casino color='secondary' />
                </IconButton>} */}
            </FormGroup>
        )
    }
}
