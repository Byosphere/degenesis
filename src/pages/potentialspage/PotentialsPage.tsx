import React, { useState, useEffect, useContext } from 'react';
import { Character, Potential, Origin } from '../../models/Character';
import { Typography, Dialog, DialogContentText, DialogTitle, DialogContent, DialogActions, Button, ExpansionPanel, ExpansionPanelSummary, Avatar, ExpansionPanelDetails, Card, CardContent } from '@material-ui/core';
import T from 'i18n-react';
import Empty from '../../components/empty/Empty';
import PotentialDisplay from './PotentialDisplay';
import { Add, ExpandMore } from '@material-ui/icons';
import PotentialsDialog from './PotentialsDialog';
import { SnackbarContext } from '../../App';
import FloatingAction from '../../components/floatingaction/FloatingAction';
import { getPotentialXpCost } from '../../utils/characterTools';
import { POTENTIALS, GENERIC_POTENTIALS, CULTES, CULTURES, CONCEPTS } from '../../constants';
import { Prompt } from 'react-router-dom';
import AttributeJauge from '../../components/attributejauge/AttributeJauge';
import CardOverTitle from '../../components/cardovertitle/CardOverTitle';
import { HeaderContext } from '../detailpage/DetailPage';
import { useStyles } from './styles';
import ShortDivider from '../../components/shortdivider/ShortDivider';

interface Props {
    char: Character;
    onChange: (char: Character) => void;
}

export default function PotentialsPage(props: Props) {

    const { char } = props;
    const [open, setOpen] = useState<boolean>(false);
    const { setHeaderTitle, setXp, xp } = useContext(HeaderContext);
    const [openXp, setOpenXp] = useState<boolean>(false);
    const [potential, setPotential] = useState<Potential>(undefined);
    const { setSnackbar } = useContext(SnackbarContext);
    const classes = useStyles();

    function handleDeletePotential(group: number, id: number) {
        let potentialIndex = props.char.potentials.findIndex((p) => p.id === id && p.group === group);
        if (potentialIndex > -1)
            char.potentials.splice(potentialIndex, 1);
        props.onChange(char);
    }

    function handleUpgradePotential() {
        setOpenXp(false);
        if (potential) {
            let newExp = (xp || 0) - getPotentialXpCost(char.potentials);
            if (newExp >= 0) {
                potential.level++;
                setXp(newExp);
                char.exp = newExp;
                props.onChange(char);
            } else {
                setSnackbar({
                    type: 'error',
                    message: T.translate('generic.xperror')
                });
            }
        }
    }

    function handleClick(id: number, group: number) {
        setOpen(false);
        char.potentials.push({ id, group, level: 1 });
        props.onChange(char);
    }

    function handleOpenXpDialog(group: number, id: number) {
        setPotential(char.potentials.find((p) => p.id === id && p.group === group));
        setOpenXp(true);
    }

    useEffect(() => {
        setHeaderTitle(T.translate('navigator.legacy') as string);
    }, [setHeaderTitle]);

    function actionOnPrompt(location): boolean {
        setOpenXp(false)
        return false;
    }

    function handleEdit(origin: Origin, value: number) {
        origin.value = value;
        props.onChange(char);
    }

    return (
        <div className={classes.container}>
            <CardOverTitle title={T.translate('generic.origins') as string} />
            <Card className={classes.card}>
                <CardContent>
                    {char.origins.map((origin: Origin) => (
                        <AttributeJauge
                            key={origin.id}
                            label={T.translate('origins.' + origin.name + '.name') as string}
                            value={origin.value}
                            onClick={(value: number) => handleEdit(origin, value)}
                            desc={T.translate('origins.' + origin.name + '.desc') as string}
                            origin
                        />
                    ))}
                </CardContent>
            </Card>
            <CardOverTitle title={T.translate('generic.potentials') as string} />
            {!char.potentials.length && <Empty />}
            {char.potentials.map((potential: Potential, key: number) => (
                <PotentialDisplay
                    key={key}
                    potential={potential}
                    onDeletePotential={handleDeletePotential}
                    onUpgradePotential={handleOpenXpDialog}
                />
            ))}
            <ShortDivider />
            <ExpansionPanel className={classes.card}>
                <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                    <Avatar alt={CULTES[char.culte].name} src={"images/cultes/" + CULTES[char.culte].img} />
                    <Typography className={classes.typography}>{T.translate('cultes.' + CULTES[char.culte].name)}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expansionDetail}>
                    {T.translate('cultes.' + CULTES[char.culte].desc)}
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel className={classes.card}>
                <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                    <Avatar alt={CULTURES[char.culture].name} src={"images/cultures/" + CULTURES[char.culture].img} />
                    <Typography className={classes.typography}>{T.translate('cultures.' + CULTURES[char.culture].name)}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expansionDetail}>
                    {T.translate('cultures.' + CULTURES[char.culture].desc)}
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel className={classes.card}>
                <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                    <Avatar alt={CONCEPTS[char.concept].name} src={"images/concepts/" + CONCEPTS[char.concept].img} />
                    <Typography className={classes.typography}>{T.translate('concepts.' + CONCEPTS[char.concept].name)}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expansionDetail}>
                    {T.translate('concepts.' + CONCEPTS[char.concept].desc)}
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ShortDivider />
            <FloatingAction onClick={() => setOpen(true)} icon={<Add />} />
            <PotentialsDialog
                open={open}
                char={props.char}
                onClose={() => setOpen(false)}
                onClick={handleClick}
            />
            <Dialog
                open={openXp}
                onClose={() => setOpenXp(false)}
            >
                {openXp && <Prompt when={true} message={actionOnPrompt} />}
                <DialogTitle>{T.translate('potential.upgradetitle')}</DialogTitle>
                {potential && <DialogContent>
                    <DialogContentText>
                        {T.translate('potential.upgrade', {
                            cost: getPotentialXpCost(char.potentials),
                            name: potential.group === 0 ? T.translate('potentials.' + POTENTIALS[GENERIC_POTENTIALS][potential.id] + '.name') :
                                T.translate('potentials.' + POTENTIALS[char.culte][potential.id] + '.name')
                        })}
                    </DialogContentText>
                </DialogContent>}
                <DialogActions>
                    <Button onClick={() => setOpenXp(false)} color="primary">
                        {T.translate('generic.no')}
                    </Button>
                    <Button onClick={handleUpgradePotential} color="secondary">
                        {T.translate('generic.yes')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}