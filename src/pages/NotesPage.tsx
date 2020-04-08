import React, { Component } from 'react';
import Character from '../models/Character';
import { Card, MobileStepper, Button, CardActions, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';
import SwipeableViews from 'react-swipeable-views';
import { NOTES_MAX } from '../constants';
import T from 'i18n-react';
import Note from '../components/Note';

interface Props {
    char: Character;
    onChange: (char: Character, save: boolean) => void;
}

interface State {
    activeStep: number;
    deleteModalOpen: boolean;
}

export default class NotesPage extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            activeStep: 0,
            deleteModalOpen: false
        }
    }

    public handleSave = () => {
        this.props.onChange(this.props.char, true);
    }

    public handleChangeStep = (step: number) => {
        this.setState({ activeStep: step });
    }

    public openDeleteConfirm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState({ deleteModalOpen: true });
    }

    public handleClose = () => {
        this.setState({ deleteModalOpen: false });
    }

    public handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let char = this.props.char;
        char.notes.splice(this.state.activeStep, 1);
        this.setState({
            deleteModalOpen: false,
            activeStep: this.state.activeStep - 1
        });
        this.props.onChange(this.props.char, true);
    }

    public updateNote = (id: number) => {
        this.forceUpdate();
    }

    public handleAdd = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let char = this.props.char;
        char.notes[char.notes.length] = '';
        this.setState({ activeStep: char.notes.length - 1 });
        this.props.onChange(this.props.char, true);
    }

    public render() {
        const { activeStep } = this.state;
        const { char } = this.props;

        const notes = char.notes;

        return (
            <div style={{ height: '100%', padding: '5px' }}>
                <Card style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}>
                    <MobileStepper
                        variant="dots"
                        position='static'
                        steps={notes.length}
                        activeStep={activeStep}
                        nextButton={
                            <Button
                                size="small"
                                disabled={activeStep === notes.length - 1}
                                onClick={() => this.setState({ activeStep: this.state.activeStep + 1 })}
                            >
                                {T.translate('generic.next')}
                                <KeyboardArrowRight />
                            </Button>
                        }
                        backButton={
                            <Button
                                size="small"
                                disabled={activeStep === 0}
                                onClick={() => this.setState({ activeStep: this.state.activeStep - 1 })}
                            >
                                <KeyboardArrowLeft />
                                {T.translate('generic.prev')}
                            </Button>
                        }
                    />
                    <SwipeableViews
                        index={activeStep}
                        onChangeIndex={this.handleChangeStep}
                        resistance
                        style={{ flex: 1 }}
                    >
                        {notes.map((text, id) => (
                            <Note key={id} noteId={id} char={char} onUpdate={() => this.forceUpdate()} />
                        ))}
                    </SwipeableViews>
                    <CardActions style={{ justifyContent: 'space-around', marginBottom: '8px' }} >
                        <Button
                            color='primary'
                            onClick={this.handleAdd}
                            disabled={char.notes.length === NOTES_MAX}
                        >
                            {T.translate('generic.addnote')}
                        </Button>
                        <Button
                            color='primary'
                            onClick={this.handleSave}
                            disabled={!char.notes[activeStep]}
                        >
                            {T.translate('generic.save')}
                        </Button>
                        <Button
                            color='secondary'
                            onClick={this.openDeleteConfirm}
                            disabled={activeStep === char.notes.length || activeStep === 0}
                        >
                            {T.translate('generic.delete')}
                        </Button>
                    </CardActions>
                    <Dialog
                        open={this.state.deleteModalOpen}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {T.translate('generic.confirmdelete', { who: T.translate('generic.currentnote') })}
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                {T.translate('generic.no')}
                            </Button>
                            <Button onClick={this.handleDelete} autoFocus color='secondary'>
                                {T.translate('generic.yes')}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Card>
            </div>
        );
    }
}
