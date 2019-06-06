import React, { Component } from 'react'
import { ListItem, ListItemText } from '@material-ui/core';
import { LooksOne, LooksTwo, Looks3, Looks4, Looks5, Looks6, LooksOneOutlined, LooksTwoOutlined, Looks3Outlined, Looks4Outlined, Looks5Outlined, Looks6Outlined, Backspace, BackspaceOutlined } from '@material-ui/icons';
import T from 'i18n-react';
import { SKILLS, ATTRIBUTES } from '../../constants';

interface Props {
    attributeId: number;
    skillId?: number;
    value: number;
    bonusMax: number;
    onChange: (attributeId: number, skillId: number, value: number) => void;
    disabled?: boolean;
}

export default class AttributeRepartitor extends Component<Props, {}> {

    public handleChange = (value: number) => {
        if (!this.props.disabled)
            this.props.onChange(this.props.attributeId, this.props.skillId, value);
    }

    public render() {

        const { attributeId, value, bonusMax, skillId, onChange, disabled } = this.props;
        const isSkill = !isNaN(skillId);
        const valueMax = 2 + bonusMax;

        return (
            <ListItem dense disabled={disabled}>
                <ListItemText
                    primary={
                        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>
                                {isSkill && T.translate('skills.' + SKILLS[attributeId][skillId])}
                                {!isSkill && T.translate('attributes.' + ATTRIBUTES[attributeId] + '.name')}
                            </span>
                            <div>
                                {[0, 1, 2, 3, 4, 5, 6].map((index: number) => (
                                    <span key={index} onClick={() => this.handleChange(index)}>
                                        {this.getIconFromNumber(index, value, valueMax)}
                                    </span>
                                ))}
                            </div>
                        </span>
                    }
                />
            </ListItem>
        );

    }

    private getIconFromNumber(index: number, currentValue: number, valueMax: number): JSX.Element {
        if (index > valueMax) return null;
        const selected = currentValue >= index;
        switch (index) {
            case 0:
                return currentValue === 0 ? <Backspace /> : <BackspaceOutlined />;
            case 1:
                return selected ? <LooksOne /> : <LooksOneOutlined />;
            case 2:
                return selected ? <LooksTwo /> : <LooksTwoOutlined />;
            case 3:
                return selected ? <Looks3 color='secondary' /> : <Looks3Outlined color='secondary' />;
            case 4:
                return selected ? <Looks4 color='secondary' /> : <Looks4Outlined color='secondary' />;
            case 5:
                return selected ? <Looks5 color='secondary' /> : <Looks5Outlined color='secondary' />;
            case 6:
                return selected ? <Looks6 color='secondary' /> : <Looks6Outlined color='secondary' />;
        }
    }
}
