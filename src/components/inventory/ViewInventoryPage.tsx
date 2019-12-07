import React, { Component } from 'react'
import Character, { Item } from '../../models/Character';
import { Card, IconButton, CardContent, List, ListSubheader, ListItem, ListItemText, ListItemSecondaryAction, Divider, Collapse, CardHeader, Avatar, Typography, Button, Dialog, DialogContent, DialogContentText, DialogActions, MenuItem, Select, Input, Slide, AppBar, Toolbar, FormControl, InputLabel, TextField, Fab, Zoom, DialogTitle, FormControlLabel, Radio, RadioGroup, InputAdornment } from '@material-ui/core';
import T from 'i18n-react';
import { ExpandMore, ExpandLess, CardTravel, Close, SwapVerticalCircle, Add, DonutSmall } from '@material-ui/icons';
import { TYPES } from '../../constants';
import { TransitionProps } from '@material-ui/core/transitions/transition';

interface Props {
    char: Character;
    onChange: (char: Character, save: boolean) => void;
}

interface State {
    open: boolean[];
    modalOpen: boolean;
    newItem: Item;
    moneyModalOpen: boolean;
    addRemoveMoney: string;
    moneyValue: number;
}

export default class ViewInventoryPage extends Component<Props, State> {

    private Transition: React.ForwardRefExoticComponent<TransitionProps & React.RefAttributes<unknown>>;

