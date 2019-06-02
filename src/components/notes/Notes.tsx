import React, { Component } from 'react';
import Character from '../../models/Character';
import { RouteComponentProps } from 'react-router-dom';
import { Card, CardContent, TextField, MobileStepper, Button, CardActions } from '@material-ui/core';
import T from 'i18n-react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

interface ownProps {
    char: Character;
    onTabChange: (value: any) => void;
    tab: number;
}

type Props = ownProps & RouteComponentProps;

interface State {
    activeStep: number;
}

export default class Notes extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            activeStep: 0
        }
    }

    public render() {
        const { char, tab } = this.props;
        const { activeStep } = this.state;
        const notes = char.notes;

        return (
            <Card style={{
                height: 'calc(100% - 10px',
                margin: '5px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <MobileStepper
                    variant="dots"
                    position='static'
                    steps={notes.length}
                    activeStep={activeStep}
                    nextButton={
                        <Button size="small" disabled={activeStep === notes.length - 1}>
                            {T.translate('generic.next')}
                            <KeyboardArrowRight />
                        </Button>
                    }
                    backButton={
                        <Button size="small" disabled={activeStep === 0}>
                            <KeyboardArrowLeft />
                            {T.translate('generic.prev')}
                        </Button>
                    }
                />
                <CardContent style={{ flex: '1', paddingTop: '0px' }}>
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
                        disabled={tab === 0}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={notes[activeStep].text}
                    />
                </CardContent>
                <CardActions >
                    {tab === 1 && <Button disabled={activeStep === 5}>
                        {T.translate('generic.save')}
                    </Button>}
                </CardActions>
            </Card>
        );
    }
}
