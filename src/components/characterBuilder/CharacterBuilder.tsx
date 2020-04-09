import React, { useState, useContext, useEffect } from 'react'
import { Card, Stepper, Step, StepLabel, StepContent, Button, Chip } from '@material-ui/core';
import Character, { Attribute, Skill } from '../../models/Character';
import { useHistory } from 'react-router-dom';
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
import { HeaderContext } from '../../App';

interface Props {
    onCreateCharacter: (char: Character) => void;
}

export default function CharacterBuilder(props: Props) {

    const [step, setStep] = useState<number>(0);
    const [character, setCharacter] = useState<Character>(new Character());
    const [attributePoints, setAttributePoints] = useState<number>(BASE_ATTRIBUTES);
    const [skillPoints, setSkillPoints] = useState<number>(BASE_SKILLS);
    const { setHeaderTitle } = useContext(HeaderContext);
    const history = useHistory();

    useEffect(() => {
        setHeaderTitle(T.translate('navigator.create') as string);
    }, [setHeaderTitle]);

    function handleSelectAttribute(field: string, value: string) {
        let newCharacter: Character = character.clone();
        newCharacter[field] = value;
        setCharacter(newCharacter);
    }

    function handleCreate() {
        let newCharacter = character.clone();
        newCharacter.money = MONEY[newCharacter.culte] * 2;
        props.onCreateCharacter(newCharacter);
        history.push('/');
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
        let newCharacter: Character = character.clone();
        let attrPoints = attributePoints;
        let skPoints = skillPoints;
        let attribute = newCharacter.attributes[attributeId];

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
        setCharacter(newCharacter);
        setAttributePoints(attrPoints);
        setSkillPoints(skPoints);
    }

    function handleReset() {
        let newCharacter = character.clone();
        newCharacter.attributes.forEach((attribute: Attribute) => {
            attribute.skills.forEach((skill: Skill) => {
                skill.value = 0;
            });
        });
        setCharacter(newCharacter);
        setSkillPoints(BASE_SKILLS);
    }

    function displayControls(disableNext: boolean, enablePrev: boolean, isLast?: boolean): JSX.Element {
        return (
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                {enablePrev && <Button
                    style={{ marginTop: '16px' }}
                    color='primary'
                    onClick={() => setStep(step - 1)}
                >
                    {T.translate('generic.prev')}
                </Button>}
                <Button
                    style={{ marginTop: '16px' }}
                    variant='contained'
                    color='secondary'
                    onClick={isLast ? handleCreate : () => setStep(step + 1)}
                    disabled={disableNext}
                >
                    {isLast ? T.translate('generic.create') : T.translate('generic.next')}
                </Button>
            </div>
        );
    }

    function handleToggle(id: number, type: number) {
        let newCharacter: any = character.clone();
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
        setCharacter(newCharacter);
    }

    function handleChange(event: any) {
        let newCharacter: any = character.clone();
        newCharacter[event.target.name] = event.target.value;
        setCharacter(newCharacter);
    }

    return (
        <div style={{ margin: '5px', flex: 1 }}>
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
    );
}