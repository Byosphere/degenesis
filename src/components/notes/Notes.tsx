import React, { Component } from 'react';
import Character from '../../models/Character';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { Card, CardContent, TextField, MobileStepper, Button, CardActions } from '@material-ui/core';
import T from 'i18n-react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import Navigator from '../navigator/Navigator';

interface ownProps {
    characters: Character[];
    onCharChange: (char: Character, save: boolean) => void;
    setHeader: (title: string) => void;
}

type Props = ownProps & RouteComponentProps;

interface State {
    activeStep: number;
    character: Character;
}

export default class Notes extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        let params: any = this.props.match.params;

        this.state = {
            activeStep: 0,
            character: this.props.characters.find(c => c.id === parseInt(params.id))
        }
    }

    public componentDidMount() {
        this.props.setHeader(T.translate('navigator.notes') as string);
    }

    public handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        let char = this.state.character;
        char.notes[this.state.activeStep] = event.target.value;

        this.props.onCharChange(char, false);
    }

    public handleSave = () => {
        this.props.onCharChange(this.state.character, true);
    }

    public render() {
        const { activeStep } = this.state;

        if (!this.state.character) return <Redirect to="/" />;

        const notes = this.state.character.notes;

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
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={notes[activeStep] ? notes[activeStep] : ''}
                            onChange={this.handleChange}
                        />
                    </CardContent>
                    <CardActions >
                        <Button disabled={activeStep === 5} onClick={this.handleSave}>
                            {T.translate('generic.save')}
                        </Button>
                    </CardActions>
                </Card>
                <Navigator />
            </div>
        );
    }
}
