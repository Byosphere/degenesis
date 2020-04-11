import React, { useState, useMemo } from 'react';
import { FormGroup, Typography, IconButton, Dialog, DialogContent, DialogContentText, DialogActions, Button, DialogTitle } from '@material-ui/core';
import { LooksOne, LooksOneOutlined, LooksTwo, LooksTwoOutlined, Looks6Outlined, Looks3Outlined, Looks3, Looks4Outlined, Looks4, Looks5Outlined, Looks5, Looks6, Info, BackspaceOutlined, Backspace, Casino } from '@material-ui/icons';
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
    onClick?: (value: number) => void;
}

export default function AttributeJauge(props: Props) {

    const { attribute, potential, label, desc, value, onClick } = props;
    const [open, setOpen] = useState<boolean>(false);
    const color = useMemo(() => attribute ? '#FFF' : 'rgba(0, 0, 0, 0.54)', [attribute]);

    function handleClick(value: number) {
        if (onClick) onClick(value);
    }

    function actionOnPrompt(): boolean {
        setOpen(false);
        return false;
    }

    let items = [];
    for (let i = 0; i <= (potential ? 3 : 6); i++) {

        items.push(<IconNumber
            key={i}
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
                paddingLeft: '10px',
                backgroundColor: attribute ? '#444' : '',
                color,
                width: '100%',
                marginRight: attribute ? '10px' : '',
                position: 'relative',
                borderBottom: attribute ? 'none' : '1px solid rgba(0,0,0,0.16)',
                marginBottom: attribute ? '' : '8px'
            }}
        >
            {attribute && <IconButton
                size='small'
                style={{ position: 'absolute', right: '-10px', top: '-10px', padding: '1px', background: 'white', color: '#444' }}
                onClick={() => setOpen(true)}
            >
                <Info />
            </IconButton>}
            <Typography
                variant="body1"
                component="span"
                style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}
            >
                {label}
            </Typography>
            <div style={{
                paddingRight: attribute ? '20px' : '',
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingTop: '8px',
                paddingBottom: '8px',
            }}>
                {items}
                {!potential && !attribute && <>
                    <hr style={{ margin: '0 3px 0 6px', border: 'none', borderLeft: '1px solid rgba(0,0,0,0.16)', height: '24px' }} />
                    <IconButton onClick={props.onRollDice} size='small' color='secondary'>
                        <Casino />
                    </IconButton>
                </>}
            </div>
            {attribute && <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <Prompt when={true} message={actionOnPrompt} />
                <DialogContent>
                    <DialogTitle>{label}</DialogTitle>
                    <DialogContentText>{desc}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">{T.translate('generic.close')}</Button>
                </DialogActions>
            </Dialog>}
        </FormGroup>
    );
}