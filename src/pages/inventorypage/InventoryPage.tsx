import React, { useContext, useEffect, useState } from 'react';
import { Item, Character, Pet } from '../../models/Character';
import T from 'i18n-react';
import { Card, Avatar, IconButton, Dialog, Badge, Typography, Divider, Chip } from '@material-ui/core';
import { CardTravel, Add, DonutSmall, Money, Pets, Clear, Remove, Error } from '@material-ui/icons';
import ItemDisplay from './ItemDisplay';
import AddItemDialog from './AddItemDialog';
import MoneyDialog from './MoneyDialog';
import FloatingAction from '../../components/floatingaction/FloatingAction';
import Searchbar from '../../components/searchbar/Searchbar';
import { useStyles } from './styles';
import PetDialog from './PetDialog';
import TransitionUp from '../../components/TransitionUp';
import { HeaderContext } from '../detailpage/DetailPage';
import BagDialog from './BagDialog';
import { getAttSkill } from '../../utils/characterTools';
import { BAG_SIZES } from '../../constants';
import CardOverTitle from '../../components/cardovertitle/CardOverTitle';

interface Props {
    char: Character;
    onChange: (char: Character) => void;
}

export default function InventoryPage(props: Props) {

    const { char } = props;
    const classes = useStyles();
    const [moneyModalOpen, setMoneyModalOpen] = useState<boolean>(false);
    const [petModalOpen, setPetModalOpen] = useState<boolean>(false);
    const [bagModalOpen, setBagModalOpen] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [editItem, setEditItem] = useState<Item>(null);
    const [filter, setFilter] = useState<string>('');
    const { setHeaderTitle } = useContext(HeaderContext);
    const weapons = searchFilter(char.inventory.filter(item => item.group === 0));
    const armors = searchFilter(char.inventory.filter(item => item.group === 1));
    const equipment = searchFilter(char.inventory.filter(item => item.group === 2));

    let totalWeight = 0;
    char.inventory.forEach((item: Item) => {
        totalWeight += item.weight;
    });

    const malus = (getAttSkill(char, 0, 2) + char.bagsize) - totalWeight;

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
        if (item.id) {
            let index = char.inventory.findIndex((i) => i.id === item.id);
            char.inventory[index] = { ...item };
            setEditItem(null);
            setOpen(false);
            props.onChange(char);
        } else {
            let id = 1;
            let func = (item: Item) => item.id === id;
            while (char.inventory.find(func)) {
                id++;
            }
            char.inventory.push({ ...item, id });
            setOpen(false);
            props.onChange(char);
        }
    }

    function handleChangeMoney(value: number) {
        char.money = value;
        setMoneyModalOpen(false);
        props.onChange(char);
    }

    function handleChangePet(pet: Pet) {
        char.pet = pet;
        setPetModalOpen(false);
        props.onChange(char);
    }

    function removePet(event: React.MouseEvent<any>) {
        event.stopPropagation();
        char.pet = undefined;
        props.onChange(char);
    }

    function handleChangeBagSize(size: number) {
        char.bagsize = size;
        setBagModalOpen(false);
        props.onChange(char);
    }

    function handleEdit(item: Item) {
        setEditItem(item);
        setOpen(true);
    }

    return (
        <div className={classes.container}>
            <Card>
                <IconButton className={classes.headButton} onClick={() => setBagModalOpen(true)}>
                    <Badge
                        overlap='rectangular'
                        badgeContent={totalWeight + '/' + (getAttSkill(char, 0, 2) + char.bagsize)}
                        color='secondary'
                        className={classes.badge}
                    >
                        <Avatar variant='rounded' color='primary' className={classes.avatar}>
                            {!char.bagsize && <Remove />}
                            {!!char.bagsize && <CardTravel
                                fontSize={char.bagsize === BAG_SIZES[0] ? 'small' : char.bagsize === BAG_SIZES[1] ? 'default' : 'large'}
                            />}
                        </Avatar>
                    </Badge>
                </IconButton>
                <IconButton className={classes.headButton} onClick={() => setMoneyModalOpen(true)}>
                    <Badge
                        overlap='rectangular'
                        classes={{ badge: classes.customBadge }}
                        badgeContent={<>
                            {char.money > 99999 ? '99999+' : Intl.NumberFormat().format(char.money)}
                            <DonutSmall />
                        </>}
                        color='secondary'
                    >
                        <Avatar variant='rounded' color='primary' className={classes.avatar}>
                            <Money />
                        </Avatar>
                    </Badge>
                </IconButton>
                <div className={classes.pets} onClick={() => setPetModalOpen(true)}>
                    <Pets />
                    <Typography>{char.pet ? char.pet.name + ' (' + char.pet.species + ')' : '-'}</Typography>
                    <IconButton size='small' className={classes.clearPet} disabled={!char.pet} onClick={removePet}>
                        <Clear fontSize='small' />
                    </IconButton>
                </div>
            </Card>
            {malus < 0 && <Chip
                icon={<Error />}
                className={classes.malusChip}
                color='secondary'
                size='small'
                label={T.translate('inventory.maluschip', { value: malus })}
            />}
            <CardOverTitle title={T.translate('inventory.bagof', { who: char.name })} />
            <Searchbar
                placeholder={T.translate('generic.search') as string}
                className={classes.searchbar}
                onFilterChange={(value) => setFilter(value)}
            />
            <Card className={classes.cardList}>
                <ItemDisplay title={T.translate('generic.weapons') as string} char={char} onDelete={handleDelete} items={weapons} onEdit={handleEdit} />
                <Divider />
                <ItemDisplay title={T.translate('generic.armors') as string} char={char} onDelete={handleDelete} items={armors} onEdit={handleEdit} />
                <Divider />
                <ItemDisplay title={T.translate('generic.equipment') as string} char={char} onDelete={handleDelete} items={equipment} onEdit={handleEdit} />
            </Card>
            <FloatingAction onClick={() => setOpen(true)} icon={<Add />} />
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullScreen
                TransitionComponent={TransitionUp}
            >
                <AddItemDialog item={editItem} open={open} onSave={handleSave} onClose={() => { setOpen(false); setEditItem(null); }} />
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
            <Dialog
                open={petModalOpen}
                onClose={() => setPetModalOpen(false)}
            >
                <PetDialog
                    open={petModalOpen}
                    pet={char.pet}
                    onClose={() => setPetModalOpen(false)}
                    onValidate={handleChangePet}
                />
            </Dialog>
            <Dialog
                open={bagModalOpen}
                onClose={() => setBagModalOpen(false)}
            >
                <BagDialog
                    open={bagModalOpen}
                    bagsize={char.bagsize}
                    onClose={() => setBagModalOpen(false)}
                    onValidate={handleChangeBagSize}
                />
            </Dialog>
        </div>
    );
}