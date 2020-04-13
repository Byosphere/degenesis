import React, { useState } from 'react'
import { Card, Stepper, Step, StepLabel, StepContent, Button, Chip, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Attribute, Skill, Character } from '../../models/Character';
import { useHistory } from 'react-router-dom';
import T from 'i18n-react';
import { CULTURES, CULTES, CONCEPTS, MONEY, BASE_SKILLS, BASE_ATTRIBUTES } from '../../constants';
import { Done, ArrowBack } from '@material-ui/icons';
import StepWho from './StepWho';
import StepCulture from './StepCulture';
import StepCulte from './StepCulte';
import StepConcept from './StepConcept';
import StepAttributes from './StepAttributes';
import StepSkills from './StepSkills';
import StepBelief from './StepBelief';
import StepPotentials from './StepPotentials';
import StepLast from './StepLast';
import { getNewCharacter, updateAttributes } from '../../utils/characterTools';

interface Props {
    onCreateCharacter: (char: Character) => void;
}

export default function CharacterBuilder(props: Props) {

    const [step, setStep] = useState<number>(0);
    const [character, setCharacter] = useState<Character>(getNewCharacter());
    const [attributePoints, setAttributePoints] = useState<number>(BASE_ATTRIBUTES);
    const [skillPoints, setSkillPoints] = useState<number>(BASE_SKILLS);
    const history = useHistory();

    function handleSelectAttribute(field: string, value: string) {
        setCharacter({ ...character, [field]: value });
    }

    function handleCreate() {
        let char = { ...character, money: MONEY[character.culte] * 2 }
        setCharacter(char);
        props.onCreateCharacter(char);
        history.replace('/');
    }

    function displayLabel(title: any, validElement: any, currentStep: number): JSX.Element {
        return (
            <StepLabel classes={{ labelContainer: 'create-step-label' }}>
                {title}
                {step >= currentStep + 1 &&
                    <Chip label={validElement} color="secondary" icon={<Done />} />}
            </StepLabel>
        );
    }

    function handleAttributeChange(attributeId: number, skillId: number, value: number) {
        let attrPoints = attributePoints;
        let skPoints = skillPoints;
        let attribute = character.attributes[attributeId];

        if (isNaN(skillId)) {
            let remainingValue = attributePoints + attribute.base - value;
            if (remainingValue >= 0) {
                attrPoints = remainingValue;
                attribute.base = value;
            }
        } else {
            let remainingValue = skillPoints + attribute.skills[skillId].value - value;
            if (remainingValue >= 0) {
                skPoints = remainingValue;
                attribute.skills[skillId].value = value;
            }
        }
        setCharacter({ ...character });
        setAttributePoints(attrPoints);
        setSkillPoints(skPoints);
    }

    function handleReset() {
        character.attributes.forEach((attribute: Attribute) => {
            attribute.skills.forEach((skill: Skill) => {
                skill.value = 0;
            });
        });
        setCharacter({ ...character });
        setSkillPoints(BASE_SKILLS);
    }

    function displayControls(disableNext: boolean, enablePrev: boolean, isLast?: boolean): JSX.Element {
        return (
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                {enablePrev && <Button
                    style={{ marginTop: '16px' }}
                    color='primary'
                    onClick={() => onStepChange('backward')}
                >
                    {T.translate('generic.prev')}
                </Button>}
                <Button
                    style={{ marginTop: '16px' }}
                    variant='contained'
                    color='secondary'
                    onClick={isLast ? handleCreate : () => onStepChange('forward')}
                    disabled={disableNext}
                >
                    {isLast ? T.translate('generic.create') : T.translate('generic.next')}
                </Button>
            </div>
        );
    }

    function handleToggle(id: number, group: number) {
        let index = character.potentials.findIndex(p => p.id === id && p.group === group);
        if (index === -1 && character.potentials.length !== 2) {
            character.potentials.push({
                id,
                group,
                level: 1
            });
        } else if (index !== -1) {
            character.potentials.splice(index, 1);
        }
        setCharacter({ ...character });
    }

    function handleChange(event: any) {
        setCharacter({ ...character, [event.target.name]: event.target.value });
    }

    function onStepChange(action: 'forward' | 'backward') {
        const newStep = action === 'forward' ? step + 1 : step - 1;
        if (newStep === 4 && step === 3) {
            updateAttributes(character);
            setCharacter({ ...character });
        }
        if (newStep === 3 && step === 4) {
            character.attributes.forEach((attr: Attribute) => {
                attr.base = 0;
                attr.bonusMax = 0;
                attr.skills.forEach((skill: Skill) => {
                    skill.value = 0;
                });
            });
            setAttributePoints(BASE_ATTRIBUTES);
            setSkillPoints(BASE_SKILLS);
            setCharacter({ ...character });
        }
        setStep(newStep);
    }

    function handleClose() {
        history.replace('/');
    }

    return (
        <>
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                        <ArrowBack />
                    </IconButton>
                    <Typography variant='body1' component='h1'>
                        {T.translate('navigator.create')}
                    </Typography>
                </Toolbar>
            </AppBar>
            <div style={{ margin: '54px 5px 5px 5px', flex: 1 }}>
                <Card style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: 'auto', minHeight: 'calc(100% - 46px)' }}>
                    <Stepper activeStep={step} orientation="vertical">
                        <Step>
                            {displayLabel(T.translate('create.who'), character.name, 0)}
                            <StepContent>
                                <StepWho
                                    newCharacter={character}
                                    onChange={handleChange}
                                    buttons={displayControls(
                                        !character.name ||
                                        !character.age ||
                                        !character.sex ||
                                        !character.weight ||
                                        !character.size,
                                        false
                                    )}
                                />
                            </StepContent>
                        </Step>
                        <Step>
                            {displayLabel(T.translate('create.culture.title'),
                                (typeof character.culture === 'number') ?
                                    T.translate('cultures.' + CULTURES[character.culture].name) : '',
                                1
                            )}
                            <StepContent className='step-culture'>
                                <StepCulture
                                    newCharacter={character}
                                    onChange={handleChange}
                                    buttons={displayControls(typeof character.culture !== 'number', true)}
                                />
                            </StepContent>
                        </Step>
                        <Step>
                            {displayLabel(T.translate('create.culte.title'),
                                (typeof character.culte === 'number') ?
                                    T.translate('cultes.' + CULTES[character.culte].name) : '',
                                2
                            )}
                            <StepContent className='step-culte'>
                                <StepCulte
                                    newCharacter={character}
                                    onChange={handleChange}
                                    buttons={displayControls(typeof character.culte !== 'number', true)}
                                />
                            </StepContent>
                        </Step>
                        <Step>
                            {displayLabel(T.translate('create.concept.title'),
                                (typeof character.concept === 'number') ?
                                    T.translate('concepts.' + CONCEPTS[character.concept].name) : '',
                                3
                            )}
                            <StepContent className='step-concept'>
                                <StepConcept
                                    newCharacter={character}
                                    onChange={handleChange}
                                    buttons={displayControls(typeof character.concept !== 'number', true)}
                                />
                            </StepContent>
                        </Step>
                        <Step>
                            {displayLabel(T.translate('create.attributes'),
                                T.translate('skills.' + character.belief) + ' | ' + T.translate('skills.' + character.behavior),
                                4
                            )}
                            <StepContent>
                                <StepBelief
                                    newCharacter={character}
                                    onChange={handleSelectAttribute}
                                    buttons={displayControls(!character.behavior || !character.belief, true)}
                                />
                            </StepContent>
                        </Step>
                        <Step>
                            {displayLabel(T.translate('create.selectattributes'), T.translate('create.selectedattributes'), 5)}
                            <StepContent>
                                <StepAttributes
                                    newCharacter={character}
                                    attributePoints={attributePoints}
                                    onChange={handleAttributeChange}
                                    buttons={displayControls(attributePoints !== 0, true)}
                                />
                            </StepContent>
                        </Step>
                        <Step>
                            {displayLabel(T.translate('create.selectskills'), T.translate('create.selectedskills'), 6)}
                            <StepContent>
                                <StepSkills
                                    newCharacter={character}
                                    skillPoints={skillPoints}
                                    onChange={handleAttributeChange}
                                    buttons={displayControls(skillPoints !== 0, true)}
                                    onReset={handleReset}
                                />
                            </StepContent>
                        </Step>
                        <Step>
                            {displayLabel(T.translate('create.potentials'), T.translate('generic.selectedpotentials'), 7)}
                            {character.culte && <StepContent>
                                <StepPotentials
                                    newCharacter={character}
                                    onToggle={handleToggle}
                                    buttons={displayControls(!character.potentials || character.potentials.length !== 2, true)}
                                />
                            </StepContent>}
                        </Step>
                        <Step>
                            <StepLabel>{T.translate('create.lasttouch')}</StepLabel>
                            <StepContent>
                                <StepLast
                                    newCharacter={character}
                                    onChange={handleChange}
                                    buttons={displayControls(false, true, true)}
                                />
                            </StepContent>
                        </Step>
                    </Stepper>
                </Card>
            </div>
        </>
    );
}