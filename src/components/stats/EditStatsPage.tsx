import React, { Component } from 'react'
import Character from '../../models/Character';
import { Card, CardContent, TextField, FormControl, InputLabel, Select, MenuItem, Input, InputAdornment, CardActions, Button, Typography } from '@material-ui/core';
import T from 'i18n-react';
import { SEX, CULTES, CULTURES, CONCEPTS, RANGS } from '../../constants';

interface Props {
    char: Character;
    onCharChange: (char: Character) => void;
}

interface State {
    char: Character;
    pristine: boolean;
}

export default class EditStatsPage extends Component<Props, State> {

    public constructor(props: Props) {
        super(props);

        this.state = {
            char: JSON.parse(JSON.stringify(this.props.char)),
            pristine: true
        }
    }

    public handleChange = (event: any) => {
        let char: any = this.state.char;
        char[event.target.name] = event.target.value;
        switch (event.target.name) {
            case 'culte':
                // TODO
                break;
            default:
                break;
        }
        this.setState({ char, pristine: false });
    }

    public handleJaugeChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {

    }

    public handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            char: JSON.parse(JSON.stringify(this.props.char)),
            pristine: true
        });
    }

    public handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onCharChange(this.state.char);
        this.setState({ pristine: true });
    }

    public render() {

        const { char, pristine } = this.state;

        return (
            <div style={{ margin: '5px' }}>
                <Card>
                    <CardActions style={{ justifyContent: 'space-between' }}>
                        <Typography style={{ marginLeft: '8px' }}>
                            {T.translate('generic.editmode')}
                        </Typography>
                        <div>
                            <Button color='primary' disabled={pristine} onClick={this.handleCancel}>
                                {T.translate('generic.cancel')}
                            </Button>
                            <Button color="secondary" disabled={pristine} onClick={this.handleSave}>
                                {T.translate('generic.save')}
                            </Button>
                        </div>
                    </CardActions>
                    <CardContent>
                        <TextField
                            name='name'
                            label={T.translate('generic.name')}
                            margin="dense"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            value={char.name}
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
                                value={char.age}
                                onChange={this.handleChange}
                                required
                            />
                            <FormControl margin='dense' style={{ flex: 1, marginLeft: '8px' }}>
                                <InputLabel shrink htmlFor="sex">
                                    {T.translate('generic.sex')}
                                </InputLabel>
                                <Select
                                    input={<Input name="sex" />}
                                    value={char.sex}
                                    onChange={this.handleChange}
                                    required
                                >
                                    {SEX.map((text, key) => (
                                        <MenuItem key={key} value={key}>
                                            {T.translate('sex.' + text)}
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
                                value={char.weight}
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
                                value={char.size}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <FormControl fullWidth margin='dense'>
                            <InputLabel shrink htmlFor="culture">
                                {T.translate('generic.culture')}
                            </InputLabel>
                            <Select
                                input={<Input name="culture" fullWidth />}
                                fullWidth
                                value={char.culture}
                                onChange={this.handleChange}
                                error={char.culture < 0}
                                required
                            >
                                {CULTURES.map((text, key) => (
                                    <MenuItem key={key} value={key}>
                                        {T.translate('cultures.' + text)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin='dense'>
                            <InputLabel shrink htmlFor="culte">
                                {T.translate('generic.culte')}
                            </InputLabel>
                            <Select
                                input={<Input name="culte" fullWidth />}
                                fullWidth
                                value={char.culte}
                                onChange={this.handleChange}
                                error={char.culte < 0}
                                required
                            >
                                {CULTES.map((text, key) => (
                                    <MenuItem key={key} value={key}>
                                        {T.translate('cultes.' + text)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin='dense'>
                            <InputLabel shrink htmlFor="concept">
                                {T.translate('generic.concept')}
                            </InputLabel>
                            <Select
                                input={<Input name="concept" fullWidth />}
                                fullWidth
                                value={char.concept}
                                disabled={char.culte < 0}
                                onChange={this.handleChange}
                                error={char.concept < 0}
                                required
                            >
                                {CONCEPTS.map((text, key) => (
                                    <MenuItem key={key} value={key}>
                                        {T.translate('concepts.' + text)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin='dense'>
                            <InputLabel shrink htmlFor="rang">
                                {T.translate('generic.rang')}
                            </InputLabel>
                            <Select
                                input={<Input name="rang" fullWidth />}
                                fullWidth
                                disabled={char.culte < 0}
                                value={char.rang}
                                onChange={this.handleChange}
                                error={char.rang < 0}
                                required
                            >
                                {RANGS[char.culte].map((text, key) => (
                                    <MenuItem key={key} value={key}>
                                        {T.translate('rangs.' + text)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div style={{ display: 'flex' }}>
                            <TextField
                                name="blessures"
                                label={T.translate('generic.blessures')}
                                margin="dense"
                                type='number'
                                style={{ flex: 1, marginRight: '8px' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    max: 24
                                }}
                                value={char.blessures.total}
                                onChange={this.handleJaugeChange}
                                required
                            />
                            <TextField
                                name="sporulation"
                                label={T.translate('generic.sporulation')}
                                margin="dense"
                                type='number'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    max: 24
                                }}
                                style={{ flex: 1, margin: '8px' }}
                                value={char.sporulation.total}
                                onChange={this.handleJaugeChange}
                                required
                            />
                            <TextField
                                name="trauma"
                                label={T.translate('generic.trauma')}
                                margin="dense"
                                type='number'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    max: 8
                                }}
                                style={{ flex: 1, margin: '8px' }}
                                value={char.trauma.total}
                                onChange={this.handleJaugeChange}
                                required
                            />
                            <TextField
                                name="ego"
                                label={T.translate('generic.ego')}
                                margin="dense"
                                type='number'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    max: 24
                                }}
                                style={{ flex: 1, marginLeft: '8px' }}
                                value={char.ego.total}
                                onChange={this.handleJaugeChange}
                                required
                            />
                        </div>
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
                            rows={5}
                            rowsMax={20}
                            value={char.story}
                            onChange={this.handleChange}
                            required
                        />
                    </CardContent>
                </Card>
            </div>
        );
    }
}
