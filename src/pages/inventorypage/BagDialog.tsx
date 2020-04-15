import React from 'react'
import { Prompt } from 'react-router-dom'
import { DialogTitle, DialogContent, DialogContentText, IconButton, Avatar, Badge, Typography } from '@material-ui/core';
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
    const classes = useStyles();

    function actionOnPrompt() {
        props.onClose();
        return false;
    }

    return (
        <>
            {open && <Prompt when={true} message={actionOnPrompt} />}
            <DialogTitle>{T.translate('inventory.encombrement')}</DialogTitle>
            <DialogContent>
                <DialogContentText>{T.translate('inventory.bagsizetext')}</DialogContentText>
                <DialogContentText>
                    <Typography variant='caption'>{T.translate('inventory.bagsize')}</Typography>
                </DialogContentText>
                <div className={classes.iconList}>
                    <IconButton className={!bagsize ? classes.selected : ''} onClick={() => props.onValidate(0)}>
                        <Avatar variant='rounded' className={classes.avatar}>
                            <Remove fontSize="small" />
                        </Avatar>
                    </IconButton>
                    <IconButton className={bagsize === BAG_SIZES[0] ? classes.selected : ''} onClick={() => props.onValidate(BAG_SIZES[0])}>
                        <Badge
                            overlap='rectangle'
                            badgeContent={BAG_SIZES[0]}
                            color='secondary'
                        >
                            <Avatar variant='rounded' className={classes.avatar}>
                                <CardTravel fontSize="small" />
                            </Avatar>
                        </Badge>
                    </IconButton>
                    <IconButton className={bagsize === BAG_SIZES[1] ? classes.selected : ''} onClick={() => props.onValidate(BAG_SIZES[1])}>
                        <Badge
                            overlap='rectangle'
                            badgeContent={BAG_SIZES[1]}
                            color='secondary'
                        >
                            <Avatar variant='rounded' className={classes.avatar}>
                                <CardTravel />
                            </Avatar>
                        </Badge>
                    </IconButton>
                    <IconButton className={bagsize === BAG_SIZES[2] ? classes.selected : ''} onClick={() => props.onValidate(BAG_SIZES[2])}>
                        <Badge
                            overlap='rectangle'
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
        </>
    )
}
