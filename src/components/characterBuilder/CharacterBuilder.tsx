import React, { Component } from 'react'
import { Card, Stepper, Step, StepLabel, StepContent, Typography, TextField, FormControl, InputLabel, Select, Input, MenuItem, InputAdornment, Button, Grid, CardMedia, CardContent } from '@material-ui/core';
import Character from '../../models/Character';
import { Redirect } from 'react-router-dom';
import T from 'i18n-react';
import { CULTURES, CULTES, CONCEPTS, SEX } from '../../constants';

interface Props {
    characters: Character[];
    selectedCharacter: Character;
    onChangeChar: (char: Character) => void;
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
            newCharacter: {}
        };
    }

    public selectCharacter(key: number): void {
        this.props.onChangeChar(this.props.characters[key]);
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
        // TODO
    }

    public render() {

        if (this.props.selectedCharacter) return <Redirect to='/stats' />
        const { activeStep, newCharacter } = this.state;

        return (
            <div style={{ margin: '5px' }}>
                <Typography variant='subtitle1' component='p' className="card-overtitle">
                    {T.translate('generic.charactercreate')}
                </Typography>
                <Card style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: 'auto' }}>
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

                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>{T.translate('create.potentials')}</StepLabel>
                            <StepContent>

                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>{T.translate('create.lasttouch')}</StepLabel>
                            <StepContent>

                            </StepContent>
                        </Step>
                    </Stepper>
                </Card>
            </div>
        );
    }

    private displayControls(enableNext: boolean, enablePrev: boolean, isLast?: boolean): JSX.Element {
        return (
            <div>
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
                    disabled={enableNext}
                >
                    {isLast ? T.translate('generic.create') : T.translate('generic.next')}
                </Button>
            </div>
        );
    }
}
