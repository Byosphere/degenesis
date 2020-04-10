import React, { Component } from 'react';
import { FormGroup, Typography, IconButton, Dialog, DialogContent, DialogContentText, DialogActions, Button, DialogTitle } from '@material-ui/core';
import { LooksOne, LooksOneOutlined, LooksTwo, LooksTwoOutlined, Looks6Outlined, Looks3Outlined, Looks3, Looks4Outlined, Looks4, Looks5Outlined, Looks5, Looks6, Info, BackspaceOutlined, Backspace, Casino } from '@material-ui/icons';
import T from 'i18n-react';
import { Prompt } from 'react-router-dom';

interface Props {
    label: string;
    desc?: string;
    value: number;
    attribute?: boolean;
    potential?: boolean;
    onRollDice?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onClick?: (value: number) => void;
}

interface State {
    openAttribute: boolean;
}

export default class AttributeJauge extends Component<Props, State> {

    public constructor(props: Props) {
        super(props);

        this.state = {
            openAttribute: false
        }
    }

    public actionOnPrompt = (): boolean => {
        this.setState({ openAttribute: false });
        return false;
    }

    public render() {

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
                    position: 'relative',
                    borderBottom: this.props.attribute ? 'none' : '1px solid rgba(0,0,0,0.16)',
                    marginBottom: this.props.attribute ? '' : '8px'
                }}
            >
                {this.props.attribute && <IconButton
                    size='small'
                    style={{ position: 'absolute', right: '-10px', top: '-10px', padding: '1px', background: 'white', color: '#444' }}
                    onClick={this.showAttributeDesc}
                >
                    <Info />
                </IconButton>}
                <Typography
                    variant="body1"
                    component="span"
                    style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}
                >
                    {this.props.label}
                </Typography>
                <div style={{
                    paddingRight: this.props.attribute ? '20px' : '',
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                }}>
                    {this.props.value === 0 ? <Backspace style={{ marginRight: '3px' }} onClick={(evt) => this.handleClick(evt, 0)} /> : <BackspaceOutlined style={{ marginRight: '3px' }} onClick={(evt) => this.handleClick(evt, 0)} />}
                    {this.props.value > 0 ? <LooksOne onClick={(evt) => this.handleClick(evt, 1)} /> : <LooksOneOutlined onClick={(evt) => this.handleClick(evt, 1)} />}
                    {this.props.value >= 2 ? <LooksTwo onClick={(evt) => this.handleClick(evt, 2)} /> : <LooksTwoOutlined onClick={(evt) => this.handleClick(evt, 2)} />}
                    {this.props.value >= 3 ? <Looks3 onClick={(evt) => this.handleClick(evt, 3)} /> : <Looks3Outlined onClick={(evt) => this.handleClick(evt, 3)} />}
                    {!this.props.potential &&
                        <React.Fragment>
                            {this.props.value >= 4 ? <Looks4 onClick={(evt) => this.handleClick(evt, 4)} /> : <Looks4Outlined onClick={(evt) => this.handleClick(evt, 4)} />}
                            {this.props.value >= 5 ? <Looks5 onClick={(evt) => this.handleClick(evt, 5)} /> : <Looks5Outlined onClick={(evt) => this.handleClick(evt, 5)} />}
                            {this.props.value === 6 ? <Looks6 onClick={(evt) => this.handleClick(evt, 6)} /> : <Looks6Outlined onClick={(evt) => this.handleClick(evt, 6)} />}
                            {!this.props.attribute && <React.Fragment>
                                <hr style={{ margin: '0 3px 0 6px', border: 'none', borderLeft: '1px solid rgba(0,0,0,0.16)', height: '24px' }} />
                                <IconButton onClick={this.props.onRollDice} size='small' color='secondary'>
                                    <Casino />
                                </IconButton>
                            </React.Fragment>}
                        </React.Fragment>
                    }
                </div>
                {this.props.attribute && <Dialog
                    open={this.state.openAttribute}
                    onClose={this.handleClose}
                    aria-labelledby="attribute-dialog"
                >
                    <Prompt when={true} message={this.actionOnPrompt} />
                    <DialogContent>
                        <DialogTitle>{this.props.label}</DialogTitle>
                        <DialogContentText>
                            {this.props.desc}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">{T.translate('generic.close')}</Button>
                    </DialogActions>
                </Dialog>}
            </FormGroup>
        )
    }

    public handleClose = (event: React.MouseEvent<any>) => {
        event.stopPropagation();
        this.setState({ openAttribute: false });
    }

    public showAttributeDesc = (event: React.MouseEvent<any>) => {
        event.stopPropagation();
        this.setState({ openAttribute: true });
    }


    public handleClick(event: React.MouseEvent<any>, value: number) {
        event.stopPropagation();
        if (this.props.onClick) this.props.onClick(value);
    }
}
