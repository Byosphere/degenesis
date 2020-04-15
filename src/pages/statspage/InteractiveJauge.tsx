import React, { useState } from 'react';
import { Typography, IconButton, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { CheckBoxOutlineBlank, IndeterminateCheckBox, Backspace, Info } from '@material-ui/icons';
import T from 'i18n-react';
import { useStyles } from './styles';
import { Prompt } from 'react-router-dom';

interface Props {
    label: string;
    desc: string;
    currentValue: number;
    maximum: number;
    onChange?: (newValue: number) => void;
}

export default function InteractiveJauge(props: Props) {

    const { label, currentValue, maximum, onChange, desc } = props;
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);
    let icons: JSX.Element[] = [];

    for (let i = 1; i <= maximum; i++) {
        const icon = i <= currentValue ?
            <IndeterminateCheckBox className={classes.jaugeIcon} key={i} color='primary' onClick={() => onChange(i)} /> :
            <CheckBoxOutlineBlank className={classes.jaugeIcon} key={i} color='primary' onClick={() => onChange(i)} />
        icons.push(icon);
    }

    function actionOnPrompt(): boolean {
        setOpen(false);
        return false;
    }

    return (
        <div className={classes.jaugeContainer}>
            <div>
                <Typography variant='caption'>
                    {label + ' (' + currentValue + '/' + maximum + ') :'}
                </Typography>
                <div>
                    <Backspace className={classes.jaugeIcon} key={0} color='primary' onClick={() => onChange(0)} />
                    {icons}
                </div>
            </div>
            <div className={classes.infoButton}>
                <IconButton size='small' onClick={() => setOpen(true)}>
                    <Info color='primary' />
                </IconButton>
            </div>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                {open && <Prompt when={true} message={actionOnPrompt} />}
                <DialogContent>
                    <DialogTitle>{label}</DialogTitle>
                    <DialogContentText>{desc}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">{T.translate('generic.close')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
