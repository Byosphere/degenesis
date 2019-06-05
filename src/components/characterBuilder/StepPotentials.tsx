import React, { Component } from 'react'
import Character from '../../models/Character';
import T from 'i18n-react';
import { List, ListSubheader, ListItem, ListItemIcon, Checkbox, ListItemText } from '@material-ui/core';
import { POTENTIALS, GENERIC_POTENTIALS } from '../../constants';

interface Props {
    newCharacter: Character;
    onToggle: (id: number, type: number) => void;
    buttons: JSX.Element;
}

export default class StepPotentials extends Component<Props, {}> {
    public render() {

        const { newCharacter, onToggle, buttons } = this.props;

        return (
            <React.Fragment>
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
                                    checked={Boolean(newCharacter.potentials.find(p => p.id === key && p.type === 1))}
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
                                    checked={Boolean(newCharacter.potentials.find(p => p.id === key && p.type === 0))}
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
            </React.Fragment>
        );
    }
}
