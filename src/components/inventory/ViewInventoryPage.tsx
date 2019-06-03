import React, { Component } from 'react'
import Character, { Item } from '../../models/Character';
import { Card, IconButton, CardContent, List, ListSubheader, ListItem, ListItemText, ListItemSecondaryAction, Divider, Collapse, CardHeader, Avatar, Chip } from '@material-ui/core';
import T from 'i18n-react';
import { ExpandMore, ExpandLess, Shop, Money } from '@material-ui/icons';

interface Props {
    char: Character;
}

interface State {
    open: boolean[];
}

export default class ViewInventoryPage extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            open: []
        };
    }

    public handleExpand(key: number): void {
        let open = this.state.open;
        open[key] = !this.state.open[key];
        this.setState({
            open
        });
    }

    public useItem = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, item: Item) => {
        event.stopPropagation();
        event.preventDefault();
    }

    public handleEdit = (event: any) => {

    }

    public render() {

        const { char } = this.props;
        const weapons = char.inventory.filter(item => item.type === 0);
        const armors = char.inventory.filter(item => item.type === 1);
        const equipment = char.inventory.filter(item => item.type === 2);
        const items = char.inventory.filter(item => item.type === 3);
        let totalWeight = 0;
        char.inventory.forEach((item: Item) => {
            totalWeight += item.weight;
        });

        return (
            <div style={{ margin: '5px' }}>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar>
                                <Shop />
                            </Avatar>
                        }
                        title={T.translate('generic.bagof') + ' ' + char.name}
                        subheader={T.translate('generic.totalweight') + ' : ' + totalWeight + 'g'}
                        action={
                            <Chip
                                label={
                                    <span>
                                        {char.money + ' '}<i style={{ opacity: 0.6 }}> {T.translate('generic.money')}</i>
                                    </span>}
                                variant="outlined"
                                icon={<Money style={{ marginRight: '0' }} />}
                            />
                        }
                    />
                </Card>
                <Card style={{ marginTop: '5px' }}>
                    <CardContent>
                        <List subheader={<ListSubheader>{T.translate('generic.weapons')}</ListSubheader>} >
                            {!weapons.length && <this.Empty />}
                            {weapons.map((item, key) => this.renderItem(0, item, key))}
                        </List>
                        <Divider />
                        <List subheader={<ListSubheader>{T.translate('generic.armors')}</ListSubheader>} >
                            {!armors.length && <this.Empty />}
                            {armors.map((item, key) => this.renderItem(1, item, key))}
                        </List>
                        <Divider />
                        <List subheader={<ListSubheader>{T.translate('generic.equipment')}</ListSubheader>} >
                            {!equipment.length && <this.Empty />}
                            {equipment.map((item, key) => this.renderItem(2, item, key))}
                        </List>
                        <Divider />
                        <List subheader={<ListSubheader>{T.translate('generic.items')}</ListSubheader>} >
                            {!items.length && <this.Empty />}
                            {items.map((item, key) => this.renderItem(3, item, key))}
                        </List>
                    </CardContent>
                </Card>
            </div>
        );
    }

    private Empty = () => (
        <span style={{
            width: '100%',
            textAlign: 'center',
            display: 'block',
            opacity: 0.5,
            marginBottom: '16px'
        }}>{T.translate('generic.empty')}</span>
    );

    private renderItem(type: number, item: Item, key: number): JSX.Element {

        const itemDetails = T.translate('generic.weight') + ' : '
            + item.weight + T.translate('generic.weightunit') + ' | ' +
            T.translate('generic.techname') + ' ' + T.translate('generic.tech.' + item.tech);

        const itemKey = type * 10000 + key;
        let degatsText = '';
        let defenseText = '';
        let titleText = '';
        if (item.degats) {
            const force = this.props.char.attributes[0].skills[2].value;
            // eslint-disable-next-line
            const degats = Math.ceil(eval(item.degats.replace('F', force.toString())));
            degatsText = T.translate('generic.attack') + ' : ' + degats + ' ' + T.translate('generic.dices') + ' (' + item.degats + ')';

        } else if (item.defense) {
            defenseText = T.translate('generic.defense') + ' : ' + item.defense + ' ' + T.translate('generic.dices');
        } else if (item.title) {
            titleText = item.title;
        }

        return (
            <React.Fragment key={itemKey}>
                <ListItem button onClick={(event) => this.useItem(event, item)}>
                    <ListItemText primary={item.name} secondary={itemDetails} />
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => this.handleExpand(itemKey)}>
                            {this.state.open[itemKey] ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Collapse in={this.state.open[itemKey]} unmountOnExit>
                    <ListItem>
                        <ListItemText
                            style={{ margin: '0px 16px 6px 16px' }}
                            primary={
                                degatsText || defenseText || titleText
                            }
                            secondary={item.desc}
                        />
                    </ListItem>
                </Collapse>
            </React.Fragment>
        );
    }

}
