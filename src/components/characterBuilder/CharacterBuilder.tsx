import React, { Component } from 'react'
import { Card, Stepper, Step, StepLabel, StepContent, Typography, Button, Chip } from '@material-ui/core';
import Character from '../../models/Character';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import T from 'i18n-react';
import { CULTURES, CULTES, CONCEPTS, MONEY, BASE_SKILLS, BASE_ATTRIBUTES } from '../../constants';
import { Done } from '@material-ui/icons';
import StepWho from './StepWho';
import StepCulture from './StepCulture';
import StepCulte from './StepCulte';
import StepConcept from './StepConcept';
import StepAttributes from './StepAttributes';
import StepSkills from './StepSkills';
import StepBelief from './StepBelief';
import StepPotentials from './StepPotentials';
import StepLast from './StepLast';

interface OwnProps {
    characters: Character[];
    createCharacter: (char: Character) => void;
    setHeader: (title: string) => void;
}

type Props = OwnProps & RouteComponentProps;

interface State {
    activeStep: number;
    newCharacter: any;
    attributePoints: number;
    skillPoints: number;
}

export default class CharacterBuilder extends Component<Props, State> {

    public constructor(props: Props) {
        super(props);

        this.state = {
            activeStep: 0,
            newCharacter: new Character(),
            attributePoints: BASE_ATTRIBUTES,
            skillPoints: BASE_SKILLS
        };
    }

    public componentDidMount() {
        this.props.setHeader(T.translate('generic.charactercreate') as string);
    }

    public handleChange = (event: any) => {
        let newCharacter: any = this.state.newCharacter;
        newCharacter[event.target.name] = event.target.value;
        this.setState({ newCharacter });
    }

