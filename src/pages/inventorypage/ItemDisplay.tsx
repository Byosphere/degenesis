import React, { useState } from 'react';
import T from 'i18n-react';
import { Item, Character } from '../../models/Character';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Chip, ExpansionPanelActions, Button, Divider, Dialog, DialogTitle, DialogActions, Avatar } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import Empty from '../../components/empty/Empty';
import { useStyles } from './styles';
import { Prompt } from 'react-router-dom';
import { calculateDegats } from '../../utils/characterTools';

interface Props {
    title: string;
    items: Item[];
    char: Character;
    onDelete: (id: number) => void;
    onEdit: (item: Item) => void;
}

export default function ItemDisplay(props: Props) {

    const { items, title, char } = props;
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<Item>(null);

    function handleDelete() {
        setOpen(false);
        props.onDelete(selectedItem.id);
    }

    function openDelete(item: Item) {
        setSelectedItem(item);
        setOpen(true);
    }

    function actionOnPrompt() {
        setOpen(false);
        return false;
    }

    function specificSection(item: Item) {
        switch (item.group) {
            case 0: //arme
                if (!item.degats && !item.range && !item.mani) return null;
                return (
                    <section>
                        {item.degats && <div><Typography variant='caption'>{T.translate('inventory.degats')} : </Typography>{calculateDegats(item.degats, char)}</div>}
                        {item.range && <div><Typography variant='caption'>{T.translate('inventory.range')} : </Typography>{item.range}</div>}
                        {item.mani && <div><Typography variant='caption'>{T.translate('inventory.maniement')} : </Typography>{item.mani}D</div>}
                    </section>
                );
            case 1: //armure
                if (!item.defense && !item.mani) return null;
                return (
                    <section>
                        {item.defense && <div><Typography variant='caption'>{T.translate('inventory.defense')} : </Typography>{item.defense}</div>}
                        {item.mani && <div><Typography variant='caption'>{T.translate('inventory.maniement')} : </Typography>{item.mani}D</div>}
                    </section>
                );
            default:
                return null;
        }
    }

    return (
        <>
            <Chip label={title} className={classes.cardOverTitle} />
            {!items.length && <Empty />}
            {items.map((item, key) => (
                <ExpansionPanel classes={{ root: classes.itemPanel }} key={key} TransitionProps={{ unmountOnExit: true }}>
                    <ExpansionPanelSummary expandIcon={<ExpandMore />} classes={{ content: classes.expansionPanel }}>
                        <Avatar classes={{ root: classes.miniAvatar }}>{item.weight}</Avatar>
                        <Typography>{item.name}</Typography>
                        {!!item.value && <Chip label={T.translate('inventory.value', { value: Intl.NumberFormat().format(item.value) })} className={classes.valueChip} />}
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <section>
                            <Typography variant='caption' component='p'>{T.translate('inventory.desc')} :</Typography>
                            <Typography variant='body2'>
                                {item.desc || T.translate('inventory.noproperties')}
                            </Typography>
                        </section>
                        {specificSection(item)}
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelActions>
                        <Button size="small" onClick={() => props.onEdit(item)}>{T.translate('generic.edit')}</Button>
                        <Button size="small" color="secondary" onClick={() => openDelete(item)}>
                            {T.translate('generic.delete')}
                        </Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
            ))}
            <Dialog
                open={open}
                onClose={handleDelete}
            >
                {open && <Prompt when={true} message={actionOnPrompt} />}
                <DialogTitle>
                    {T.translate('inventory.removeitem', { what: selectedItem ? selectedItem.name : '' })}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        {T.translate('generic.no')}
                    </Button>
                    <Button onClick={handleDelete} color='secondary'>
                        {T.translate('generic.yes')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}