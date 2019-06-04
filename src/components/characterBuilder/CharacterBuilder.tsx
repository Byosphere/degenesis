import React, { Component } from 'react'
import { Card, Stepper, Step, StepLabel, StepContent, Typography, TextField, FormControl, InputLabel, Select, Input, MenuItem, InputAdornment, Button, Grid, CardMedia, CardContent, List, ListItem, ListItemIcon, Checkbox, ListItemText, ListSubheader, Chip } from '@material-ui/core';
import Character from '../../models/Character';
import { Redirect } from 'react-router-dom';
import T from 'i18n-react';
import { CULTURES, CULTES, CONCEPTS, SEX, POTENTIALS, GENERIC_POTENTIALS, MONEY } from '../../constants';
import { DonutSmall, Done } from '@material-ui/icons';
import { Culture, Culte, Concept } from '../../models/Data';

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
            activeStep: 0,
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
                            {this.displayLabel(T.translate('create.who').toString(), newCharacter.name, 0)}
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
                            {this.displayLabel(
                                T.translate('create.culture.title').toString(),
                                (typeof newCharacter.culture === 'number') ?
                                    T.translate('cultures.' + CULTURES[newCharacter.culture].name).toString() : '',
                                1
                            )}
                            <StepContent>
                                <FormControl fullWidth margin='dense'>
                                    <InputLabel shrink htmlFor="culture">
                                        {T.translate('generic.culture')}
                                    </InputLabel>
                                    <Select
                                        input={<Input name="culture" fullWidth />}
                                        fullWidth
                                        value={isNaN(newCharacter.culture) ? '' : newCharacter.culture}
                                        onChange={this.handleChange}
                                    >
                                        <MenuItem value={''}>
                                            {T.translate('generic.none')}
                                        </MenuItem>
                                        {CULTURES.map((culture: Culture, key) => (
                                            <MenuItem key={key} value={key}>
                                                {T.translate('cultures.' + culture.name)}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {typeof newCharacter.culture === 'number' && <div style={{ margin: '16px 0' }}>
                                    <Grid container spacing={2} alignItems='center'>
                                        <Grid item xs={6}>
                                            <Typography variant="overline">
                                                {T.translate('cultures.' + CULTURES[newCharacter.culture].name)}
                                            </Typography>
                                            <Typography variant="body2">
                                                {T.translate('create.culture.' + CULTURES[newCharacter.culture].name)}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CardMedia
                                                image={"/images/cultures/" + CULTURES[newCharacter.culture].name + ".jpg"}
                                                title={CULTURES[newCharacter.culture].name}
                                                style={{ height: '100px' }}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>}
                                {this.displayControls(typeof newCharacter.culture !== 'number', true)}
                            </StepContent>
                        </Step>
                        <Step>
                            {this.displayLabel(
                                T.translate('create.culte.title').toString(),
                                (typeof newCharacter.culte === 'number') ?
                                    T.translate('cultes.' + CULTES[newCharacter.culte].name).toString() : '',
                                2
                            )}
                            <StepContent>
                                <FormControl fullWidth margin='dense'>
                                    <InputLabel shrink htmlFor="culte">
                                        {T.translate('generic.culte')}
                                    </InputLabel>
                                    <Select
                                        input={<Input name="culte" fullWidth />}
                                        fullWidth
                                        value={isNaN(newCharacter.culte) ? '' : newCharacter.culte}
                                        onChange={this.handleChange}
                                    >
                                        <MenuItem value={''}>
                                            {T.translate('generic.none')}
                                        </MenuItem>
                                        {CULTES.map((culte: Culte, key: number) => (
                                            <MenuItem key={key} value={key}>
                                                {T.translate('cultes.' + culte.name)}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {typeof newCharacter.culte === 'number' && <div style={{ margin: '16px 0' }}>
                                    <CardMedia
                                        image={"/images/cultes/" + CULTES[newCharacter.culte].name + ".jpg"}
                                        title={CULTES[newCharacter.culte].name}
                                        style={{ height: '100px' }}
                                    />
                                    <CardContent>
                                        <Typography variant='body2' style={{ display: 'flex', alignItems: 'center', fontStyle: 'italic' }}>
                                            <DonutSmall fontSize='small' style={{ marginRight: '5px' }} />
                                            {T.translate('generic.money', { money: MONEY[newCharacter.culte] * 2 })}
                                        </Typography>
                                        <Typography variant="body2">
                                            {T.translate('create.culte.' + CULTES[newCharacter.culte].name)}
                                        </Typography>
                                    </CardContent>
                                </div>}
                                {this.displayControls(typeof newCharacter.culte !== 'number', true)}
                            </StepContent>
                        </Step>
                        <Step>
                            {this.displayLabel(
                                T.translate('create.concept.title').toString(),
                                (typeof newCharacter.concept === 'number') ?
                                    T.translate('concepts.' + CONCEPTS[newCharacter.concept].name).toString() : '',
                                3
                            )}
                            <StepContent>
                                <FormControl fullWidth margin='dense'>
                                    <InputLabel shrink htmlFor="concept">
                                        {T.translate('generic.concept')}
                                    </InputLabel>
                                    <Select
                                        input={<Input name="concept" fullWidth />}
                                        fullWidth
                                        value={isNaN(newCharacter.concept) ? '' : newCharacter.concept}
                                        onChange={this.handleChange}
                                    >
                                        <MenuItem value={''}>
                                            {T.translate('generic.none')}
                                        </MenuItem>
                                        {CONCEPTS.map((concept: Concept, key) => (
                                            <MenuItem key={key} value={key}>
                                                {T.translate('concepts.' + concept.name)}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {typeof newCharacter.concept === 'number' && <CardContent>
                                    <Typography variant="body2">
                                        {T.translate('create.concept.' + CONCEPTS[newCharacter.concept].name)}
                                    </Typography>
                                </CardContent>}
                                {this.displayControls(typeof newCharacter.concept !== 'number', true)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>{T.translate('create.attributes')}</StepLabel>
                            <StepContent>
                                {this.displayControls(false, true)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>{T.translate('create.selectattributes')}</StepLabel>
                            <StepContent>
                                {this.displayControls(false, true)}
                            </StepContent>
                        </Step>
                        <Step>
                            {this.displayLabel(
                                T.translate('create.potentials').toString(),
                                T.translate('generic.selectedpotentials').toString(),
                                6
                            )}
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

    private displayLabel(title: string, validElement: string, currentStep: number): JSX.Element {
        return (
            <StepLabel classes={{ labelContainer: 'create-step-label' }}>
                {title}
                {this.state.activeStep >= currentStep + 1 &&
                    <Chip
                        label={validElement}
                        color="secondary"
                        icon={<Done />}
                    />}
            </StepLabel>
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
