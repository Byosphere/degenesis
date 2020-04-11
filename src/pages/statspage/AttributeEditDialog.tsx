import React from 'react';
import { Attribute } from '../../models/Character';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { Slide, Dialog, AppBar, Toolbar, IconButton, Typography, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import { Prompt } from 'react-router-dom';
import { Close } from '@material-ui/icons';
import T from 'i18n-react';

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (attribute: Attribute) => void;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AttributeEditDialog(props: Props) {

    function actionOnPrompt() {
        props.onClose();
        return false;
    }

    function handleSave() {
        // TODO
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            fullScreen
            TransitionComponent={Transition}
        >
            <Prompt when={true} message={actionOnPrompt} />
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="Close">
                        <Close />
                    </IconButton>
                    <Typography variant="h6">
                        {T.translate('generic.addchar')}
                    </Typography>
                </Toolbar>
            </AppBar>
            <DialogContent style={{ marginTop: '56px' }}>

            </DialogContent>
            <DialogActions>
                <Button color='primary' onClick={props.onClose}>{T.translate('generic.cancel')}</Button>
                <Button color='secondary' onClick={handleSave}>{T.translate('generic.save')}</Button>
            </DialogActions>
        </Dialog>
    );
}