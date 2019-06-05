import React, { Component } from 'react';
import Character from '../../models/Character';
import { TextField, FormControl, InputLabel, Select, Input, MenuItem, InputAdornment } from '@material-ui/core';
import { SEX } from '../../constants';
import T from 'i18n-react';

interface Props {
    newCharacter: Character;
    onChange: (event: any) => void;
    buttons: JSX.Element;
}

export default class StepWho extends Component<Props, {}> {

    public render() {

        const { newCharacter, onChange, buttons } = this.props;

        return (
            <React.Fragment>
                <TextField
                    name='name'
                    label={T.translate('generic.name')}
                    margin="dense"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    value={newCharacter.name || ''}
                    onChange={onChange}
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
                        onChange={onChange}
                        required
                    />
                    <FormControl margin='dense' style={{ flex: 1, marginLeft: '8px' }}>
                        <InputLabel shrink htmlFor="sex">
                            {T.translate('generic.sex')}
                        </InputLabel>
                        <Select
                            input={<Input name="sex" />}
                            value={newCharacter.sex || ''}
                            onChange={onChange}
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
                        onChange={onChange}
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
                        onChange={onChange}
                        required
                    />
                </div>
                {buttons}
            </React.Fragment>
        );
    }
}
