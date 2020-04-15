import React, { useState } from 'react';
import T from 'i18n-react';
import { Item } from '../../models/Character';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Chip, ExpansionPanelActions, Button, Divider, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import Empty from '../../components/empty/Empty';
import { useStyles } from './styles';
import { Prompt } from 'react-router-dom';

interface Props {
    title: string;
    items: Item[];
    onDelete: (id: number) => void;
    onEdit: (item: Item) => void;
}

export default function ItemDisplay(props: Props) {

    const { items, title } = props;
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

    return (
        <>
            <Chip label={title} className={classes.cardOverTitle} />
            {!items.length && <Empty />}
            {items.map((item, key) => (
                <ExpansionPanel classes={{ root: classes.itemPanel }} key={key} TransitionProps={{ unmountOnExit: true }}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                        classes={{ content: classes.expansionPanel }}
                    >
                        <Typography>{item.name}</Typography>
                        <span>
                            <Typography>enc. {item.weight}</Typography>
                            {item.degats && <Typography>{item.degats}</Typography>}
                            {item.defense && <Typography>{item.defense}</Typography>}
                        </span>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            {item.desc}
                        </Typography>
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