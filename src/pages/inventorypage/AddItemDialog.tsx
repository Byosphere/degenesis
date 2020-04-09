import React, { useState } from 'react';
import { Dialog, AppBar, Toolbar, IconButton, Typography, DialogContent, DialogContentText, TextField, FormControl, InputLabel, Select, Input, MenuItem, DialogActions, Button, Slide } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { TYPES } from '../../constants';
import T from 'i18n-react';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { Item } from '../../models/Character';

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (item: Item) => void;
}

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(p, ref) {
    return <Slide direction="up" ref={ref} {...p} />;
});

export default function AddItemDialog(props: Props) {

    const { open, onClose } = props;
    const [item, setItem] = useState<Item>({
        id: 0,
        name: '',
        type: 0,
        desc: '',
        weight: 0,
        tech: 0
    });

    function verifyItem(): boolean {
        if (!item.name || !item.desc || !item.weight) return true;
        return false;
    }

    function onChange(event: React.ChangeEvent<{ name?: string; value: unknown; }>) {
        let newItem = item;
        newItem[event.target.name] = event.target.name === 'weight' ? parseInt(event.target.value as string) : event.target.value;
        setItem({ ...newItem });
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen
            TransitionComponent={Transition}
        >
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={onClose} aria-label="Close">
                        <Close />
                    </IconButton>
                    <Typography variant="h6">
                        {T.translate('inventory.additem')}
                    </Typography>
                </Toolbar>
            </AppBar>

            <DialogContent style={{ marginTop: '56px' }}>
                <DialogContentText>{T.translate('inventory.additemdesc')}</DialogContentText>
                <TextField
                    name="name"
                    label={T.translate('inventory.name')}
                    value={item.name}
                    onChange={onChange}
                    margin="normal"
                    fullWidth
                />
                <FormControl fullWidth margin='normal'>
                    <InputLabel htmlFor="type">{T.translate('inventory.type')}</InputLabel>
                    <Select
                        input={<Input name="type" fullWidth />}
                        fullWidth
                        value={item.type}
                        onChange={onChange}
                    >
                        {TYPES.map((type: string, key) => (
                            <MenuItem key={key} value={key}>
                                {T.translate('inventory.' + type)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    name="weight"
                    label={T.translate('inventory.weight')}
                    value={item.weight}
                    onChange={onChange}
                    type='number'
                    margin="normal"
                    fullWidth
                />
                <TextField
                    name="desc"
                    label={T.translate('inventory.desc')}
                    value={item.desc}
                    onChange={onChange}
                    margin="normal"
                    fullWidth
                    multiline
                    rows={10}
                />
            </DialogContent>
            <DialogActions>
                <Button color='primary' onClick={onClose}>{T.translate('generic.cancel')}</Button>
                <Button color='secondary' disabled={verifyItem()} onClick={() => props.onSave(item)}>{T.translate('generic.add')}</Button>
            </DialogActions>
        </Dialog>
    );
}