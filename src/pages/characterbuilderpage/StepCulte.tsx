import React from 'react'
import { FormControl, InputLabel, Select, Input, MenuItem, Typography, CardMedia, CardContent } from '@material-ui/core';
import { CULTES, MONEY } from '../../constants';
import { Culte } from '../../models/Data';
import T from 'i18n-react';
import { DonutSmall } from '@material-ui/icons';
import { Character } from '../../models/Character';
import { useStyles } from './styles';

interface Props {
    newCharacter: Character;
    onChange: (event: any) => void;
    buttons: JSX.Element;
}

export default function StepCulte(props: Props) {
    const { newCharacter, onChange, buttons } = props;
    const classes = useStyles();

    return (
        <>
            <Typography className={classes.detailTypo} component='p'>
                {T.translate('create.cultedesc', { who: newCharacter.name })}
            </Typography>
            <FormControl fullWidth margin='dense'>
                <InputLabel shrink htmlFor="culte">
                    {T.translate('generic.culte')}
                </InputLabel>
                <Select
                    input={<Input name="culte" fullWidth />}
                    fullWidth
                    value={isNaN(newCharacter.culte) ? '' : newCharacter.culte}
                    onChange={onChange}
                >
                    <MenuItem value={''}>
                        {T.translate('generic.none')}
                    </MenuItem>
                    {CULTES.map((culte: Culte, key: number) => (
                        <MenuItem key={key} value={key}>
                            {T.translate('cultes.' + culte.name)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {typeof newCharacter.culte === 'number' && <div className={classes.cContainer}>
                <CardMedia
                    image={"images/cultes/" + CULTES[newCharacter.culte].img}
                    title={CULTES[newCharacter.culte].name}
                    className={classes.cardMedia}
                />
                <CardContent>
                    <Typography variant='body2' component='p' className={classes.bottomP}>
                        {T.translate('cultes.' + CULTES[newCharacter.culte].desc)}
                    </Typography>
                    <Typography variant='body2' className={classes.money}>
                        <DonutSmall fontSize='small' />
                        {T.translate('generic.money', { money: MONEY[newCharacter.culte] * 2 })}
                    </Typography>
                    <Typography variant='body2' component='p' className={classes.topP}>
                        {T.translate('create.bonus.skills')}
                    </Typography>
                    <Typography variant='body2' component='p'>
                        <i>
                            {CULTES[newCharacter.culte].bonus.map((attr) => {
                                return attr.skills.map((skill: string) => (
                                    <Typography key={skill} variant='caption' component='li'>
                                        <i>
                                            {T.translate('skills.' + skill) + ' (' + T.translate('attributes.' + attr.name + '.short') + ')'}
                                        </i>
                                    </Typography>
                                ));
                            })}
                        </i>
                    </Typography>
                </CardContent>
            </div>}
            {buttons}
        </>
    );
}
