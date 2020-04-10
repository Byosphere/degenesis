import React, { useState, useContext, useEffect } from 'react';
import { Card, MobileStepper, Button, CardActions, Dialog, DialogTitle, DialogActions, Divider } from '@material-ui/core';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';
import SwipeableViews from 'react-swipeable-views';
import { NOTES_MAX } from '../constants';
import T from 'i18n-react';
import Note from '../components/Note';
import { HeaderContext } from '../App';
import { Character } from '../models/Character';
import { Prompt } from 'react-router-dom';

interface Props {
    char: Character;
    onChange: (char: Character) => void;
}

export default function NotesPage(props: Props) {

    const [step, setStep] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);
    const { setHeaderTitle } = useContext(HeaderContext);
    const notes = props.char.notes;

    useEffect(() => {
        setHeaderTitle(T.translate('navigator.notes') as string);
    }, [setHeaderTitle]);

    function handleAdd() {
        let char = props.char;
        char.notes[char.notes.length] = '';
        setStep(char.notes.length - 1);
        props.onChange(props.char);
    }

    function handleDelete() {
        let char = props.char;
        char.notes.splice(step, 1);
        setOpen(false);
        setStep(step - 1);
        props.onChange(props.char);
    }

    function actionOnPrompt() {
        setOpen(false);
        return false;
    }

    return (
        <div style={{ height: '100%', padding: '5px' }}>
            <Card style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}>
                <SwipeableViews
                    index={step}
                    onChangeIndex={setStep}
                    resistance
                    style={{ flex: 1 }}
                >
                    {notes.map((text, id) => (
                        <Note key={id} noteId={id} char={props.char} />
                    ))}
                </SwipeableViews>
                <MobileStepper
                    variant="dots"
                    position='static'
                    steps={notes.length}
                    activeStep={step}
                    nextButton={
                        <Button
                            size="small"
                            disabled={step === notes.length - 1}
                            onClick={() => setStep(step + 1)}
                        >
                            {T.translate('generic.next')}
                            <KeyboardArrowRight />
                        </Button>
                    }
                    backButton={
                        <Button
                            size="small"
                            disabled={step === 0}
                            onClick={() => setStep(step - 1)}
                        >
                            <KeyboardArrowLeft />
                            {T.translate('generic.prev')}
                        </Button>
                    }
                />
                <Divider />
                <CardActions style={{ justifyContent: 'space-around', marginBottom: '8px' }} >
                    <Button
                        color='primary'
                        onClick={handleAdd}
                        disabled={notes.length === NOTES_MAX}
                    >
                        {T.translate('generic.addnote')}
                    </Button>
                    <Button
                        color='secondary'
                        onClick={() => setOpen(true)}
                        disabled={step === notes.length || step === 0}
                    >
                        {T.translate('generic.deletenote')}
                    </Button>
                </CardActions>
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <Prompt when={true} message={actionOnPrompt} />
                    <DialogTitle>
                        {T.translate('generic.confirmdelete', { who: T.translate('generic.currentnote') })}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} color="primary">
                            {T.translate('generic.no')}
                        </Button>
                        <Button onClick={handleDelete} autoFocus color='secondary'>
                            {T.translate('generic.yes')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        </div>
    );
}