import React, { Component } from 'react';
import Character from '../../models/Character';
import { CardContent, TextField } from '@material-ui/core';
import T from 'i18n-react';

interface Props {
    noteId: number;
    char: Character;
    onUpdate: (id: number) => void;
}

export default class Note extends Component<Props, {}> {

    public handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        let char = this.props.char;
        char.notes[this.props.noteId] = event.target.value;
        this.props.onUpdate(this.props.noteId);
    }

    public render() {

        return (
            <CardContent style={{ height: '100%', paddingTop: '0px' }}>
                <TextField
                    label={T.translate('navigator.notes')}
                    multiline
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    style={{ height: '100%' }}
                    classes={{
                        root: "textfield-fullheight"
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.props.char.notes[this.props.noteId] || ''}
                    onChange={this.handleChange}
                />
            </CardContent>
        );
    }
}