    constructor(props: Props) {
        super(props);

        this.state = {
            open: [],
            modalOpen: false,
            newItem: { name: '', type: 0, desc: '', weight: 0, tech: 0 },
            moneyModalOpen: false,
            addRemoveMoney: 'add',
            moneyValue: 0
        };

        this.Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
            return <Slide direction="up" ref={ref} {...props} />;
        });
    }

    public handleExpand(key: number): void {
        let open = this.state.open;
        open[key] = !this.state.open[key];
        this.setState({
            open
        });
    }

    public showAddItemModal = (event: React.MouseEvent<any>) => {
        this.setState({ modalOpen: true });
    }

    public handleClose = (event: any) => {
        this.setState({ modalOpen: false, newItem: { name: '', type: 0, desc: '', weight: 0, tech: 0 } });
    }

    public onChange = (event: React.ChangeEvent<{ name?: string; value: unknown; }>) => {
        let newItem = this.state.newItem;
        newItem[event.target.name] = event.target.name === 'weight' ? parseInt(event.target.value as string) : event.target.value;
        this.setState({ newItem });
    }

    public handleSave = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let char = this.props.char;
        char.inventory.push(this.state.newItem);
        this.setState({
            modalOpen: false,
            newItem: { name: '', type: 0, desc: '', weight: 0, tech: 0 }
        });
        this.props.onChange(char, true);
    }

    public openMoneyModal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState({ moneyModalOpen: true });
    }

    public handleMoneyModalClose = (event: any) => {
        this.setState({ moneyModalOpen: false, moneyValue: 0, addRemoveMoney: 'add' });
    }

    public changeMoney = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let char = this.props.char;
        if (this.state.addRemoveMoney === 'add') {
            char.money += this.state.moneyValue;
        } else {
            char.money -= this.state.moneyValue;
            if (char.money < 0) char.money = 0;
        }
        this.setState({ moneyModalOpen: false, moneyValue: 0, addRemoveMoney: 'add' });
        this.props.onChange(char, true);
    }

    public render() {

        const { char } = this.props;
        const weapons = char.inventory.filter(item => item.type === 0);
        const armors = char.inventory.filter(item => item.type === 1);
        const equipment = char.inventory.filter(item => item.type === 2);
        const items = char.inventory.filter(item => item.type === 3);
        let totalWeight: number = 0;
        char.inventory.forEach((item: Item) => {
            totalWeight += item.weight;
        });

        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Typography variant='subtitle1' component='p' className="card-overtitle">
                    {T.translate('generic.bagof', { who: char.name })}
                </Typography>
                <Card style={{ height: '100%' }}>
                    <CardHeader
                        avatar={
                            <Avatar style={{ background: '#d50000' }}>
                                <CardTravel />
                            </Avatar>
                        }
                        title={T.translate('generic.money', { money: char.money })}
                        subheader={T.translate('generic.totalweight', { weight: totalWeight })}
                        action={
                            <IconButton color='primary' onClick={this.openMoneyModal}>
                                <SwapVerticalCircle />
                            </IconButton>
                        }
                    />
                    <CardContent style={{ overflow: 'auto', height: 'calc(100% - 72px)', paddingTop: 0 }}>
                        <List subheader={<ListSubheader style={{ background: 'white' }}>{T.translate('generic.weapons')}</ListSubheader>} >
                            {!weapons.length && <this.Empty />}
                            {weapons.map((item, key) => this.renderItem(0, item, key))}
                        </List>
                        <Divider />
                        <List subheader={<ListSubheader style={{ background: 'white' }}>{T.translate('generic.armors')}</ListSubheader>} >
                            {!armors.length && <this.Empty />}
                            {armors.map((item, key) => this.renderItem(1, item, key))}
                        </List>
                        <Divider />
                        <List subheader={<ListSubheader style={{ background: 'white' }}>{T.translate('generic.equipment')}</ListSubheader>} >
                            {!equipment.length && <this.Empty />}
                            {equipment.map((item, key) => this.renderItem(2, item, key))}
                        </List>
                        <Divider />
                        <List subheader={<ListSubheader style={{ background: 'white' }}>{T.translate('generic.items')}</ListSubheader>} >
                            {!items.length && <this.Empty />}
                            {items.map((item, key) => this.renderItem(3, item, key))}
                        </List>
                    </CardContent>
                </Card>
                <Zoom
                    in={true}
                    unmountOnExit
                >
                    <Fab
                        onClick={this.showAddItemModal}
                        color='secondary'
                        style={{ position: 'absolute', bottom: '70px', right: '20px', zIndex: 10 }}>
                        <Add />
                    </Fab>
                </Zoom>
                <Dialog
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    aria-labelledby="additem-dialog-title"
                    aria-describedby="additem-dialog-description"
                    fullScreen
                    TransitionComponent={this.Transition}
                >
                    <AppBar style={{}}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="Close">
                                <Close />
                            </IconButton>
                            <Typography variant="h6">
                                {T.translate('inventory.additem')}
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <DialogContent style={{ marginTop: '56px' }}>
                        <DialogContentText>{T.translate('inventory.additemdesc')}</DialogContentText>
                        <TextField
                            name="name"
                            label={T.translate('inventory.name')}
                            value={this.state.newItem.name}
                            onChange={this.onChange}
                            margin="normal"
                            fullWidth
                        />
                        <FormControl fullWidth margin='normal'>
                            <InputLabel htmlFor="type">{T.translate('inventory.type')}</InputLabel>
                            <Select
                                input={<Input name="type" fullWidth />}
                                fullWidth
                                value={this.state.newItem.type}
                                onChange={this.onChange}
                            >
                                {TYPES.map((type: string, key) => (
                                    <MenuItem key={key} value={key}>
                                        {T.translate('inventory.' + type)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            name="weight"
                            label={T.translate('inventory.weight')}
                            value={this.state.newItem.weight}
                            onChange={this.onChange}
                            type='number'
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            name="desc"
                            label={T.translate('inventory.desc')}
                            value={this.state.newItem.desc}
                            onChange={this.onChange}
                            margin="normal"
                            fullWidth
                            multiline
                            rows={10}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color='primary' onClick={this.handleClose}>{T.translate('generic.cancel')}</Button>
                        <Button color='secondary' disabled={this.verifyItem()} onClick={this.handleSave}>{T.translate('generic.add')}</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.moneyModalOpen}
                    onClose={this.handleMoneyModalClose}
                    aria-labelledby="money-dialog-title"
                    aria-describedby="money-dialog-description"
                >
                    <DialogTitle id="form-dialog-title">Gestion de l'argent</DialogTitle>
                    <DialogContent>
                        <RadioGroup
                            aria-label="add_remove"
                            value={this.state.addRemoveMoney}
                            onChange={(event, value) => this.setState({ addRemoveMoney: value })}
                            name="add_remove"
                            row
                        >
                            <FormControlLabel
                                value="add"
                                control={<Radio color="primary" />}
                                label="Ajouter"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="remove"
                                control={<Radio color="primary" />}
                                label="Retirer"
                                labelPlacement="start"
                            />
                        </RadioGroup>
                        <TextField
                            id="money-number"
                            label="Valeur"
                            value={this.state.moneyValue}
                            onChange={(event) => this.setState({ moneyValue: parseInt(event.target.value, 10) || 0 })}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin='normal'
                            inputProps={{
                                min: '0'
                            }}
                            // eslint-disable-next-line
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <DonutSmall fontSize='small' />
                                </InputAdornment>,
                                endAdornment: <InputAdornment position="end">L.d.C</InputAdornment>
                            }}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleMoneyModalClose} color="primary">
                            {T.translate('generic.cancel')}
                        </Button>
                        <Button onClick={this.changeMoney} color="secondary">
                            {T.translate('generic.validate')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
    private verifyItem(): boolean {
        let item = this.state.newItem;
        if (!item.name || !item.desc || !item.weight) return true;
        return false;
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
                <ListItem>
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
