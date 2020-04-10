import React from 'react';
import { TextField, FormControl, InputLabel, Select, Input, MenuItem, InputAdornment, Typography } from '@material-ui/core';
import { SEX } from '../../constants';
import T from 'i18n-react';
import { Character } from '../../models/Character';

interface Props {
    newCharacter: Character;
    onChange: (event: any) => void;
    buttons: JSX.Element;
}

export default function StepWho(props: Props) {

    const { newCharacter, onChange, buttons } = props;

    return (
        <>
            <Typography style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '10px' }} component='p'>{T.translate('create.whodesc')}</Typography>
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
                        value={newCharacter.sex}
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
        </>
    );
}
