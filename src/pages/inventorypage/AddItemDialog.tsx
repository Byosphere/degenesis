import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, DialogContent, DialogContentText, TextField, FormControl, InputLabel, Select, MenuItem, DialogActions, Button, Slider, InputAdornment } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { GROUPS } from '../../constants';
import T from 'i18n-react';
import { Item } from '../../models/Character';
import { Prompt } from 'react-router-dom';
import { useStyles } from './styles';

interface Props {
    open: boolean;
    item?: Item;
    onSave: (item: Item) => void;
    onClose: () => void;
}

export default function AddItemDialog(props: Props) {

    const classes = useStyles();
    const emptyItem = {
        id: 0,
        name: '',
        group: -1,
        desc: '',
        weight: 0,
        tech: 0,
        value: 0
    }
    const [item, setItem] = useState<Item>(props.item || emptyItem);

    function verifyItem(): boolean {
        if (!item.name || item.group < 0) return true;
        return false;
    }

    function onChange(event: React.ChangeEvent<{ name?: string; value: string; }>) {
        let newItem = item;
        newItem[event.target.name] = event.target.value;
        setItem({ ...newItem });
    }

    function onChangeNumber(event: React.ChangeEvent<{ name?: string; value: string; }>) {
        let newItem = item;
        newItem[event.target.name] = parseInt(event.target.value);
        setItem({ ...newItem });
    }

    function actionOnPrompt() {
        props.onClose();
        return false;
    }

    function onChangeSlider(value: number) {
        let newItem = item;
        newItem.weight = value;
        setItem({ ...newItem });
    }

    function getSpecificFields() {
        switch (item.group) {
            case 0:
                return (
                    <section className={classes.formSection}>
                        <TextField
                            name="degats"
                            label={T.translate('inventory.degats')}
                            value={item.degats}
                            onChange={onChange}
                            margin="normal"
                            variant='outlined'
                        />
                        <TextField
                            name="mani"
                            label={T.translate('inventory.maniement')}
                            value={item.mani}
                            onChange={onChangeNumber}
                            margin="normal"
                            variant='outlined'
                            type='number'
                            InputProps={{
                                endAdornment: <InputAdornment position='end'>D</InputAdornment>
                            }}
                        />
                        <TextField
                            name="range"
                            label={T.translate('inventory.range')}
                            value={item.range}
                            onChange={onChangeNumber}
                            margin="normal"
                            variant='outlined'
                            type='number'
                        />
                    </section>
                );
            case 1:
                return (
                    <section className={classes.formSection}>
                        <TextField
                            name="defense"
                            label={T.translate('inventory.defense')}
                            value={item.defense}
                            onChange={onChangeNumber}
                            margin="normal"
                            variant='outlined'
                            type='number'
                        />
                        <TextField
                            name="mani"
                            label={T.translate('inventory.maniement')}
                            value={item.mani}
                            onChange={onChangeNumber}
                            margin="normal"
                            variant='outlined'
                            type='number'
                            InputProps={{
                                endAdornment: <InputAdornment position='end'>D</InputAdornment>
                            }}
                        />
                    </section>
                );
            default:
                return null;
        }
    }

    return (
        <>
            {props.open && <Prompt when={true} message={actionOnPrompt} />}
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="Close">
                        <Close />
                    </IconButton>
                    <Typography variant="h6">
                        {T.translate('inventory.additem')}
                    </Typography>
                </Toolbar>
            </AppBar>
            <DialogContent className={classes.dialogContent}>
                <DialogContentText>{T.translate('inventory.additemdesc')}</DialogContentText>
                <TextField
                    name="name"
                    label={T.translate('inventory.name')}
                    value={item.name}
                    onChange={onChange}
                    margin="normal"
                    fullWidth
                    variant='outlined'
                />
                <FormControl fullWidth margin='normal' variant='outlined'>
                    <InputLabel variant='outlined' htmlFor="group">{T.translate('inventory.type')}</InputLabel>
                    <Select
                        name='group'
                        fullWidth
                        label={T.translate('inventory.type')}
                        value={item.group}
                        onChange={onChange}
                        variant='outlined'
                    >
                        <MenuItem value={-1}>
                            {T.translate('generic.none')}
                        </MenuItem>
                        {GROUPS.map((group: string, key) => (
                            <MenuItem key={key} value={key}>
                                {T.translate('inventory.' + group)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    name="value"
                    label={T.translate('inventory.cost')}
                    value={item.value || ''}
                    onChange={onChangeNumber}
                    margin="normal"
                    fullWidth
                    variant='outlined'
                    type='number'
                    InputProps={{
                        endAdornment: <InputAdornment position='end'>{T.translate('inventory.value')}</InputAdornment>
                    }}
                />
                <FormControl className={classes.slider} fullWidth margin='normal' variant='outlined'>
                    <Typography variant='caption'>{T.translate('inventory.weight')}</Typography>
                    <Slider
                        name='weight'
                        value={item.weight}
                        valueLabelDisplay="auto"
                        step={1}
                        marks={[0, 1, 2, 3, 4, 5, 6].map((i) => ({ value: i, label: i }))}
                        min={0}
                        max={6}
                        onChange={(event, value: number) => onChangeSlider(value)}
                    />
                </FormControl>
                {getSpecificFields()}
                <TextField
                    name="desc"
                    label={T.translate('inventory.desc')}
                    value={item.desc}
                    onChange={onChange}
                    margin="normal"
                    fullWidth
                    multiline
                    className={classes.fullHeight}
                    variant='outlined'
                />
            </DialogContent>
            <DialogActions>
                <Button color='primary' onClick={props.onClose}>{T.translate('generic.cancel')}</Button>
                <Button color='secondary' disabled={verifyItem()} onClick={() => props.onSave(item)}>{T.translate('generic.save')}</Button>
            </DialogActions>
        </>
    );
}