    public handleNext = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({ activeStep: this.state.activeStep + 1 });
    }

    public handlePrev = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({ activeStep: this.state.activeStep - 1 });
    }

    public handleCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
        let character = this.state.newCharacter;
        character.money = MONEY[character.culte] * 2;
        this.props.createCharacter(character);
        this.props.history.push('/');
    }

    public handleReset = () => {
        // TODO
    }

    public handleAttributeChange = (attributeId: number, skillId: number, value: number) => {
        let character: Character = this.state.newCharacter;
        let attributePoints = this.state.attributePoints;
        let skillPoints = this.state.skillPoints;
        let attribute = character.attributes[attributeId];

        if (isNaN(skillId)) {
            let remainingValue = attributePoints + attribute.base - value;
            if (remainingValue >= 0) {
                attributePoints = remainingValue;
                attribute.base = value;
            }
        } else {
            let remainingValue = skillPoints + attribute.skills[skillId].value - value;
            if (remainingValue >= 0) {
                skillPoints = remainingValue;
                attribute.skills[skillId].value = value;
            }
        }

        this.setState({ newCharacter: character, attributePoints, skillPoints });
    }

    public handleToggle = (id: number, type: number) => {
        let newCharacter: any = this.state.newCharacter;
        let index = newCharacter.potentials.findIndex(p => p.id === id && p.type === type);
        if (index === -1 && newCharacter.potentials.length !== 2) {
            newCharacter.potentials.push({
                id,
                type,
                level: 1
            });
        } else if (index !== -1) {
            newCharacter.potentials.splice(index, 1);
        }
        this.setState({ newCharacter });
    }

    public handleSelectAttribute = (field: string, value: string) => {
        let newCharacter: any = this.state.newCharacter;
        newCharacter[field] = value;
        this.setState({ newCharacter });
    }

    public render() {

        const { activeStep, newCharacter, attributePoints, skillPoints } = this.state;

        return (
            <div style={{ margin: '5px', flex: 1 }}>
                <Card style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: 'auto', minHeight: 'calc(100% - 46px)' }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        <Step>
                            {this.displayLabel(T.translate('create.who').toString(), newCharacter.name, 0)}
                            <StepContent>
                                <StepWho
                                    newCharacter={newCharacter}
                                    onChange={this.handleChange}
                                    buttons={this.displayControls(
                                        !newCharacter.name ||
                                        !newCharacter.age ||
                                        !newCharacter.sex ||
                                        !newCharacter.weight ||
                                        !newCharacter.size,
                                        false
                                    )}
                                />
                            </StepContent>
                        </Step>
                        <Step>
                            {this.displayLabel(
                                T.translate('create.culture.title').toString(),
                                (typeof newCharacter.culture === 'number') ?
                                    T.translate('cultures.' + CULTURES[newCharacter.culture].name).toString() : '',
                                1
                            )}
                            <StepContent>
                                <StepCulture
                                    newCharacter={newCharacter}
                                    onChange={this.handleChange}
                                    buttons={this.displayControls(typeof newCharacter.culture !== 'number', true)}
                                />
                            </StepContent>
                        </Step>
                        <Step>
                            {this.displayLabel(
                                T.translate('create.culte.title').toString(),
                                (typeof newCharacter.culte === 'number') ?
                                    T.translate('cultes.' + CULTES[newCharacter.culte].name).toString() : '',
                                2
                            )}
                            <StepContent>
                                <StepCulte
                                    newCharacter={newCharacter}
                                    onChange={this.handleChange}
                                    buttons={this.displayControls(typeof newCharacter.culte !== 'number', true)}
                                />
                            </StepContent>
                        </Step>
                        <Step>
                            {this.displayLabel(
                                T.translate('create.concept.title').toString(),
                                (typeof newCharacter.concept === 'number') ?
                                    T.translate('concepts.' + CONCEPTS[newCharacter.concept].name).toString() : '',
                                3
                            )}
                            <StepContent>
                                <StepConcept
                                    newCharacter={newCharacter}
                                    onChange={this.handleChange}
                                    buttons={this.displayControls(typeof newCharacter.concept !== 'number', true)}
                                />
                            </StepContent>
                        </Step>
                        <Step>
                            {this.displayLabel(
                                T.translate('create.attributes').toString(),
                                T.translate('skills.' + newCharacter.belief) + ' | ' + T.translate('skills.' + newCharacter.behavior),
                                4
                            )}
                            <StepContent>
                                <StepBelief
                                    newCharacter={newCharacter}
                                    onChange={this.handleSelectAttribute}
                                    buttons={this.displayControls(!newCharacter.behavior || !newCharacter.belief, true)}
                                />
                            </StepContent>
                        </Step>
                        <Step>
                            {this.displayLabel(
                                T.translate('create.selectattributes').toString(),
                                T.translate('create.selectedattributes').toString(),
                                5
                            )}
                            <StepContent>
                                <StepAttributes
                                    newCharacter={newCharacter}
                                    attributePoints={attributePoints}
                                    onChange={this.handleAttributeChange}
                                    buttons={this.displayControls(attributePoints !== 0, true)}
                                />
                            </StepContent>
                        </Step>
                        <Step>
                            {this.displayLabel(
                                T.translate('create.selectskills').toString(),
                                T.translate('create.selectedskills').toString(),
                                6
                            )}
                            <StepContent>
                                <StepSkills
                                    newCharacter={newCharacter}
                                    skillPoints={skillPoints}
                                    onChange={this.handleAttributeChange}
                                    buttons={this.displayControls(skillPoints !== 0, true)}
                                    onReset={this.handleReset}
                                />
                            </StepContent>
                        </Step>
                        <Step>
                            {this.displayLabel(
                                T.translate('create.potentials').toString(),
                                T.translate('generic.selectedpotentials').toString(),
                                7
                            )}
                            {newCharacter.culte && <StepContent>
                                <StepPotentials
                                    newCharacter={newCharacter}
                                    onToggle={this.handleToggle}
                                    buttons={this.displayControls(!newCharacter.potentials || newCharacter.potentials.length !== 2, true)}
                                />
                            </StepContent>}
                        </Step>
                        <Step>
                            <StepLabel>{T.translate('create.lasttouch')}</StepLabel>
                            <StepContent>
                                <StepLast
                                    newCharacter={newCharacter}
                                    onChange={this.handleChange}
                                    buttons={this.displayControls(false, true, true)}
                                />
                            </StepContent>
                        </Step>
                    </Stepper>
                </Card>
            </div>
        );
    }

    private displayLabel(title: string, validElement: string, currentStep: number): JSX.Element {
        return (
            <StepLabel classes={{ labelContainer: 'create-step-label' }}>
                {title}
                {this.state.activeStep >= currentStep + 1 &&
                    <Chip
                        label={validElement}
                        color="secondary"
                        icon={<Done />}
                    />}
            </StepLabel>
        );
    }

    private displayControls(disableNext: boolean, enablePrev: boolean, isLast?: boolean): JSX.Element {
        return (
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                {enablePrev && <Button
                    style={{ marginTop: '16px' }}
                    color='primary'
                    onClick={this.handlePrev}
                >
                    {T.translate('generic.prev')}
                </Button>}
                <Button
                    style={{ marginTop: '16px' }}
                    variant='contained'
                    color='secondary'
                    onClick={isLast ? this.handleCreate : this.handleNext}
                    disabled={disableNext}
                >
                    {isLast ? T.translate('generic.create') : T.translate('generic.next')}
                </Button>
            </div>
        );
    }
}
