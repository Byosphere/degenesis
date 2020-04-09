import React, { useState, useEffect, useContext } from 'react';
import { Character, Potential } from '../../models/Character';
import { Typography, Zoom, Fab } from '@material-ui/core';
import T from 'i18n-react';
import Empty from '../../components/Empty';
import PotentialDisplay from './PotentialDisplay';
import { Add } from '@material-ui/icons';
import PotentialsDialog from './PotentialsDialog';
import { HeaderContext } from '../../App';

interface Props {
    char: Character;
    onChange: (char: Character, save: boolean) => void;
}

export default function PotentialsPage(props: Props) {

    const { char } = props;
    const genericPotentials = char.potentials.filter(p => p.type === 0);
    const cultePotentials = char.potentials.filter(p => p.type === 1);
    const [open, setOpen] = useState<boolean>(false);
    const { setHeaderTitle } = useContext(HeaderContext);

    function handleDeletePotential(type: number, id: number) {
        let potentialIndex = props.char.potentials.findIndex((p) => p.id === id && p.type === type);
        if (potentialIndex > -1)
            char.potentials.splice(potentialIndex, 1);
        props.onChange(char, true);
    }

    function handleUpgradePotential(type: number, id: number) {
        let potential = props.char.potentials.find((p) => p.id === id && p.type === type);
        if (potential)
            potential.level++;
        props.onChange(char, true);
    }

    function handleClick(id: number, type: number) {
        setOpen(false);
        char.potentials.push({ id, type, level: 1 });
        props.onChange(char, true);
    }

    useEffect(() => {
        setHeaderTitle(T.translate('navigator.potentials') as string);
    }, [setHeaderTitle]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ overflow: 'auto', paddingBottom: '5px' }}>
                <Typography variant='subtitle1' component='p' className="card-overtitle">
                    {T.translate('generic.potential0')}
                </Typography>
            </div>
            {!cultePotentials.length && <Empty />}
            {genericPotentials.map((potential: Potential, key: number) => (
                <PotentialDisplay
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
            {cultePotentials.map((potential: Potential) => (
                <PotentialDisplay
                    type={1}
                    potential={potential}
                    onDeletePotential={handleDeletePotential}
                    onUpgradePotential={handleUpgradePotential}
                />
            ))}
            <Zoom
                in={true}
                unmountOnExit
            >
                <Fab
                    onClick={() => setOpen(true)}
                    color='secondary'
                    style={{ position: 'absolute', bottom: '70px', right: '20px' }}
                >
                    <Add />
                </Fab>
            </Zoom>
            <PotentialsDialog
                open={open}
                char={props.char}
                onClose={() => setOpen(false)}
                onClick={handleClick}
            />
        </div>
    );
}