import React, { useState } from 'react';
import { DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import T from 'i18n-react';
import { Prompt } from 'react-router-dom';
import { Pet } from '../../models/Character';

interface Props {
    open: boolean;
    pet: Pet;
    onClose: () => void;
    onValidate: (pet: Pet) => void;
}

export default function PetDialog(props: Props) {

    function actionOnPrompt() {
        props.onClose();
        return false;
    }

    return (
        <>
            {props.open && <Prompt when={true} message={actionOnPrompt} />}
            <DialogTitle id="form-dialog-title">{T.translate('inventory.moneyedit')}</DialogTitle>
            <DialogContent>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.onClose()} color="primary">
                    {T.translate('generic.cancel')}
                </Button>
                <Button onClick={() => props.onValidate(null)} color="secondary">
                    {T.translate('generic.validate')}
                </Button>
            </DialogActions>
        </>
    );
}