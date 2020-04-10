import React, { useState } from 'react';
import { DialogTitle, DialogContent, RadioGroup, FormControlLabel, Radio, TextField, InputAdornment, DialogActions, Button } from '@material-ui/core';
import { DonutSmall } from '@material-ui/icons';
import T from 'i18n-react';

interface Props {
    money: number;
    onClose: () => void;
    onValidate: (value: number) => void;
}

export default function MoneyDialog(props: Props) {

    const [radioValue, setRadioValue] = useState<string>('add');
    const [value, setValue] = useState<number>(0);

    function changeMoney() {
        let newMoneyValue = 0;
        if (radioValue === 'add') {
            newMoneyValue = props.money + value;
        } else {
            newMoneyValue = props.money - value;
            if (newMoneyValue < 0) newMoneyValue = 0;
        }
        props.onValidate(newMoneyValue);
    }

    return (
        <>
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
                    onChange={(event) => setValue(parseInt(event.target.value, 10) || 0)}
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