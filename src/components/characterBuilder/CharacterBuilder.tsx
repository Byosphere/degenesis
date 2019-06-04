import React, { Component } from 'react'
import { Card, Stepper, Step, StepLabel, StepContent, Typography, TextField, FormControl, InputLabel, Select, Input, MenuItem, InputAdornment, Button, Grid, CardMedia, CardContent, List, ListItem, ListItemIcon, Checkbox, ListItemText, ListSubheader } from '@material-ui/core';
import Character from '../../models/Character';
import { Redirect } from 'react-router-dom';
import T from 'i18n-react';
import { CULTURES, CULTES, CONCEPTS, SEX, POTENTIALS, GENERIC_POTENTIALS, MONEY } from '../../constants';
import { Money, DonutSmall } from '@material-ui/icons';

interface Props {
    characters: Character[];
    selectedCharacter: Character;
    createCharacter: (char: Character) => void;
}

interface State {
    activeStep: number;
    newCharacter: any;
}

export default class CharacterBuilder extends Component<Props, State> {

    public constructor(props: Props) {
        super(props);

        this.state = {
            activeStep: 2,
            newCharacter: {
                potentials: [],
                attributes: [],
                notes: []
            },
        };
    }

    public handleChange = (event: any) => {
        let newCharacter: any = this.state.newCharacter;
        newCharacter[event.target.name] = event.target.value;
        this.setState({ newCharacter });
    }

