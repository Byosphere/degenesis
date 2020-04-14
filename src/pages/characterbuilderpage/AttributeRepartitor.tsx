import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { LooksOne, LooksTwo, Looks3, Looks4, Looks5, Looks6, LooksOneOutlined, LooksTwoOutlined, Looks3Outlined, Looks4Outlined, Looks5Outlined, Looks6Outlined, Backspace, BackspaceOutlined } from '@material-ui/icons';
import T from 'i18n-react';
import { SKILLS, ATTRIBUTES } from '../../constants';
import { useStyles } from './styles';

interface Props {
    attributeId: number;
    skillId?: number;
    value: number;
    bonusMax: number;
    onChange: (attributeId: number, skillId: number, value: number) => void;
    disabled?: boolean;
}

export default function AttributeRepartitor(props: Props) {

    const { attributeId, value, bonusMax, skillId, disabled } = props;
    const isSkill = !isNaN(skillId);
    const valueMax = (isSkill ? 2 : 3) + bonusMax;
    const classes = useStyles();


    function handleChange(index: number) {
        if (!disabled) {
            if (isNaN(skillId) && index >= 1) {
                props.onChange(attributeId, skillId, index);
            } else if (!isNaN(skillId)) {
                props.onChange(attributeId, skillId, index);
            }
        }
    }

    function getIconFromNumber(index: number, currentValue: number, valueMax: number): React.ReactNode {
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
                return selected ? <Looks3 color={isNaN(this.props.skillId) ? 'inherit' : 'secondary'} /> :
                    <Looks3Outlined color={isNaN(this.props.skillId) ? 'inherit' : 'secondary'} />;
            case 4:
                return selected ? <Looks4 color='secondary' /> : <Looks4Outlined color='secondary' />;
            case 5:
                return selected ? <Looks5 color='secondary' /> : <Looks5Outlined color='secondary' />;
            case 6:
                return selected ? <Looks6 color='secondary' /> : <Looks6Outlined color='secondary' />;
        }
    }

    return (
        <ListItem dense disabled={disabled}>
            <ListItemText
                primary={
                    <span className={classes.attributeRepartitor}>
                        <span>
                            {isSkill && T.translate('skills.' + SKILLS[attributeId][skillId])}
                            {!isSkill && T.translate('attributes.' + ATTRIBUTES[attributeId] + '.name')}
                        </span>
                        <div>
                            {[0, 1, 2, 3, 4, 5, 6].map((index: number) => (
                                <span key={index} onClick={() => handleChange(index)}>
                                    {getIconFromNumber(index, value, valueMax)}
                                </span>
                            ))}
                        </div>
                    </span>
                }
            />
        </ListItem>
    );
}
