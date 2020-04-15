import React, { useState } from 'react';
import { FormGroup, Typography, IconButton, Dialog, DialogContent, DialogContentText, DialogActions, Button, DialogTitle } from '@material-ui/core';
import { Info, Casino, AddCircle } from '@material-ui/icons';
import T from 'i18n-react';
import { Prompt } from 'react-router-dom';
import IconNumber from './IconNumber';
import { useStyles } from './styles';

interface Props {
    label: string;
    desc?: string;
    value: number;
    attribute?: boolean;
    potential?: boolean;
    onRollDice?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onEdit?: () => void;
    onClick?: (value: number) => void;
    locked?: boolean;
    disabled?: boolean;
    origin?: boolean;
}

export default function AttributeJauge(props: Props) {

    const { attribute, potential, label, desc, value, onClick, disabled } = props;
    const [open, setOpen] = useState<boolean>(false);
    // const color = useMemo(() => attribute ? '#FFF' : 'rgba(0, 0, 0, 0.54)', [attribute]);
    const classes = useStyles({ attribute, potential, disabled, value });

    function handleClick(value: number) {
        if (onClick) onClick(value);
    }

    function handleOpen(event) {
        event.stopPropagation();
        setOpen(true);
    }
    function handleClose(event) {
        event.stopPropagation();
        setOpen(false);
    }

    function actionOnPrompt(): boolean {
        setOpen(false);
        return false;
    }

    function handleEdit(event) {
        event.stopPropagation();
        props.onEdit && props.onEdit();
    }

    let items = [];
    for (let i = 0; i <= (potential ? 3 : 6); i++) {

        items.push(<IconNumber
            key={i}
            locked={props.locked}
            onClick={handleClick}
            num={i}
            active={value >= i}
        />);
    }

    return (
        <FormGroup row className={classes.attributeJauge + ' ' + classes.lastAttribute}>
            {attribute && <IconButton
                size='small'
                className={classes.infoButton}
                onClick={handleOpen}
            >
                <Info />
            </IconButton>}
            {attribute && props.locked && <IconButton
                size='small'
                className={classes.addButton}
                onClick={handleEdit}
                disabled={value === 6}
            >
                <AddCircle />
            </IconButton>}
            {(potential || attribute) && <Typography
                variant="body1"
                component="span"
                className={classes.label1}
            >
                {label}
            </Typography>}
            {!potential && !attribute && <Typography
                variant="caption"
                component="span"
                className={classes.label2}
            >
                {label + ' (' + value + ')'}
            </Typography>}
            <div className={classes.container}>
                {items}
                {!potential && !attribute && <span className={classes.sideButtons}>
                    <hr />
                    {props.origin && <IconButton onClick={handleOpen} size='small'><Info /></IconButton>}
                    {props.locked && <IconButton
                        onClick={handleEdit}
                        size='small'
                        disabled={value === 6}
                    >
                        <AddCircle />
                    </IconButton>}
                    {!props.origin && <IconButton onClick={props.onRollDice} size='small' color='secondary' >
                        <Casino />
                    </IconButton>}
                </span>}
            </div>
            {(attribute || origin) && <Dialog
                open={open}
                onClose={handleClose}
            >
                {open && <Prompt when={true} message={actionOnPrompt} />}
                <DialogContent>
                    <DialogTitle>{label}</DialogTitle>
                    <DialogContentText>{desc}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">{T.translate('generic.close')}</Button>
                </DialogActions>
            </Dialog>}
        </FormGroup>
    );
}