import React, { useState } from 'react';
import { DialogTitle, DialogContent, RadioGroup, FormControlLabel, Radio, TextField, InputAdornment, DialogActions, Button } from '@material-ui/core';
import { DonutSmall } from '@material-ui/icons';
import T from 'i18n-react';
import { Prompt } from 'react-router-dom';

interface Props {
    money: number;
    onClose: () => void;
    onValidate: (value: number) => void;
}

export default function MoneyDialog(props: Props) {

    const [radioValue, setRadioValue] = useState<string>('add');
    const [value, setValue] = useState<string>('');

    function changeMoney() {
        let newMoneyValue = 0;
        let valueNumber = parseInt(value, 10) || 0;
        if (radioValue === 'add') {
            newMoneyValue = props.money + valueNumber;
        } else {
            newMoneyValue = props.money - valueNumber;
            if (newMoneyValue < 0) newMoneyValue = 0;
        }
        props.onValidate(newMoneyValue);
    }

    function actionOnPrompt() {
        props.onClose();
        return false;
    }

    return (
        <>
            <Prompt when={true} message={actionOnPrompt} />
            <DialogTitle id="form-dialog-title">{T.translate('inventory.moneyedit')}</DialogTitle>
            <DialogContent>
                <RadioGroup
                    aria-label="add_remove"
                    value={radioValue}
                    onChange={(event, value) => setRadioValue(value)}
                    name="add_remove"
                    row
                >
                    <FormControlLabel
                        value="add"
                        control={<Radio color="primary" />}
                        label={T.translate('generic.add')}
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="remove"
                        control={<Radio color="primary" />}
                        label={T.translate('generic.remove')}
                        labelPlacement="start"
                    />
                </RadioGroup>
                <TextField
                    id="money-number"
                    label="Valeur"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin='normal'
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <DonutSmall fontSize='small' />
                        </InputAdornment>,
                        endAdornment: <InputAdornment position="end">{T.translate('generic.ldc')}</InputAdornment>,
                        inputProps: {
                            min: '0'
                        }
                    }}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.onClose()} color="primary">
                    {T.translate('generic.cancel')}
                </Button>
                <Button onClick={changeMoney} color="secondary">
                    {T.translate('generic.validate')}
                </Button>
            </DialogActions>
        </>
    );
}