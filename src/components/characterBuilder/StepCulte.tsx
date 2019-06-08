import React, { Component } from 'react'
import Character from '../../models/Character';
import { FormControl, InputLabel, Select, Input, MenuItem, Typography, CardMedia, CardContent } from '@material-ui/core';
import { CULTES, MONEY } from '../../constants';
import { Culte } from '../../models/Data';
import T from 'i18n-react';
import { DonutSmall } from '@material-ui/icons';

interface Props {
    newCharacter: Character;
    onChange: (event: any) => void;
    buttons: JSX.Element;
}

export default class StepCulte extends Component<Props, {}> {
    public render() {

        const { newCharacter, onChange, buttons } = this.props;

        return (
            <React.Fragment>
                <Typography style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '10px' }} component='p'>
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
                {typeof newCharacter.culte === 'number' && <div style={{ margin: '16px 0' }}>
                    <CardMedia
                        image={"images/cultes/" + CULTES[newCharacter.culte].name + ".jpg"}
                        title={CULTES[newCharacter.culte].name}
                        style={{ height: '100px' }}
                    />
                    <CardContent>
                        <Typography variant='body2' style={{ display: 'flex', alignItems: 'center', fontStyle: 'italic' }}>
                            <DonutSmall fontSize='small' style={{ marginRight: '5px' }} />
                            {T.translate('generic.money', { money: MONEY[newCharacter.culte] * 2 })}
                        </Typography>
                        <Typography variant='body2' component='p' style={{ marginTop: '5px' }}>
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
            </React.Fragment>
        )
    }
}
