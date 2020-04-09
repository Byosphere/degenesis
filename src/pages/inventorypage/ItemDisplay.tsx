import React, { useState } from 'react';
import T from 'i18n-react';
import { Item } from '../../models/Character';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Collapse, Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';
import { ExpandLess, ExpandMore, Delete } from '@material-ui/icons';

interface Props {
    type: number;
    item: Item;
    onDelete: (id: number) => void;
}

export default function ItemDisplay(props: Props) {

    const { item, type } = props;
    const [expand, setExpand] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const itemDetails = T.translate('generic.weight') + ' : '
        + item.weight + T.translate('generic.weightunit') + ' | ' +
        T.translate('generic.techname') + ' ' + T.translate('generic.tech.' + item.tech);

    let degatsText = '';
    let defenseText = '';
    let titleText = '';
    if (item.degats) {
        // const force = props.char.attributes[0].skills[2].value;
        // // eslint-disable-next-line
        // const degats = Math.ceil(eval(item.degats.replace('F', force.toString())));
        // degatsText = T.translate('generic.attack') + ' : ' + degats + ' ' + T.translate('generic.dices') + ' (' + item.degats + ')';

    } else if (item.defense) {
        defenseText = T.translate('generic.defense') + ' : ' + item.defense + ' ' + T.translate('generic.dices');
    } else if (item.title) {
        titleText = item.title;
    }

    function handleDelete() {
        setOpen(false);
        props.onDelete(item.id);
    }

    return (
        <React.Fragment>
            <ListItem>
                <ListItemText primary={item.name} secondary={itemDetails} />
                <ListItemSecondaryAction>
                    <IconButton onClick={() => setExpand(!expand)}>
                        {expand ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                    <IconButton color='secondary' onClick={handleDelete}>
                        <Delete />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={expand} unmountOnExit>
                <ListItem>
                    <ListItemText
                        style={{ margin: '0px 16px 6px 16px' }}
                        primary={
                            degatsText || defenseText || titleText
                        }
                        secondary={item.desc}
                    />
                </ListItem>
            </Collapse>
            <Dialog
                open={open}
                onClose={handleDelete}
            >
                <DialogTitle>
                    {T.translate('generic.confirmdelete', { who: item.name })}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        {T.translate('generic.no')}
                    </Button>
                    <Button onClick={handleDelete} autoFocus color='secondary'>
                        {T.translate('generic.yes')}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}