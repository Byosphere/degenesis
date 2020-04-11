import React, { useState } from 'react';
import { Snackbar, Slide } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';

interface Props {
    message: string;
    type: 'error' | 'success';
    setSnackbar: (val: any) => void;
}

export default function CustomSnackbar(props: Props) {

    const [open, setOpen] = useState<boolean>(true);

    function handleClose() {
        setOpen(false);
        props.setSnackbar(null);
    }

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={<span style={{ display: 'flex', alignItems: 'center' }}>
                {props.type === 'success' && <><Check style={{ marginRight: '16px' }} />{props.message}</>}
                {props.type === 'error' && <><Close style={{ marginRight: '16px' }} />{props.message}</>}
            </span>}
            classes={{ root: props.type + '-snackbar' }}
            TransitionComponent={(props) => <Slide {...props} direction="right" />}
        />
    );
}