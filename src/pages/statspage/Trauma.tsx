import React, { useState } from 'react';
import { IconButton, Typography, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { Clear, OfflineBolt, OfflineBoltOutlined, Cancel, Info } from '@material-ui/icons';
import { getTraumaMax } from '../../utils/characterTools';
import { Character } from '../../models/Character';
import { useStyles } from './styles';
import T from 'i18n-react';
import { Prompt } from 'react-router-dom';

interface Props {
    char: Character;
    label: string;
    desc: string;
    onClick: (val: number) => void;
}

export default function Trauma(props: Props) {

    const { label, desc, char } = props;
    const traumaMax = getTraumaMax(char);
    const [open, setOpen] = useState<boolean>(false);
    const classes = useStyles();
    let trauma = [];

    function actionOnPrompt(): boolean {
        setOpen(false);
        return false;
    }

    trauma.push(
        <IconButton key={0} className={classes.traumaButton} onClick={() => props.onClick(0)}>
            <Cancel color='primary' />
        </IconButton>
    );

    for (let i = 1; i <= traumaMax; i++) {
        trauma.push(
            <IconButton key={i} className={classes.traumaButton} onClick={() => props.onClick(i)}>
                {i <= props.char.trauma ? <OfflineBolt color='primary' /> : <OfflineBoltOutlined color='primary' />}
            </IconButton>
        );
    }

    return (
        <div className={classes.traumaContainer}>
            <div>
                <Typography component='div' variant='caption'>
                    {label + ' (' + char.trauma + '/' + getTraumaMax(char) + ') :'}
                </Typography>
                {trauma}
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