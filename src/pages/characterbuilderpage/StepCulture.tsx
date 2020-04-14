import React from 'react'
import { FormControl, InputLabel, Select, Input, MenuItem, Grid, Typography, CardMedia } from '@material-ui/core';
import { CULTURES } from '../../constants';
import { Culture } from '../../models/Data';
import T from 'i18n-react';
import { Character } from '../../models/Character';
import { useStyles } from './styles';

interface Props {
    newCharacter: Character;
    onChange: (event: any) => void;
    buttons: JSX.Element;
}

export default function StepCulture(props: Props) {

    const { newCharacter, onChange, buttons } = props;
    const classes = useStyles();
    let skills = [];

    return (
        <>
            <Typography className={classes.detailTypo} component='p'>
                {T.translate('create.culturedesc', { who: newCharacter.name })}
            </Typography>
            <FormControl fullWidth margin='dense'>
                <InputLabel shrink htmlFor="culture">
                    {T.translate('generic.culture')}
                </InputLabel>
                <Select
                    input={<Input name="culture" fullWidth />}
                    fullWidth
                    value={isNaN(newCharacter.culture) ? '' : newCharacter.culture}
                    onChange={onChange}
                >
                    <MenuItem value={''}>
                        {T.translate('generic.none')}
                    </MenuItem>
                    {CULTURES.map((culture: Culture, key) => (
                        <MenuItem key={key} value={key}>
                            {T.translate('cultures.' + culture.name)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {
                typeof newCharacter.culture === 'number' && <div className={classes.cContainer}>
                    <Typography variant="button">
                        {T.translate('cultures.' + CULTURES[newCharacter.culture].name)}
                    </Typography>
                    <Typography variant='body2' component='p' className={classes.bottomP}>
                        {T.translate('cultures.' + CULTURES[newCharacter.culture].desc)}
                    </Typography>
                    <Grid container spacing={2} alignItems='center'>
                        <Grid item xs={6}>
                            <Typography variant='body2' component='p'>
                                {T.translate('create.bonus.attributes')}
                            </Typography>
                            <Typography variant='body2' component='p'>
                                <i>{CULTURES[newCharacter.culture].bonus.map((attr) => {
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
                        </Grid>
                        <Grid item xs={6}>
                            <CardMedia
                                image={"images/cultures/" + CULTURES[newCharacter.culture].img}
                                title={CULTURES[newCharacter.culture].name}
                                className={classes.cardMedia}
                            />
                        </Grid>
                    </Grid>
                </div>
            }
            {buttons}
        </>
    );
}