    public handleNext = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({ activeStep: this.state.activeStep + 1 });
    }

    public handlePrev = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({ activeStep: this.state.activeStep - 1 });
    }

    public handleCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
        let character = this.state.newCharacter;
        character.money = MONEY[character.culte] * 2;
        character.ego = { id: "ego", actuel: 0, total: 0 };
        character.sporulation = { id: "sporulation", actuel: 0, total: 0 };
        character.blessures = { id: "blessures", actuel: 0, total: 0 };
        character.trauma = { id: "trauma", actuel: 0, total: 0 };
    }

    public handleAttributeChange = (attributeId: number, skillId: number, value: number) => {

    }

    public handleToggle = (id: number, type: number) => {
        let newCharacter: any = this.state.newCharacter;
        let index = newCharacter.potentials.findIndex(p => p.id === id && p.type === type);
        if (index === -1 && newCharacter.potentials.length !== 2) {
            newCharacter.potentials.push({
                id,
                type,
                level: 1
            });
        } else if (index !== -1) {
            newCharacter.potentials.splice(index, 1);
        }
        this.setState({ newCharacter });
    }

    public render() {

        if (this.props.selectedCharacter) return <Redirect to='/stats' />
        const { activeStep, newCharacter } = this.state;

        return (
            <div style={{ margin: '5px', flex: 1 }}>
                <Typography variant='subtitle1' component='p' className="card-overtitle">
                    {T.translate('generic.charactercreate')}
                </Typography>
                <Card style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: 'auto', minHeight: 'calc(100% - 46px)' }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        <Step>
                            <StepLabel>{T.translate('create.who')}</StepLabel>
                            <StepContent>
                                <TextField
                                    name='name'
                                    label={T.translate('generic.name')}
                                    margin="dense"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    value={newCharacter.name || ''}
                                    onChange={this.handleChange}
                                    required
                                />
                                <div style={{ display: 'flex' }}>
                                    <TextField
                                        name='age'
                                        label={T.translate('generic.age')}
                                        margin="dense"
                                        type='number'
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        style={{ flex: 1, marginRight: '8px' }}
                                        value={newCharacter.age || ''}
                                        onChange={this.handleChange}
                                        required
                                    />
                                    <FormControl margin='dense' style={{ flex: 1, marginLeft: '8px' }}>
                                        <InputLabel shrink htmlFor="sex">
                                            {T.translate('generic.sex')}
                                        </InputLabel>
                                        <Select
                                            input={<Input name="sex" />}
                                            value={newCharacter.sex || ''}
                                            onChange={this.handleChange}
                                            required
                                        >
                                            {SEX.map((text, key) => (
                                                <MenuItem key={key} value={key}>
                                                    {text ? T.translate('sex.' + text) : T.translate('generic.none')}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <TextField
                                        name='weight'
                                        label="Poids"
                                        margin="dense"
                                        type='number'
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">Kg</InputAdornment>
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        style={{ flex: 1, marginRight: '8px' }}
                                        value={newCharacter.weight || ''}
                                        onChange={this.handleChange}
                                        required

                                    />
                                    <TextField
                                        name='size'
                                        label="Taille"
                                        margin="dense"
                                        type='number'
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">cm</InputAdornment>
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        style={{ flex: 1, marginLeft: '8px' }}
                                        value={newCharacter.size || ''}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                {this.displayControls(
                                    !newCharacter.name ||
                                    !newCharacter.age ||
                                    !newCharacter.sex ||
                                    !newCharacter.weight ||
                                    !newCharacter.size,
                                    false
                                )}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>{T.translate('create.culture.title')}</StepLabel>
                            <StepContent>
                                <FormControl fullWidth margin='dense'>
                                    <InputLabel shrink htmlFor="culture">
                                        {T.translate('generic.culture')}
                                    </InputLabel>
                                    <Select
                                        input={<Input name="culture" fullWidth />}
                                        fullWidth
                                        value={newCharacter.culture || ''}
                                        onChange={this.handleChange}
                                    >
                                        {CULTURES.map((text, key) => (
                                            <MenuItem key={key} value={key}>
                                                {text ? T.translate('cultures.' + text) : T.translate('generic.none')}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {newCharacter.culture && <div style={{ margin: '16px 0' }}>
                                    <Grid container spacing={2} alignItems='center'>
                                        <Grid item xs={6}>
                                            <Typography variant="overline">
                                                {T.translate('cultures.' + CULTURES[newCharacter.culture])}
                                            </Typography>
                                            <Typography variant="body2">
                                                {T.translate('create.culture.' + CULTURES[newCharacter.culture])}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CardMedia
                                                image={"/images/cultures/" + CULTURES[newCharacter.culture] + ".jpg"}
                                                title={CULTURES[newCharacter.culture]}
                                                style={{ height: '100px' }}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>}
                                {this.displayControls(!newCharacter.culture, true)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>{T.translate('create.culte.title')}</StepLabel>
                            <StepContent>
                                <FormControl fullWidth margin='dense'>
                                    <InputLabel shrink htmlFor="culte">
                                        {T.translate('generic.culte')}
                                    </InputLabel>
                                    <Select
                                        input={<Input name="culte" fullWidth />}
                                        fullWidth
                                        value={newCharacter.culte || ''}
                                        onChange={this.handleChange}
                                    >
                                        {CULTES.map((text, key) => (
                                            <MenuItem key={key} value={key}>
                                                {text ? T.translate('cultes.' + text) : T.translate('generic.none')}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {newCharacter.culte && <div style={{ margin: '16px 0' }}>
                                    <CardMedia
                                        image={"/images/cultes/" + CULTES[newCharacter.culte] + ".jpg"}
                                        title={CULTES[newCharacter.culte]}
                                        style={{ height: '100px' }}
                                    />
                                    <CardContent>
                                        <Typography variant='body2' style={{ display: 'flex', alignItems: 'center', fontStyle: 'italic' }}>
                                            <DonutSmall fontSize='small' style={{ marginRight: '5px' }} />
                                            {T.translate('generic.money', { money: MONEY[newCharacter.culte] * 2 })}
                                        </Typography>
                                        <Typography variant="body2">
                                            {T.translate('create.culte.' + CULTES[newCharacter.culte])}
                                        </Typography>
                                    </CardContent>
                                </div>}
                                {this.displayControls(!newCharacter.culte, true)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>{T.translate('create.concept.title')}</StepLabel>
                            <StepContent>
                                <FormControl fullWidth margin='dense'>
                                    <InputLabel shrink htmlFor="concept">
                                        {T.translate('generic.concept')}
                                    </InputLabel>
                                    <Select
                                        input={<Input name="concept" fullWidth />}
                                        fullWidth
                                        value={newCharacter.concept || ''}
                                        onChange={this.handleChange}
                                    >
                                        {CONCEPTS.map((text, key) => (
                                            <MenuItem key={key} value={key}>
                                                {text ? T.translate('concepts.' + text) : T.translate('generic.none')}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {newCharacter.concept && <CardContent>
                                    <Typography variant="body2">
                                        {T.translate('create.concept.' + CONCEPTS[newCharacter.concept])}
                                    </Typography>
                                </CardContent>}
                                {this.displayControls(!newCharacter.concept, true)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>{T.translate('create.attributes')}</StepLabel>
                            <StepContent>
                                {this.displayControls(false, true)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>{T.translate('create.potentials')}</StepLabel>
                            {newCharacter.culte && <StepContent>
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
                                            onClick={() => this.handleToggle(key, 1)}
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
                                            onClick={() => this.handleToggle(key, 0)}
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
                                {this.displayControls(!newCharacter.potentials || newCharacter.potentials.length !== 2, true)}
                            </StepContent>}
                        </Step>
                        <Step>
                            <StepLabel>{T.translate('create.lasttouch')}</StepLabel>
                            <StepContent>
                                <TextField
                                    name="story"
                                    label={T.translate('generic.story')}
                                    margin="dense"
                                    type='text'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    multiline
                                    fullWidth
                                    rows={15}
                                    rowsMax={30}
                                    value={newCharacter.story}
                                    onChange={this.handleChange}
                                />
                                {this.displayControls(false, true, true)}
                            </StepContent>
                        </Step>
                    </Stepper>
                </Card>
            </div>
        );
    }

    private displayControls(disableNext: boolean, enablePrev: boolean, isLast?: boolean): JSX.Element {
        return (
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                {enablePrev && <Button
                    style={{ marginTop: '16px' }}
                    color='primary'
                    onClick={this.handlePrev}
                >
                    {T.translate('generic.prev')}
                </Button>}
                <Button
                    style={{ marginTop: '16px' }}
                    variant='contained'
                    color='secondary'
                    onClick={isLast ? this.handleCreate : this.handleNext}
                    disabled={disableNext}
                >
                    {isLast ? T.translate('generic.create') : T.translate('generic.next')}
                </Button>
            </div>
        );
    }
}
