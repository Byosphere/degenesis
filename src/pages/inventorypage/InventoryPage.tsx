import React, { useContext, useEffect, useState } from 'react';
import { Item, Character } from '../../models/Character';
import T from 'i18n-react';
import { Typography, Card, CardHeader, Avatar, IconButton, CardContent, List, ListSubheader, Divider, Zoom, Fab } from '@material-ui/core';
import { HeaderContext } from '../../App';
import { CardTravel, SwapVerticalCircle, Add } from '@material-ui/icons';
import ItemDisplay from './ItemDisplay';
import AddItemDialog from './AddItemDialog';
import MoneyDialog from './MoneyDialog';
import Empty from '../../components/Empty';


interface Props {
    char: Character;
    onChange: (char: Character, save: boolean) => void;
}

export default function InventoryPage(props: Props) {

    const [moneyModalOpen, setMoneyModalOpen] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const { setHeaderTitle } = useContext(HeaderContext);
    const weapons = props.char.inventory.filter(item => item.type === 0);
    const armors = props.char.inventory.filter(item => item.type === 1);
    const equipment = props.char.inventory.filter(item => item.type === 2);
    const items = props.char.inventory.filter(item => item.type === 3);
    let totalWeight = 0;
    props.char.inventory.forEach((item: Item) => {
        totalWeight += item.weight;
    });

    useEffect(() => {
        setHeaderTitle(T.translate('navigator.inventory') as string);
    }, [setHeaderTitle]);

    function handleDelete(id: number) {
        // TODO
    }

    function handleSave(item: Item) {
        let char = props.char;
        char.inventory.push(item);
        setOpen(false);
        props.onChange(char, true);
    }

    function handleChangeMoney(value: number) {
        let char = props.char;
        char.money = value;
        setMoneyModalOpen(false);
        props.onChange(char, true);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant='subtitle1' component='p' className="card-overtitle">
                {T.translate('generic.bagof', { who: props.char.name })}
            </Typography>
            <Card style={{ height: '100%' }}>
                <CardHeader
                    avatar={
                        <Avatar color='primary'>
                            <CardTravel />
                        </Avatar>
                    }
                    title={T.translate('generic.money', { money: props.char.money })}
                    subheader={T.translate('generic.totalweight', { weight: totalWeight })}
                    action={
                        <IconButton color='secondary' onClick={() => setMoneyModalOpen(true)}>
                            <SwapVerticalCircle />
                        </IconButton>
                    }
                />
                <CardContent style={{ overflow: 'auto', height: 'calc(100% - 72px)', paddingTop: 0 }}>
                    <List subheader={<ListSubheader style={{ background: 'white' }}>{T.translate('generic.weapons')}</ListSubheader>} >
                        {!weapons.length && <Empty />}
                        {weapons.map((item, key) => <ItemDisplay onDelete={handleDelete} item={item} key={key} />)}
                    </List>
                    <Divider />
                    <List subheader={<ListSubheader style={{ background: 'white' }}>{T.translate('generic.armors')}</ListSubheader>} >
                        {!armors.length && <Empty />}
                        {armors.map((item, key) => <ItemDisplay onDelete={handleDelete} item={item} key={key} />)}
                    </List>
                    <Divider />
                    <List subheader={<ListSubheader style={{ background: 'white' }}>{T.translate('generic.equipment')}</ListSubheader>} >
                        {!equipment.length && <Empty />}
                        {equipment.map((item, key) => <ItemDisplay onDelete={handleDelete} item={item} key={key} />)}
                    </List>
                    <Divider />
                    <List subheader={<ListSubheader style={{ background: 'white' }}>{T.translate('generic.items')}</ListSubheader>} >
                        {!items.length && <Empty />}
                        {items.map((item, key) => <ItemDisplay onDelete={handleDelete} item={item} key={key} />)}
                    </List>
                </CardContent>
                <Zoom in={true} unmountOnExit>
                    <Fab
                        onClick={() => setOpen(true)}
                        color='secondary'
                        style={{ position: 'absolute', bottom: '70px', right: '20px', zIndex: 10 }}>
                        <Add />
                    </Fab>
                </Zoom>
                <AddItemDialog
                    open={open}
                    onClose={() => setOpen(false)}
                    onSave={handleSave}
                />
                <MoneyDialog
                    open={moneyModalOpen}
                    money={props.char.money}
                    onClose={() => setMoneyModalOpen(false)}
                    onValidate={handleChangeMoney}
                />
            </Card>
        </div>
    );
}