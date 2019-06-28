import React, { Component } from 'react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
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
}

export default class AttributePanel extends Component<Props, State> {

    public constructor(props: Props) {
        super(props);

        this.state = {
            expanded: false
        }
    }

    public handleChange = (value: number, skillId?: number) => {
        if (skillId) {
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
            <ExpansionPanel expanded={this.state.expanded} onChange={this.onExpandChange} style={{ marginBottom: '5px' }}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}
                >
                    <AttributeJauge
                        label={T.translate('attributes.' + ATTRIBUTES[this.props.attribute.id] + '.name') as string}
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
                        />
                    ))}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}