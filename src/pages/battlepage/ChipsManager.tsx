import React, { useState, useEffect } from 'react'
import { Chip, Avatar } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import T from 'i18n-react';

export interface ChipModifier {
    name: string;
    modifier: number;
    unremovable?: boolean;
}

interface Props {
    trauma: number;
    usedEgo: number;
}

export default function ChipsManager(props: Props) {

    const { trauma, usedEgo } = props;
    const [chips, setChips] = useState<ChipModifier[]>([]);

    useEffect(() => {
        let initialChips = [];
        if (usedEgo) initialChips.push({ name: 'ego', modifier: usedEgo, unremovable: true });
        if (trauma) initialChips.push({ name: 'trauma', modifier: -trauma, unremovable: true });
        setChips(initialChips);

    }, [trauma, usedEgo]);

    function handleAdd() {

    }

    return (
        <span style={{ margin: '5px 5px 0 5px', display: 'flex' }}>
            <span style={{ flex: 1, overflowX: 'auto', display: 'flex', marginRight: '8px', borderRight: '1px solid rgba(0,0,0,0.12)' }}>
                {chips.map((chip: ChipModifier, key: number) => (
                    <Chip
                        key={key}
                        avatar={<Avatar>{chip.modifier > 0 ? '+' : '-'}{Math.abs(chip.modifier)}</Avatar>}
                        label={T.translate('chipmodifier.' + chip.name)}
                        onDelete={chip.unremovable ? undefined : () => { }}
                        size="small"
                        color="secondary"
                        className={chip.modifier > 0 ? 'chip-modifier positiv' : 'chip-modifier negativ'}
                    />
                ))}
            </span>
            <Chip
                icon={<Add />}
                label="Ajouter"
                color="primary"
                size="small"
                onClick={handleAdd}
            />
        </span>
    )
}
