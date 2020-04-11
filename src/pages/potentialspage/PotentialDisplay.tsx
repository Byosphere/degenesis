import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, Divider, ExpansionPanelActions, Button } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { POTENTIALS, GENERIC_POTENTIALS } from '../../constants';
import T from 'i18n-react';
import { Potential } from '../../models/Character';
import AttributeJauge from '../../components/AttributeJauge';

interface Props {
    type: number;
    potential: Potential;
    onUpgradePotential: (type: number, id: number) => void;
    onDeletePotential: (type: number, id: number) => void;
}

export default function PotentialDisplay(props: Props) {

    const { potential, type } = props;

    return (
        <ExpansionPanel key={potential.id}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
            >
                <AttributeJauge
                    potential
                    attribute
                    value={potential.level}
                    label={
                        T.translate('potentials.' + POTENTIALS[GENERIC_POTENTIALS][potential.id] + '.name') as string
                    }
                    desc={
                        T.translate('potentials.' + POTENTIALS[GENERIC_POTENTIALS][potential.id] + '.desc') as string
                    }
                />
            </ExpansionPanelSummary>
            <Divider />
            <ExpansionPanelActions>
                <Button disabled={potential.level === 3} onClick={() => props.onUpgradePotential(type, potential.id)}>{T.translate('generic.levelup')}</Button>
                <Button color='secondary' onClick={() => props.onDeletePotential(type, potential.id)}>{T.translate('generic.delete')}</Button>
            </ExpansionPanelActions>
        </ExpansionPanel>
    );
}