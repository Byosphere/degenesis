import React, { Component } from 'react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText } from '@material-ui/core';
import { ExpandMore, LooksTwo, LooksOne, Looks3, Looks4, Looks5, Looks6 } from '@material-ui/icons';
import AttributeJauge from '../attributeJauge/AttributeJauge';
import { ATTRIBUTES, SKILLS } from '../../constants';
import { Skill, Attribute } from '../../models/Character';
import T from 'i18n-react';

interface Props {
    attribute: Attribute;
    onChange: (attribute: Attribute) => void;
}

interface State {
    expanded: boolean;
    rollOpen: boolean;
    rollResult: number[];
    rollInProgress: boolean;
    selectedSkill: Skill;
}

export default class AttributePanel extends Component<Props, State> {

    public constructor(props: Props) {
        super(props);

        this.state = {
            expanded: false,
            rollOpen: false,
            rollResult: [],
            rollInProgress: false,
            selectedSkill: null
        }
    }

    public handleChange = (value: number, skillId?: number) => {
        if (skillId !== undefined) {
            this.props.attribute.skills[skillId].value = value;
        } else {
            this.props.attribute.base = value;
        }
        this.props.onChange(this.props.attribute);
    }

    public onExpandChange = (event: React.ChangeEvent<{}>, expanded: boolean) => {
        this.setState({ expanded: !this.state.expanded });
    }

    public render() {
        return (
            <React.Fragment>
                <ExpansionPanel expanded={this.state.expanded} onChange={this.onExpandChange} style={{ marginBottom: '5px' }}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                    >
                        <AttributeJauge
                            label={T.translate('attributes.' + ATTRIBUTES[this.props.attribute.id] + '.name') as string}
                            desc={T.translate('attributes.' + ATTRIBUTES[this.props.attribute.id] + '.desc') as string}
                            value={this.props.attribute.base}
                            attribute
                            onClick={(value) => this.handleChange(value)}
                        />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
                        {this.props.attribute.skills.map((skill: Skill) => (
                            <AttributeJauge
                                key={skill.id}
                                label={T.translate('skills.' + SKILLS[this.props.attribute.id][skill.id]) as string}
                                value={skill.value}
                                onClick={(value) => this.handleChange(value, skill.id)}
                                onRollDice={(event) => this.openRollModal(event, skill)}
                            />
                        ))}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <Dialog
                    open={this.state.rollOpen}
                    onClose={this.handleClose}
                >
                    <DialogTitle>{T.translate('generic.diceroll')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {T.translate('generic.rolldicequestion', {
                                attribute: T.translate('attributes.' + ATTRIBUTES[this.props.attribute.id] + '.name'),
                                anum: this.props.attribute.base,
                                skill: this.state.selectedSkill ? T.translate('skills.' + SKILLS[this.props.attribute.id][this.state.selectedSkill.id]) : '',
                                snum: this.state.selectedSkill ? this.state.selectedSkill.value : 0
                            })}
                            <p>
                                {this.state.rollResult.map((nb: number, index: number) => {
                                    switch (nb) {
                                        case 1:
                                            return (<LooksOne key={index} fontSize='large' />);
                                        case 2:
                                            return (<LooksTwo key={index} fontSize='large' />);
                                        case 3:
                                            return (<Looks3 key={index} fontSize='large' />);
                                        case 4:
                                            return (<Looks4 key={index} fontSize='large' />);
                                        case 5:
                                            return (<Looks5 key={index} fontSize='large' />);
                                        case 6:
                                            return (<Looks6 key={index} fontSize='large' />);
                                        default:
                                            return null;
                                    }
                                })}
                            </p>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={this.state.rollInProgress} onClick={this.handleClose}>
                            {T.translate('generic.cancel')}
                        </Button>
                        <Button disabled={this.state.rollInProgress} onClick={this.roll} color="secondary" autoFocus>
                            {T.translate('generic.roll')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }

    public roll = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState({ rollInProgress: true });
        const diceNumber = this.props.attribute.base + this.state.selectedSkill.value;
        let rollResult = [];
        let cpt = 0;
        let interval = setInterval(() => {
            if (cpt === diceNumber) {
                clearInterval(interval);
                this.setState({ rollInProgress: false });
            } else {
                cpt++;
                rollResult.push(Math.floor(Math.random() * 6) + 1);
                this.setState({ rollResult });
            }
        }, 1000);
    }

    public handleClose = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        if (!this.state.rollInProgress) this.setState({ rollOpen: false, rollResult: [] });
    }

    public openRollModal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, selectedSkill: Skill) => {
        this.setState({
            selectedSkill,
            rollOpen: true
        });
    }
}