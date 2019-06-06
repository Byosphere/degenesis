import React, { Component } from 'react'
import { Card, CardMedia, CardContent, ListItemIcon, List, ListItem, ListItemText, ListSubheader, Divider, ListItemAvatar, Avatar } from '@material-ui/core';
import Character from '../../models/Character';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Add } from '@material-ui/icons';
import T from 'i18n-react';
import { CULTURES, CULTES, CONCEPTS } from '../../constants';

interface ownProps {
    characters: Character[];
    selectedCharacter: Character;
    onChangeChar: (char: Character, save: boolean) => void;
}

interface State { }

type Props = ownProps & RouteComponentProps;

export default class Home extends Component<Props, State> {

    public selectCharacter(char: Character): void {
        this.props.onChangeChar(char, false);
    }

    public handleCreate = () => {
        this.props.history.push('/create');
    }

    public render() {

        if (this.props.selectedCharacter) return <Redirect to='/stats' />

        return (
            <Card style={{ flex: 1, margin: '5px', display: "flex", flexDirection: "column" }}>
                <CardMedia
                    image="/images/logo.png"
                    title="Paella dish"
                    style={{ height: '200px' }}
                />
                <CardContent style={{ flex: 1, height: 'calc(100% - 300px)' }} >
                    <List
                        component="nav"
                        disablePadding
                        subheader={
                            <ListSubheader style={{ background: 'white' }} component="div">
                                {T.translate('generic.heroslist')}
                            </ListSubheader>
                        }
                        style={{ height: 'calc(100% - 64px)', overflowY: 'auto' }}
                    >
                        {this.props.characters.filter(char => char !== null).map((char: Character, key: number) => (
                            <ListItem
                                key={key}
                                button
                                style={{
                                    backgroundImage: 'url(/images/cultes/' + CULTES[char.culte].name + '.jpg)',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: '160px center',
                                    margin: '5px 0'
                                }}
                                onClick={() => this.selectCharacter(char)}
                            >
                                <ListItemAvatar>
                                    <Avatar alt={char.name} src={"/images/cultures/" + CULTURES[char.culture].name + ".jpg"} />
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
                        ))}
                    </List>
                    <Divider />
                    <List component="nav">
                        <ListItem button onClick={this.handleCreate}>
                            <ListItemIcon>
                                <Add color='secondary' />
                            </ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{ color: 'secondary' }}
                                primary="Créer un nouveau personnage"
                            />
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        );
    }
}
