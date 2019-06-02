import React, { Component } from 'react'
import Character from '../../models/Character';
import { Card, CardContent, TextField, FormControl, InputLabel, Select, MenuItem, Input, InputAdornment } from '@material-ui/core';

interface Props {
    char: Character;
}

export default class EditStatsPage extends Component<Props, {}> {

    public render() {
        return (
            <div style={{ margin: '5px' }}>
                <Card>
                    <CardContent>
                        <TextField
                            label="Name"
                            margin="dense"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                        <div style={{ display: 'flex' }}>
                            <TextField
                                label="Age"
                                margin="dense"
                                type='number'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                style={{ flex: 1, marginRight: '8px' }}
                            />
                            <FormControl margin='dense' style={{ flex: 1, marginLeft: '8px' }}>
                                <InputLabel shrink htmlFor="age-simple">Sexe</InputLabel>
                                <Select
                                    input={<Input name="age" id="age-auto-width" />}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <TextField
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
                            />
                            <TextField
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
                            />
                        </div>
                        <FormControl fullWidth margin='dense'>
                            <InputLabel shrink htmlFor="age-simple">Culte</InputLabel>
                            <Select
                                input={<Input name="age" id="age-auto-width" fullWidth />}
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin='dense'>
                            <InputLabel shrink htmlFor="age-simple">Culture</InputLabel>
                            <Select
                                input={<Input name="age" id="age-auto-width" fullWidth />}
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin='dense'>
                            <InputLabel shrink htmlFor="age-simple">Concept</InputLabel>
                            <Select
                                input={<Input name="age" id="age-auto-width" fullWidth />}
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin='dense'>
                            <InputLabel shrink htmlFor="age-simple">Rang</InputLabel>
                            <Select
                                input={<Input name="age" id="age-auto-width" fullWidth />}
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <div style={{ display: 'flex' }}>
                            <TextField
                                label="Blessures"
                                margin="dense"
                                type='number'
                                style={{ flex: 1, marginRight: '8px' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    max: 24
                                }}
                            />
                            <TextField
                                label="Sporulations"
                                margin="dense"
                                type='number'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    max: 24
                                }}
                                style={{ flex: 1, margin: '8px' }}
                            />
                            <TextField
                                label="Traumatismes"
                                margin="dense"
                                type='number'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    max: 8
                                }}
                                style={{ flex: 1, margin: '8px' }}
                            />
                            <TextField
                                label="Ego"
                                margin="dense"
                                type='number'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    max: 24
                                }}
                                style={{ flex: 1, marginLeft: '8px' }}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
}
