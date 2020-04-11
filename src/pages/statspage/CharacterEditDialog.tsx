import React, { useState } from 'react';
import { Dialog, DialogContent, TextField, FormControl, InputLabel, Select, Input, MenuItem, InputAdornment, DialogActions, Button, Slide, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { SEX, RANGS } from '../../constants';
import T from 'i18n-react';
import { Character } from '../../models/Character';
import { Prompt } from 'react-router-dom';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { Close } from '@material-ui/icons';

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (formValues: EditFormValues) => void;
    char: Character;
}

export interface EditFormValues {
    name: string;
    age: number;
    sex: number;
    weight: number;
    size: number;
    rang: number;
    story: string;
}

interface FormErrors {
    name: string;
    age: string;
    sex: string;
    weight: string;
    size: string;
    rang: string;
    story: string;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CharacterEditDialog(props: Props) {

    const { open, char } = props;
    const [formValues, setFormValues] = useState<EditFormValues>({
        name: char.name,
        age: char.age,
        sex: char.sex,
        weight: char.weight,
        size: char.size,
        rang: char.rang,
        story: char.story
    });

    const [errors, setErrors] = useState<FormErrors>({
        name: '',
        age: '',
        sex: '',
        weight: '',
        size: '',
        rang: '',
        story: ''
    });

    function handleChange(event, field: string) {
        setFormValues({ ...formValues, [field]: event.target.value });
    }

    function handleSave() {
        let newErrors: FormErrors = { ...errors };
        newErrors.name = formValues.name ? '' : T.translate('generic.invalidfield') as string;
        newErrors.age = formValues.age ? '' : T.translate('generic.invalidfield') as string;
        newErrors.weight = formValues.weight ? '' : T.translate('generic.invalidfield') as string;
        newErrors.size = formValues.size ? '' : T.translate('generic.invalidfield') as string;
        newErrors.rang = formValues.rang ? '' : T.translate('generic.invalidfield') as string;
        newErrors.sex = formValues.sex ? '' : T.translate('generic.invalidfield') as string;

        if (Object.keys(errors).find((e) => !errors[e])) {
            props.onSave(formValues);
        } else {
            setErrors(newErrors);
        }
    }

    function actionOnPrompt(location): boolean {
        props.onClose();
        return false;
    }

    return (
        <Dialog
            open={open}
            onClose={props.onClose}
            fullScreen
            TransitionComponent={Transition}
        >
            <Prompt when={true} message={actionOnPrompt} />
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="Close">
                        <Close />
                    </IconButton>
                    <Typography variant="h6">
                        {T.translate('generic.characteredit')}
                    </Typography>
                </Toolbar>
            </AppBar>
            <DialogContent style={{ marginTop: '56px' }}>
                <TextField
                    name='name'
                    label={T.translate('generic.name')}
                    margin="dense"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    value={formValues.name}
                    onChange={(event) => handleChange(event, 'name')}
                    required
                    error={Boolean(errors.name)}
                    helperText={errors.name}
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
                        value={formValues.age}
                        onChange={(event) => handleChange(event, 'age')}
                        required
                        error={Boolean(errors.age)}
                        helperText={errors.age}
                    />
                    <FormControl
                        margin='dense'
                        style={{ flex: 1, marginLeft: '8px' }}
                    >
                        <InputLabel shrink htmlFor="sex">
                            {T.translate('generic.sex')}
                        </InputLabel>
                        <Select
                            input={<Input name="sex" />}
                            value={formValues.sex}
                            onChange={(event) => handleChange(event, 'sex')}
                            required
                        >
                            {SEX.map((text, key) => {
                                if (text) {
                                    return (
                                        <MenuItem key={key} value={key}>
                                            {text ? T.translate('sex.' + text) : T.translate('generic.none')}
                                        </MenuItem>
                                    )
                                } else {
                                    return null;
                                }
                            })}
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
                        value={formValues.weight}
                        onChange={(event) => handleChange(event, 'weight')}
                        required
                        error={Boolean(errors.weight)}
                        helperText={errors.weight}
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
                        value={formValues.size}
                        onChange={(event) => handleChange(event, 'size')}
                        required
                        error={Boolean(errors.size)}
                        helperText={errors.size}
                    />
                </div>
                <FormControl fullWidth margin='dense'>
                    <InputLabel shrink htmlFor="rang">
                        {T.translate('generic.rang')}
                    </InputLabel>
                    <Select
                        input={<Input name="rang" fullWidth />}
                        fullWidth
                        value={formValues.rang}
                        onChange={(event) => handleChange(event, 'rang')}
                        error={formValues.rang < 0}
                        required
                    >
                        {RANGS[char.culte].map((text, key) => (
                            <MenuItem key={key} value={key}>
                                {T.translate('rangs.' + text)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
                    value={formValues.story}
                    onChange={(event) => handleChange(event, 'story')}
                    required
                    error={Boolean(errors.story)}
                    helperText={errors.story}
                />
            </DialogContent>
            <DialogActions>
                <Button color='secondary' onClick={handleSave}>
                    {T.translate('generic.validate')}
                </Button>
                <Button color='primary' onClick={props.onClose}>
                    {T.translate('generic.cancel')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}