import React, { useState } from 'react';
import { DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import T from 'i18n-react';
import { Prompt } from 'react-router-dom';
import { Pet } from '../../models/Character';
import { useStyles } from './styles';

interface Props {
    open: boolean;
    pet: Pet;
    onClose: () => void;
    onValidate: (pet: Pet) => void;
}

export default function PetDialog(props: Props) {

    const { pet } = props;
    const [name, setName] = useState<string>(pet ? pet.name : '');
    const classes = useStyles();
    const [species, setSpecies] = useState<string>(pet ? pet.species : '');
    const [errors, setErrors] = useState<string[]>(['', '']);

    function actionOnPrompt() {
        props.onClose();
        return false;
    }

    function handleValidate() {
        let err = [];
        if (!name) err[0] = T.translate('inventory.notempty');
        if (!species) err[1] = T.translate('inventory.notempty');

        if (!err.length) {
            props.onValidate({
                name,
                species
            });
        } else {
            setErrors([...err]);
        }
    }

    return (
        <>
            {props.open && <Prompt when={true} message={actionOnPrompt} />}
            <DialogTitle>{T.translate('inventory.petdialog')}</DialogTitle>
            <DialogContent>
                <TextField
                    label={T.translate('inventory.petname')}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    fullWidth
                    variant='outlined'
                    className={classes.textfield}
                    error={!!errors[0]}
                    helperText={errors[0]}
                />
                <TextField
                    label={T.translate('inventory.species')}
                    value={species}
                    onChange={(event) => setSpecies(event.target.value)}
                    fullWidth
                    variant='outlined'
                    className={classes.textfield}
                    error={!!errors[1]}
                    helperText={errors[1]}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.onClose()} color="primary">
                    {T.translate('generic.cancel')}
                </Button>
                <Button onClick={handleValidate} color="secondary">
                    {T.translate('generic.validate')}
                </Button>
            </DialogActions>
        </>
    );
}