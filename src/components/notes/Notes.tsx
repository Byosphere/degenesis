import React, { Component } from 'react';
import Character from '../../models/Character';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { Card, MobileStepper, Button, CardActions, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import T from 'i18n-react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import Navigator from '../navigator/Navigator';
import SwipeableViews from 'react-swipeable-views';
import Note from './Note';
import { NOTES_MAX } from '../../constants';

interface ownProps {
    characters: Character[];
    onCharChange: (char: Character, save: boolean) => void;
    setHeader: (title: string) => void;
}

type Props = ownProps & RouteComponentProps;

interface State {
    activeStep: number;
    character: Character;
    deleteModalOpen: boolean;
}

export default class Notes extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        let params: any = this.props.match.params;

        this.state = {
            activeStep: 0,
            character: this.props.characters.find(c => c.id === parseInt(params.id)),
            deleteModalOpen: false
        }
    }

    public componentDidMount() {
        this.props.setHeader(T.translate('navigator.notes') as string);
    }

    public handleSave = () => {
        this.props.onCharChange(this.state.character, true);
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
        let char = this.state.character;
        char.notes.splice(this.state.activeStep, 1);
        this.setState({
            deleteModalOpen: false,
            activeStep: this.state.activeStep - 1
        });
        this.props.onCharChange(this.state.character, true);
    }

    public updateNote = (id: number) => {
        this.forceUpdate();
    }

    public handleAdd = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let char = this.state.character;
        char.notes[char.notes.length] = '';
        this.setState({ activeStep: char.notes.length - 1 });
        this.props.onCharChange(this.state.character, true);
    }

    public render() {
        const { activeStep, character } = this.state;

        if (!character) return <Redirect to="/" />;

        const notes = character.notes;

        return (
            <div style={{ height: 'calc(100% - 56px)', padding: '5px' }}>
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
                                disabled={activeStep === notes.length}
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
                            <Note key={id} noteId={id} char={character} onUpdate={() => this.forceUpdate()} />
                        ))}
                    </SwipeableViews>
                    <CardActions style={{ justifyContent: 'space-around', marginBottom: '8px' }} >
                        <Button
                            color='primary'
                            onClick={this.handleAdd}
                            disabled={character.notes.length === NOTES_MAX}
                        >
                            {T.translate('generic.addnote')}
                        </Button>
                        <Button
                            color='primary'
                            onClick={this.handleSave}
                            disabled={!character.notes[activeStep]}
                        >
                            {T.translate('generic.save')}
                        </Button>
                        <Button
                            color='secondary'
                            onClick={this.openDeleteConfirm}
                            disabled={activeStep === character.notes.length || activeStep === 0}
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
                <Navigator />
            </div>
        );
    }
}
