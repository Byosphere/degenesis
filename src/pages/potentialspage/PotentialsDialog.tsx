import React from 'react';
import { Dialog, AppBar, Toolbar, IconButton, Typography, DialogContent, List, ListSubheader, ListItem, ListItemText } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { POTENTIALS, GENERIC_POTENTIALS } from '../../constants';
import T from 'i18n-react';
import { Character } from '../../models/Character';
import { Prompt } from 'react-router-dom';
import { useStyles } from './styles';
import TransitionUp from '../../components/TransitionUp';

interface Props {
    open: boolean;
    onClose: () => void;
    char: Character;
    onClick: (key: number, type: number) => void;
}

export default function PotentialsDialog(props: Props) {

    const classes = useStyles();

    function actionOnPrompt(location): boolean {
        props.onClose();
        return false;
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            fullScreen
            TransitionComponent={TransitionUp}
        >
            {props.open && <Prompt when={true} message={actionOnPrompt} />}
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="Close">
                        <Close />
                    </IconButton>
                    <Typography variant="h6">
                        {T.translate('potential.add')}
                    </Typography>
                </Toolbar>
            </AppBar>
            <DialogContent className={classes.dialogContent}>
                <List
                    dense
                    component="div"
                    role="list"
                    subheader={
                        <ListSubheader component="div" className={classes.listSubHeader}>
                            {T.translate('generic.potential1')}
                        </ListSubheader>
                    }
                >
                    {POTENTIALS[props.char.culte].map((potential: string, key: number) => (
                        < ListItem
                            key={'c' + key}
                            role="listitem"
                            button
                            onClick={() => props.onClick(key, 1)}
                            disabled={Boolean(props.char.potentials.find(p => p.id === key && p.group === 1))}
                        >
                            <ListItemText
                                primary={T.translate('potentials.' + potential + '.name')}
                                secondary={T.translate('potentials.' + potential + '.desc')}
                            />
                        </ListItem>
                    ))}
                </List>
                <List
                    dense
                    component="div"
                    role="list"
                    subheader={
                        <ListSubheader component="div" className={classes.listSubHeader}>
                            {T.translate('generic.potential0')}
                        </ListSubheader>
                    } >
                    {POTENTIALS[GENERIC_POTENTIALS].map((potential: string, key: number) => (
                        < ListItem
                            key={'g' + key}
                            role="listitem"
                            button
                            onClick={() => props.onClick(key, 0)}
                            disabled={Boolean(props.char.potentials.find(p => p.id === key && p.group === 0))}
                        >
                            <ListItemText
                                primary={T.translate('potentials.' + potential + '.name')}
                                secondary={T.translate('potentials.' + potential + '.desc')}
                            />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
}