import React from 'react'
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import { CULTES, CULTURES, CONCEPTS } from '../../constants';
import T from 'i18n-react';
import { Character } from '../../models/Character';
import { useStyles } from './styles';

interface Props {
    char: Character;
    onSelectCharacter: (charId: string) => void;
}

export default function CharacterItem(props: Props) {

    const { char } = props;
    const classes = useStyles({ char });

    return (
        <ListItem button className={classes.characterItem} onClick={() => props.onSelectCharacter(char._id)}>
            <ListItemAvatar>
                <Avatar alt={char.name} src={"images/cultures/" + CULTURES[char.culture].img} />
            </ListItemAvatar>
            <ListItemText
                className={classes.listText}
                primary={char.name}
                secondary={
                    T.translate('cultes.' + CULTES[char.culte].name) + ' - ' +
                    T.translate('cultures.' + CULTURES[char.culture].name) + ' - ' +
                    T.translate('concepts.' + CONCEPTS[char.concept].name)
                }
            />
        </ListItem>
    );
}
