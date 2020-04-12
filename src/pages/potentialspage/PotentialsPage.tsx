import React, { useState, useEffect, useContext } from 'react';
import { Character, Potential } from '../../models/Character';
import { Typography, Dialog, DialogContentText, DialogTitle, DialogContent, DialogActions, Button, ExpansionPanel, ExpansionPanelSummary, Avatar, ExpansionPanelDetails } from '@material-ui/core';
import T from 'i18n-react';
import Empty from '../../components/Empty';
import PotentialDisplay from './PotentialDisplay';
import { Add, ExpandMore } from '@material-ui/icons';
import PotentialsDialog from './PotentialsDialog';
import { HeaderContext, SnackbarContext } from '../../App';
import FloatingAction from '../../components/FloatingAction';
import { getPotentialXpCost } from '../../utils/characterTools';
import { POTENTIALS, GENERIC_POTENTIALS, CULTES, CULTURES, CONCEPTS } from '../../constants';
import { Prompt } from 'react-router-dom';

interface Props {
    char: Character;
    onChange: (char: Character) => void;
}

export default function PotentialsPage(props: Props) {

    const { char } = props;
    const genericPotentials = char.potentials.filter(p => p.group === 0);
    const cultePotentials = char.potentials.filter(p => p.group === 1);
    const [open, setOpen] = useState<boolean>(false);
    const { setHeaderTitle, setExp, exp } = useContext(HeaderContext);
    const [openXp, setOpenXp] = useState<boolean>(false);
    const [potential, setPotential] = useState<Potential>(undefined);
    const { setSnackbar } = useContext(SnackbarContext);

    function handleDeletePotential(group: number, id: number) {
        let potentialIndex = props.char.potentials.findIndex((p) => p.id === id && p.group === group);
        if (potentialIndex > -1)
            char.potentials.splice(potentialIndex, 1);
        props.onChange(char);
    }

    function handleUpgradePotential() {
        setOpenXp(false);
        if (potential) {
            let newExp = (exp || 0) - getPotentialXpCost(char.potentials);
            if (newExp >= 0) {
                potential.level++;
                setExp(newExp);
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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', paddingBottom: '32px' }}>
            <Typography variant='body1' component='p' className='card-overtitle'>{T.translate('generic.legacy', { name: char.name })}</Typography>
            <ExpansionPanel style={{ marginBottom: '5px' }}>
                <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                    <Avatar alt={CULTES[char.culte].name} src={"images/cultes/" + CULTES[char.culte].img} />
                    <Typography style={{ alignSelf: 'center', marginLeft: '16px' }}>{T.translate('cultes.' + CULTES[char.culte].name)}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {T.translate('cultes.' + CULTES[char.culte].desc)}
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel style={{ marginBottom: '5px' }}>
                <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                    <Avatar alt={CULTURES[char.culture].name} src={"images/cultures/" + CULTURES[char.culture].img} />
                    <Typography style={{ alignSelf: 'center', marginLeft: '16px' }}>{T.translate('cultures.' + CULTURES[char.culture].name)}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
                    {T.translate('cultures.' + CULTURES[char.culture].desc)}
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel style={{ marginBottom: '5px' }}>
                <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                    <Avatar alt={CONCEPTS[char.concept].name} src={"images/concepts/" + CONCEPTS[char.concept].img} />
                    <Typography style={{ alignSelf: 'center', marginLeft: '16px' }}>{T.translate('concepts.' + CONCEPTS[char.concept].name)}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
                    {T.translate('concepts.' + CONCEPTS[char.concept].desc)}
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <div style={{ overflow: 'auto', paddingBottom: '5px' }}>
                <Typography variant='subtitle1' component='p' className="card-overtitle">
                    {T.translate('generic.potential0')}
                </Typography>
            </div>
            {!genericPotentials.length && <Empty />}
            {genericPotentials.map((potential: Potential, key: number) => (
                <PotentialDisplay
                    key={key}
                    type={0}
                    potential={potential}
                    onDeletePotential={handleDeletePotential}
                    onUpgradePotential={handleOpenXpDialog}
                />
            ))}
            <Typography variant='subtitle1' component='p' style={{ opacity: 0.6, margin: '8px 16px' }}>
                {T.translate('generic.potential1')}
            </Typography>
            {!cultePotentials.length && <Empty />}
            {cultePotentials.map((potential: Potential, key: number) => (
                <PotentialDisplay
                    key={key}
                    type={1}
                    potential={potential}
                    onDeletePotential={handleDeletePotential}
                    onUpgradePotential={handleOpenXpDialog}
                />
            ))}
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