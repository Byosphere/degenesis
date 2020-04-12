import React, { useState, useMemo } from 'react';
import { FormGroup, Typography, IconButton, Dialog, DialogContent, DialogContentText, DialogActions, Button, DialogTitle, Divider } from '@material-ui/core';
import { Info, Casino, AddCircle } from '@material-ui/icons';
import T from 'i18n-react';
import { Prompt } from 'react-router-dom';
import IconNumber from './IconNumber';

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
}

export default function AttributeJauge(props: Props) {

    const { attribute, potential, label, desc, value, onClick, disabled } = props;
    const [open, setOpen] = useState<boolean>(false);
    const color = useMemo(() => attribute ? '#FFF' : 'rgba(0, 0, 0, 0.54)', [attribute]);

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
        <FormGroup
            row
            style={{
                alignItems: "center",
                paddingLeft: '16px',
                backgroundColor: attribute ? '#444' : '',
                color,
                width: '100%',
                marginRight: attribute ? '10px' : '',
                position: 'relative',
                borderBottom: attribute ? 'none' : '1px solid rgba(0,0,0,0.16)',
                marginBottom: attribute ? '' : '8px',
                paddingTop: (!potential && !attribute) ? '8px' : '',
                opacity: disabled ? 0.4 : 1,
                pointerEvents: disabled ? 'none' : 'initial'
            }}
        >
            {attribute && <IconButton
                size='small'
                style={{ position: 'absolute', left: '-18px', top: '6px', padding: '1px', background: 'white', color: '#444' }}
                onClick={handleOpen}
            >
                <Info />
            </IconButton>}
            {attribute && props.locked && <IconButton
                size='small'
                style={{
                    position: 'absolute',
                    right: '-10px',
                    top: '-10px',
                    padding: '1px',
                    background: 'white',
                    color: value === 6 ? '' : '#444',
                }}
                onClick={handleEdit}
                disabled={value === 6}
            >
                <AddCircle />
            </IconButton>}
            {(potential || attribute) && <Typography
                variant="body1"
                component="span"
                style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}
            >
                {label}
            </Typography>}
            {!potential && !attribute && <Typography
                variant="caption"
                component="span"
                style={{ position: 'absolute', color: 'rgba(0, 0, 0, 0.87)', top: '0' }}
            >
                {label + ' (' + value + ')'}
            </Typography>}
            <div style={{
                paddingRight: attribute ? '14px' : '',
                flex: 1,
                display: 'flex',
                justifyContent: (potential || attribute) ? 'flex-end' : 'flex-start',
                alignItems: 'center',
                paddingTop: '8px',
                paddingBottom: '8px'
            }}>
                {items}
                {!potential && !attribute && <span style={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
                    <hr style={{ margin: '0 3px 0 6px', border: 'none', borderLeft: '1px solid rgba(0,0,0,0.16)', height: '24px' }} />
                    {props.locked && <IconButton
                        onClick={handleEdit}
                        size='small'
                        style={{ margin: '0 8px' }}
                        disabled={value === 6}
                    >
                        <AddCircle />
                    </IconButton>}
                    <IconButton onClick={props.onRollDice} size='small' color='secondary' >
                        <Casino />
                    </IconButton>
                </span>}
            </div>
            {attribute && <Dialog
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
            {disabled && <Divider style={{ position: 'absolute', backgroundColor: 'black', height: '2px', width: '100%', left: '0px', opacity: 0.5 }} />}
        </FormGroup>
    );
}