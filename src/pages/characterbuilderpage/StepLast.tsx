import React from 'react'
import T from 'i18n-react';
import { TextField } from '@material-ui/core';
import { Character } from '../../models/Character';
import { getBlessuresMax, getEgoMax, getSporulationMax, getTraumaMax } from '../../utils/characterTools';
import { useStyles } from './styles';

interface Props {
    newCharacter: Character;
    onChange: (event: any) => void;
    buttons: JSX.Element;
}

export default function StepLast(props: Props) {

    const { newCharacter, onChange, buttons } = props;
    const classes = useStyles();

    return (
        <>
            <div className={classes.containerLast}>
                <TextField
                    label={T.translate('generic.blessures')}
                    margin="dense"
                    type='text'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={getBlessuresMax(newCharacter)}
                    disabled
                />
                <TextField
                    label={T.translate('generic.ego')}
                    margin="dense"
                    type='text'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={getEgoMax(newCharacter)}
                    disabled
                />
            </div>
            <div className={classes.containerLast}>
                <TextField
                    label={T.translate('generic.sporulation')}
                    margin="dense"
                    type='text'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={getSporulationMax(newCharacter)}
                    disabled
                />
                <TextField
                    label={T.translate('generic.trauma')}
                    margin="dense"
                    type='text'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={getTraumaMax(newCharacter)}
                    disabled
                />
            </div>
            <TextField
                name="story"
                label={T.translate('generic.story')}
                margin="dense"
                type='text'
                InputLabelProps={{
                    shrink: true,
                }}
                multiline
                fullWidth
                rows={15}
                maxRows={30}
                value={newCharacter.story}
                onChange={onChange}
            />
            {buttons}
        </>
    );
}