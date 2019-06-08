import React, { Component } from 'react'
import Character from '../../models/Character';
import { FormControl, InputLabel, Select, Input, MenuItem, Grid, Typography, CardMedia } from '@material-ui/core';
import { CULTURES } from '../../constants';
import { Culture } from '../../models/Data';
import T from 'i18n-react';

interface Props {
    newCharacter: Character;
    onChange: (event: any) => void;
    buttons: JSX.Element;
}

export default class StepCulture extends Component<Props, {}> {
    public render() {

        const { newCharacter, onChange, buttons } = this.props;
        let skills = [];

        return (
            <React.Fragment>
                <Typography style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '10px' }} component='p'>
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
                {typeof newCharacter.culture === 'number' && <div style={{ margin: '16px 0' }}>
                    <Grid container spacing={2} alignItems='center'>
                        <Grid item xs={6}>
                            <Typography variant="button">
                                {T.translate('cultures.' + CULTURES[newCharacter.culture].name)}
                            </Typography>
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
                            <Typography variant='body2' component='p' style={{ marginTop: '5px' }}>
                                {T.translate('create.bonus.skills')}
                            </Typography>
                            <ul style={{ margin: 0, paddingLeft: '15px' }}>
                                {skills}
                            </ul>
                        </Grid>
                        <Grid item xs={6}>
                            <CardMedia
                                image={"images/cultures/" + CULTURES[newCharacter.culture].name + ".jpg"}
                                title={CULTURES[newCharacter.culture].name}
                                style={{ height: '100px' }}
                            />
                        </Grid>
                    </Grid>
                </div>}
                {buttons}
            </React.Fragment>
        )
    }
}
