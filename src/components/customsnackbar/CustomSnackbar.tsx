import React, { useState } from 'react';
import { Snackbar, Slide } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';
import { useStyles } from './styles';

export interface Props {
    message: string;
    type: 'error' | 'success';
    setSnackbar: (val: any) => void;
}

export default function CustomSnackbar(props: Props) {

    const [open, setOpen] = useState<boolean>(true);
    const classes = useStyles(props);

    function handleClose() {
        setOpen(false);
        props.setSnackbar(null);
    }

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={<span className={classes.message}>
                {props.type === 'success' && <><Check className={classes.icon} />{props.message}</>}
                {props.type === 'error' && <><Close className={classes.icon} />{props.message}</>}
            </span>}
            classes={{ root: classes.snackbar }}
            TransitionComponent={(props) => <Slide {...props} direction="right" />}
        />
    );
}