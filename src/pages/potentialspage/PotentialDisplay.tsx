import React from 'react';
import { Card } from '@material-ui/core';
import { POTENTIALS, GENERIC_POTENTIALS } from '../../constants';
import T from 'i18n-react';
import { Potential } from '../../models/Character';
import AttributeJauge from '../../components/attributejauge/AttributeJauge';
import { useStyles } from './styles';

interface Props {
    culte: number;
    potential: Potential;
    onUpgradePotential: (type: number, id: number) => void;
    onDeletePotential: (type: number, id: number) => void;
}

export default function PotentialDisplay(props: Props) {

    const { potential, culte } = props;
    const classes = useStyles();
    const type = potential.group === 1 ? culte : GENERIC_POTENTIALS;

    return (
        <Card key={potential.id} className={classes.card}>
            <AttributeJauge
                potential
                attribute
                value={potential.level}
                label={
                    T.translate('potentials.' + POTENTIALS[type][potential.id] + '.name') as string
                }
                desc={
                    T.translate('potentials.' + POTENTIALS[type][potential.id] + '.desc') as string
                }
                onEdit={() => props.onUpgradePotential(potential.group, potential.id)}
                onDelete={() => props.onDeletePotential(potential.group, potential.id)}
            />
        </Card>
    );
}