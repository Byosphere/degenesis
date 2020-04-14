import React from 'react'
import { FormControl, InputLabel, Select, Input, MenuItem, Typography, CardContent } from '@material-ui/core';
import { CONCEPTS } from '../../constants';
import { Concept } from '../../models/Data';
import T from 'i18n-react';
import { Character } from '../../models/Character';
import { useStyles } from './styles';

interface Props {
    newCharacter: Character;
    onChange: (event: any) => void;
    buttons: JSX.Element;
}

export default function StepConcept(props: Props) {

    const { newCharacter, onChange, buttons } = props;
    const classes = useStyles();
    let skills = [];

    return (
        <>
            <Typography className={classes.detailTypo} component='p'>
                {T.translate('create.conceptdesc', { who: newCharacter.name })}
            </Typography>
            <FormControl fullWidth margin='dense'>
                <InputLabel shrink htmlFor="concept">
                    {T.translate('generic.concept')}
                </InputLabel>
                <Select
                    input={<Input name="concept" fullWidth />}
                    fullWidth
                    value={isNaN(newCharacter.concept) ? '' : newCharacter.concept}
                    onChange={onChange}
                >
                    <MenuItem value={''}>
                        {T.translate('generic.none')}
                    </MenuItem>
                    {CONCEPTS.map((concept: Concept, key) => (
                        <MenuItem key={key} value={key}>
                            {T.translate('concepts.' + concept.name)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {typeof newCharacter.concept === 'number' && <CardContent>
                <Typography variant='body2' component='p' className={classes.bottomP}>
                    {T.translate('concepts.' + CONCEPTS[newCharacter.concept].desc)}
                </Typography>
                <Typography variant='body2' component='p'>
                    {T.translate('create.bonus.attributes')}
                </Typography>
                <Typography variant='body2' component='p'>
                    <i>{CONCEPTS[newCharacter.concept].bonus.map((attr) => {
                        attr.skills.forEach((skill: string) => {
                            skills.push(
                                <Typography key={skill} variant='caption' component='li'>
                                    <i>
                                        {T.translate('skills.' + skill) + ' (' + T.translate('attributes.' + attr.name + '.short') + ')'}
                                    </i>
                                </Typography>
                            );
                        });
                        return attr.bonusAttribute ? T.translate('attributes.' + attr.name + '.name') + ' ' : null;
                    })}
                    </i>
                </Typography>
                <Typography variant='body2' component='p' className={classes.topP}>
                    {T.translate('create.bonus.skills')}
                </Typography>
                <ul className={classes.skills}>
                    {skills}
                </ul>
            </CardContent>}
            {buttons}
        </>
    );
}