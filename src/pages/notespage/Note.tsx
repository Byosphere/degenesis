import React, { useState } from 'react';
import { CardContent, TextField } from '@material-ui/core';
import T from 'i18n-react';
import { Character } from '../../models/Character';
import { useStyles } from './styles';

interface Props {
    noteId: number;
    char: Character;
}

export default function Note(props: Props) {

    const [note, setNote] = useState<string>(props.char.notes[props.noteId]);
    const classes = useStyles();

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) {
        let char = props.char;
        char.notes[props.noteId] = event.target.value;
        setNote(event.target.value);
    }

    return (
        <CardContent className={classes.note}>
            <TextField
                label={T.translate('navigator.notes')}
                multiline
                margin="normal"
                variant="outlined"
                fullWidth
                classes={{
                    root: "textfield-fullheight"
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                value={note}
                onChange={handleChange}
            />
        </CardContent>
    )
}
