import React, { Component } from 'react'
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import { CULTES, CULTURES, CONCEPTS } from '../../constants';
import Character from '../../models/Character';
import T from 'i18n-react';

interface Props {
    char: Character;
    onSelectCharacter: (charId: string) => void;
}

export default class CharacterItem extends Component<Props, {}> {

    public render() {

        const { char } = this.props;

        return (
            <ListItem
                button
                style={{
                    backgroundImage: 'url(images/cultes/' + CULTES[char.culte].img + ')',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '160px center',
                    margin: '5px 0'
                }}
                onClick={() => this.props.onSelectCharacter(char._id)}
            >
                <ListItemAvatar>
                    <Avatar alt={char.name} src={"images/cultures/" + CULTURES[char.culture].img} />
                </ListItemAvatar>
                <ListItemText
                    style={{ background: 'rgba(255, 255, 255, 0.3)', marginRight: '50px' }}
                    primary={char.name}
                    secondary={
                        T.translate('cultes.' + CULTES[char.culte].name) + ' - ' +
                        T.translate('cultures.' + CULTURES[char.culture].name) + ' - ' +
                        T.translate('concepts.' + CONCEPTS[char.concept].name)
                    }
                />
            </ListItem>
        )
    }
}
