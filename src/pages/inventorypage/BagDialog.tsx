import React from 'react'
import { Prompt } from 'react-router-dom'
import { DialogTitle, DialogContent, DialogContentText, IconButton, Avatar, Badge, Typography } from '@material-ui/core';
import T from 'i18n-react';
import { CardTravel } from '@material-ui/icons';
import { useStyles } from './styles';
import { BAG_SIZES, ATTRIBUTES, SKILLS } from '../../constants';

interface Props {
    open: boolean;
    bagsize: number;
    weight: number;
    force: number;
    onClose: () => void;
    onValidate: (bagsize: number) => void;
}

export default function BagDialog(props: Props) {

    const { weight, open, force, bagsize } = props;
    const classes = useStyles();

    function actionOnPrompt() {
        props.onClose();
        return false;
    }

    return (
        <>
            {open && <Prompt when={true} message={actionOnPrompt} />}
            <DialogTitle>{T.translate('inventory.bagdialog')}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {T.translate('inventory.bagsize')}
                </DialogContentText>
                <div className={classes.iconList}>
                    <IconButton onClick={() => props.onValidate(BAG_SIZES[0])}>
                        <Badge
                            overlap='rectangle'
                            badgeContent={BAG_SIZES[0] + '%'}
                            color='secondary'
                        >
                            <Avatar variant='rounded' className={classes.avatar}>
                                <CardTravel fontSize="small" />
                            </Avatar>
                        </Badge>
                    </IconButton>
                    <IconButton onClick={() => props.onValidate(BAG_SIZES[1])}>
                        <Badge
                            overlap='rectangle'
                            badgeContent={BAG_SIZES[1] + '%'}
                            color='secondary'
                        >
                            <Avatar variant='rounded' className={classes.avatar}>
                                <CardTravel />
                            </Avatar>
                        </Badge>
                    </IconButton>
                    <IconButton onClick={() => props.onValidate(BAG_SIZES[2])}>
                        <Badge
                            overlap='rectangle'
                            badgeContent={BAG_SIZES[2] + '%'}
                            color='secondary'
                        >
                            <Avatar variant='rounded' className={classes.avatar}>
                                <CardTravel fontSize="large" />
                            </Avatar>
                        </Badge>
                    </IconButton>
                </div>
                <DialogContentText>
                    <Typography variant='caption'>
                        {T.translate('inventory.bagsizeoperation', {
                            bagsize,
                            force,
                            weight,
                            attribute: (T.translate('attributes.' + ATTRIBUTES[0] + '.name') as string).toUpperCase().substring(0, 3),
                            skill: T.translate('skills.' + SKILLS[0][2]) as string
                        })}
                    </Typography>
                </DialogContentText>
            </DialogContent>
        </>
    )
}
