import React, { useState } from 'react'
import { Prompt } from 'react-router-dom'
import { DialogTitle, DialogContent, DialogContentText, IconButton, Avatar, Badge, Typography, DialogActions, Button } from '@material-ui/core';
import T from 'i18n-react';
import { CardTravel, Remove } from '@material-ui/icons';
import { useStyles } from './styles';
import { BAG_SIZES } from '../../constants';

interface Props {
    open: boolean;
    bagsize: number;
    onClose: () => void;
    onValidate: (bagsize: number) => void;
}

export default function BagDialog(props: Props) {

    const { open, bagsize } = props;
    const [selection, setSelection] = useState<number>(bagsize);
    const classes = useStyles();

    function actionOnPrompt() {
        props.onClose();
        return false;
    }

    function getBagName() {
        switch (selection) {
            case 0:
                return T.translate('inventory.bag.none');
            case BAG_SIZES[0]:
                return T.translate('inventory.bag.small');
            case BAG_SIZES[1]:
                return T.translate('inventory.bag.medium');
            case BAG_SIZES[2]:
                return T.translate('inventory.bag.big');
        }
    }

    return (
        <>
            {open && <Prompt when={true} message={actionOnPrompt} />}
            <DialogTitle>{T.translate('inventory.encombrement')}</DialogTitle>
            <DialogContent>
                <DialogContentText>{T.translate('inventory.bagsizetext')}</DialogContentText>
                <DialogContentText>
                    <Typography variant='caption'>{T.translate('inventory.bagsize', { name: getBagName() })}</Typography>
                </DialogContentText>
                <div className={classes.iconList}>
                    <IconButton className={!selection ? classes.selected : ''} onClick={() => setSelection(0)}>
                        <Avatar variant='rounded' className={classes.avatar}>
                            <Remove fontSize="small" />
                        </Avatar>
                    </IconButton>
                    <IconButton className={selection === BAG_SIZES[0] ? classes.selected : ''} onClick={() => setSelection(BAG_SIZES[0])}>
                        <Badge
                            overlap='rectangular'
                            badgeContent={BAG_SIZES[0]}
                            color='secondary'
                        >
                            <Avatar variant='rounded' className={classes.avatar}>
                                <CardTravel fontSize="small" />
                            </Avatar>
                        </Badge>
                    </IconButton>
                    <IconButton className={selection === BAG_SIZES[1] ? classes.selected : ''} onClick={() => setSelection(BAG_SIZES[1])}>
                        <Badge
                            overlap='rectangular'
                            badgeContent={BAG_SIZES[1]}
                            color='secondary'
                        >
                            <Avatar variant='rounded' className={classes.avatar}>
                                <CardTravel />
                            </Avatar>
                        </Badge>
                    </IconButton>
                    <IconButton className={selection === BAG_SIZES[2] ? classes.selected : ''} onClick={() => setSelection(BAG_SIZES[2])}>
                        <Badge
                            overlap='rectangular'
                            badgeContent={BAG_SIZES[2]}
                            color='secondary'
                        >
                            <Avatar variant='rounded' className={classes.avatar}>
                                <CardTravel fontSize="large" />
                            </Avatar>
                        </Badge>
                    </IconButton>
                </div>
            </DialogContent>
            <DialogActions>
                <Button color='primary' onClick={props.onClose}>{T.translate('generic.close')}</Button>
                <Button color='secondary' onClick={() => props.onValidate(selection)}>{T.translate('generic.save')}</Button>
            </DialogActions>
        </>
    )
}
