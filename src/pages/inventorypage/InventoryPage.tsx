import React, { useContext, useEffect, useState } from 'react';
import { Item, Character } from '../../models/Character';
import T from 'i18n-react';
import { Card, CardHeader, Avatar, IconButton, CardContent, List, ListSubheader, Divider, Dialog, Slide } from '@material-ui/core';
import { HeaderContext } from '../../App';
import { CardTravel, SwapVerticalCircle, Add } from '@material-ui/icons';
import ItemDisplay from './ItemDisplay';
import AddItemDialog from './AddItemDialog';
import MoneyDialog from './MoneyDialog';
import Empty from '../../components/Empty';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import FloatingAction from '../../components/FloatingAction';
import Searchbar from '../../components/Searchbar';


interface Props {
    char: Character;
    onChange: (char: Character) => void;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function InventoryPage(props: Props) {

    const { char } = props;
    const [moneyModalOpen, setMoneyModalOpen] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>('');
    const { setHeaderTitle } = useContext(HeaderContext);
    const weapons = searchFilter(char.inventory.filter(item => item.group === 0));
    const armors = searchFilter(char.inventory.filter(item => item.group === 1));
    const equipment = searchFilter(char.inventory.filter(item => item.group === 2));
    const items = searchFilter(char.inventory.filter(item => item.group === 3));
    let totalWeight = 0;
    char.inventory.forEach((item: Item) => {
        totalWeight += item.weight;
    });

    useEffect(() => {
        setHeaderTitle(T.translate('navigator.inventory') as string);
    }, [setHeaderTitle]);

    function handleDelete(id: number) {
        const index = char.inventory.findIndex((item) => item.id === id);
        char.inventory.splice(index, 1);
        props.onChange(char);
    }

    function searchFilter(items: Item[]): Item[] {
        if (!filter) return items;
        return items.filter((item) => item.name.toLowerCase().search(filter) !== -1);
    }

    function handleSave(item: Item) {
        let id = 1;
        let func = (item: Item) => item.id === id;
        while (char.inventory.find(func)) {
            id++;
        }
        char.inventory.push({ ...item, id });
        setOpen(false);
        props.onChange(char);
    }

    function handleChangeMoney(value: number) {
        char.money = value;
        setMoneyModalOpen(false);
        props.onChange(char);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 10px)', margin: '5px' }}>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar color='primary'>
                            <CardTravel />
                        </Avatar>
                    }
                    title={T.translate('generic.money', { money: char.money })}
                    subheader={T.translate('generic.totalweight', { weight: totalWeight })}
                    action={
                        <IconButton color='secondary' onClick={() => setMoneyModalOpen(true)}>
                            <SwapVerticalCircle />
                        </IconButton>
                    }
                />
            </Card>
            <Searchbar
                placeholder={T.translate('generic.bagof', { who: char.name }) as string}
                style={{ marginTop: '5px' }}
                onFilterChange={(value) => setFilter(value)}
            />
            <Card style={{ flex: 1, marginTop: '5px', overflow: 'auto' }}>
                <CardContent>
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
                <FloatingAction onClick={() => setOpen(true)} icon={<Add />} />
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    fullScreen
                    TransitionComponent={Transition}
                >
                    <AddItemDialog open={open} onSave={handleSave} onClose={() => setOpen(false)} />
                </Dialog>
                <Dialog
                    open={moneyModalOpen}
                    onClose={() => setMoneyModalOpen(false)}
                >
                    <MoneyDialog
                        open={moneyModalOpen}
                        money={char.money}
                        onClose={() => setMoneyModalOpen(false)}
                        onValidate={handleChangeMoney}
                    />
                </Dialog>
            </Card>
        </div>
    );
}