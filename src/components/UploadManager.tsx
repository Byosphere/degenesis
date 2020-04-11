import React, { useState } from 'react';
import { Dialog, AppBar, Toolbar, IconButton, Typography, DialogContent, DialogActions, Button, Slide, TextField } from '@material-ui/core';
import { Prompt } from 'react-router-dom';
import { Close } from '@material-ui/icons';
import T from 'i18n-react';
import { Character } from '../models/Character';
import { getNewCharacter } from '../utils/characterTools';
import { TransitionProps } from '@material-ui/core/transitions/transition';

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (character: Character) => void;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function UploadManager(props: Props) {

    const [character, setCharacter] = useState<string>(JSON.stringify(getNewCharacter(), undefined, 4));
    const [error, setError] = useState<string>('');

    function actionOnPrompt() {
        props.onClose();
        return false;
    }

    function handleSave() {
        setError('');
        try {
            let char: Character = JSON.parse(character);
            props.onSave(char);
        } catch (error) {
            setError(error.message);
        }
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
            <DialogContent style={{ marginTop: '56px', display: 'flex', flexDirection: 'column' }}>
                <TextField
                    autoFocus
                    label='json'
                    multiline
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    style={{ flexGrow: 1 }}
                    classes={{
                        root: "textfield-fullheight"
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={character}
                    onChange={(event) => setCharacter(event.target.value)}
                    helperText={error}
                    error={!!error}
                />
            </DialogContent>
            <DialogActions>
                <Button color='primary' onClick={props.onClose}>{T.translate('generic.cancel')}</Button>
                <Button color='secondary' onClick={handleSave}>{T.translate('generic.save')}</Button>
            </DialogActions>
        </Dialog>
    );
}