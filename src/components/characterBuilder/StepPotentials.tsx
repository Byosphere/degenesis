import React from 'react'
import T from 'i18n-react';
import { List, ListSubheader, ListItem, ListItemIcon, Checkbox, ListItemText, Typography } from '@material-ui/core';
import { POTENTIALS, GENERIC_POTENTIALS } from '../../constants';
import { Character } from '../../models/Character';

interface Props {
    newCharacter: Character;
    onToggle: (id: number, type: number) => void;
    buttons: JSX.Element;
}

export default function StepPotentials(props: Props) {

    const { newCharacter, onToggle, buttons } = props;

    return (
        <>
            <Typography style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '10px' }} component='p'>
                {T.translate('create.potentialsdesc', { num: Math.abs(newCharacter.potentials.length - 2) })}
            </Typography>
            <List
                dense
                component="div"
                role="list"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        {T.translate('generic.potential1')}
                    </ListSubheader>
                }
            >
                {POTENTIALS[newCharacter.culte].map((potential: string, key: number) => (
                    < ListItem
                        key={'c' + key}
                        role="listitem"
                        button
                        onClick={() => onToggle(key, 1)}
                    >
                        <ListItemIcon>
                            <Checkbox
                                disableRipple
                                tabIndex={-1}
                                checked={Boolean(newCharacter.potentials.find(p => p.id === key && p.group === 1))}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary={T.translate('potentials.' + potential + '.name')}
                            secondary={T.translate('potentials.' + potential + '.desc')}
                        />
                    </ListItem>
                ))}
            </List>
            <List
                dense
                component="div"
                role="list"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        {T.translate('generic.potential0')}
                    </ListSubheader>
                } >
                {POTENTIALS[GENERIC_POTENTIALS].map((potential: string, key: number) => (
                    < ListItem
                        key={'g' + key}
                        role="listitem"
                        button
                        onClick={() => onToggle(key, 0)}
                    >
                        <ListItemIcon>
                            <Checkbox
                                disableRipple
                                tabIndex={-1}
                                checked={Boolean(newCharacter.potentials.find(p => p.id === key && p.group === 0))}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary={T.translate('potentials.' + potential + '.name')}
                            secondary={T.translate('potentials.' + potential + '.desc')}
                        />
                    </ListItem>
                ))}
            </List>
            {buttons}
        </>
    );
}
