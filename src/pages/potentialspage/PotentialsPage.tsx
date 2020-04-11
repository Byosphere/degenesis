import React, { useState, useEffect, useContext } from 'react';
import { Character, Potential } from '../../models/Character';
import { Typography } from '@material-ui/core';
import T from 'i18n-react';
import Empty from '../../components/Empty';
import PotentialDisplay from './PotentialDisplay';
import { Add } from '@material-ui/icons';
import PotentialsDialog from './PotentialsDialog';
import { HeaderContext } from '../../App';
import FloatingAction from '../../components/FloatingAction';

interface Props {
    char: Character;
    onChange: (char: Character) => void;
}

export default function PotentialsPage(props: Props) {

    const { char } = props;
    const genericPotentials = char.potentials.filter(p => p.group === 0);
    const cultePotentials = char.potentials.filter(p => p.group === 1);
    const [open, setOpen] = useState<boolean>(false);
    const { setHeaderTitle } = useContext(HeaderContext);

    function handleDeletePotential(group: number, id: number) {
        let potentialIndex = props.char.potentials.findIndex((p) => p.id === id && p.group === group);
        if (potentialIndex > -1)
            char.potentials.splice(potentialIndex, 1);
        props.onChange(char);
    }

    function handleUpgradePotential(group: number, id: number) {
        let potential = props.char.potentials.find((p) => p.id === id && p.group === group);
        if (potential)
            potential.level++;
        props.onChange(char);
    }

    function handleClick(id: number, group: number) {
        setOpen(false);
        char.potentials.push({ id, group, level: 1 });
        props.onChange(char);
    }

    useEffect(() => {
        setHeaderTitle(T.translate('navigator.potentials') as string);
    }, [setHeaderTitle]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', paddingBottom: '32px' }}>
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
                    onUpgradePotential={handleUpgradePotential}
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
                    onUpgradePotential={handleUpgradePotential}
                />
            ))}
            <FloatingAction onClick={() => setOpen(true)} icon={<Add />} />
            <PotentialsDialog
                open={open}
                char={props.char}
                onClose={() => setOpen(false)}
                onClick={handleClick}
            />
        </div>
    );
}