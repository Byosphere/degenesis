import React, { Component } from 'react';
import { FormGroup, Typography } from '@material-ui/core';
import { LooksOne, LooksOneOutlined, LooksTwo, LooksTwoOutlined, Looks6Outlined, Looks3Outlined, Looks3, Looks4Outlined, Looks4, Looks5Outlined, Looks5, Looks6 } from '@material-ui/icons';

interface Props {
    label: string;
    value: number;
    attribute?: boolean;
    potential?: boolean;
    onRollDice?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onClick?: (value: number) => void;
}

interface State {

}

export default class AttributeJauge extends Component<Props, State> {

    public render() {

        const color = this.props.attribute ? '#FFF' : 'rgba(0, 0, 0, 0.54)';

        return (
            <FormGroup
                // onClick={(event) => event.stopPropagation()}
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
                    {this.props.value > 0 ? <LooksOne onClick={(evt) => this.handleClick(evt, 1)} /> : <LooksOneOutlined onClick={(evt) => this.handleClick(evt, 1)} />}
                    {this.props.value >= 2 ? <LooksTwo onClick={(evt) => this.handleClick(evt, 2)} /> : <LooksTwoOutlined onClick={(evt) => this.handleClick(evt, 2)} />}
                    {this.props.value >= 3 ? <Looks3 onClick={(evt) => this.handleClick(evt, 3)} /> : <Looks3Outlined onClick={(evt) => this.handleClick(evt, 3)} />}
                    {!this.props.potential &&
                        <React.Fragment>
                            {this.props.value >= 4 ? <Looks4 onClick={(evt) => this.handleClick(evt, 4)} /> : <Looks4Outlined onClick={(evt) => this.handleClick(evt, 4)} />}
                            {this.props.value >= 5 ? <Looks5 onClick={(evt) => this.handleClick(evt, 5)} /> : <Looks5Outlined onClick={(evt) => this.handleClick(evt, 5)} />}
                            {this.props.value === 6 ? <Looks6 onClick={(evt) => this.handleClick(evt, 6)} /> : <Looks6Outlined onClick={(evt) => this.handleClick(evt, 6)} />}
                        </React.Fragment>
                    }
                </div>
            </FormGroup>
        )
    }

    public handleClick(event: React.MouseEvent<any>, value: number) {
        event.stopPropagation()
        if (this.props.onClick) this.props.onClick(value);
    }
}
