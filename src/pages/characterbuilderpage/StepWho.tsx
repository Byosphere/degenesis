import React from 'react';
import { TextField, FormControl, InputLabel, Select, Input, MenuItem, InputAdornment, Typography } from '@material-ui/core';
import { SEX } from '../../constants';
import T from 'i18n-react';
import { Character } from '../../models/Character';
import { useStyles } from './styles';

interface Props {
    newCharacter: Character;
    onChange: (event: any) => void;
    buttons: JSX.Element;
}

export default function StepWho(props: Props) {

    const { newCharacter, onChange, buttons } = props;
    const classes = useStyles();

    return (
        <>
            <Typography className={classes.detailTypo} component='p'>{T.translate('create.whodesc')}</Typography>
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
            <div className={classes.containerLast}>
                <TextField
                    name='age'
                    label={T.translate('generic.age')}
                    margin="dense"
                    type='number'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={newCharacter.age || ''}
                    onChange={onChange}
                    required
                />
                <FormControl margin='dense'>
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
            <div className={classes.containerLast}>
                <TextField
                    name='weight'
                    label={T.translate('generic.weight') as string}
                    margin="dense"
                    type='number'
                    InputProps={{
                        endAdornment: <InputAdornment position="end">Kg</InputAdornment>
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={newCharacter.weight || ''}
                    onChange={onChange}
                    required

                />
                <TextField
                    name='size'
                    label={T.translate('generic.size') as string}
                    margin="dense"
                    type='number'
                    InputProps={{
                        endAdornment: <InputAdornment position="end">cm</InputAdornment>
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={newCharacter.size || ''}
                    onChange={onChange}
                    required
                />
            </div>
            {buttons}
        </>
    );
}
