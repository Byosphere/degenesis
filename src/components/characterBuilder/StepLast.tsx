import React from 'react'
import T from 'i18n-react';
import { TextField } from '@material-ui/core';
import { Character } from '../../models/Character';

interface Props {
    newCharacter: Character;
    onChange: (event: any) => void;
    buttons: JSX.Element;
}

export default function StepLast(props: Props) {

    const { newCharacter, onChange, buttons } = this.props;

    return (
        <>
            <div style={{ display: 'flex' }}>
                <TextField
                    label={T.translate('generic.blessures')}
                    margin="dense"
                    type='text'
                    style={{ flex: 1, marginRight: '8px' }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={newCharacter.blessuresMax}
                    disabled
                />
                <TextField
                    label={T.translate('generic.ego')}
                    margin="dense"
                    type='text'
                    style={{ flex: 1, marginLeft: '8px' }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={newCharacter.egoMax}
                    disabled
                />
            </div>
            <div style={{ display: 'flex' }}>
                <TextField
                    label={T.translate('generic.sporulation')}
                    margin="dense"
                    type='text'
                    style={{ flex: 1, marginRight: '8px' }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={newCharacter.sporulationMax}
                    disabled
                />
                <TextField
                    label={T.translate('generic.trauma')}
                    margin="dense"
                    type='text'
                    style={{ flex: 1, marginLeft: '8px' }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={newCharacter.traumaMax}
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
                rowsMax={30}
                value={newCharacter.story}
                onChange={onChange}
            />
            {buttons}
        </>
    );
}