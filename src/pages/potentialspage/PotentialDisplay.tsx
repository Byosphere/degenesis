import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, Divider, ExpansionPanelActions, Button } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { POTENTIALS, GENERIC_POTENTIALS } from '../../constants';
import T from 'i18n-react';
import { Potential } from '../../models/Character';
import AttributeJauge from '../../components/attributejauge/AttributeJauge';
import { useStyles } from './styles';

interface Props {
    potential: Potential;
    onUpgradePotential: (type: number, id: number) => void;
    onDeletePotential: (type: number, id: number) => void;
}

export default function PotentialDisplay(props: Props) {

    const { potential } = props;
    const classes = useStyles();

    return (
        <ExpansionPanel key={potential.id} className={classes.card}>
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
                <Button disabled={potential.level === 3} onClick={() => props.onUpgradePotential(potential.group, potential.id)}>{T.translate('generic.levelup')}</Button>
                <Button color='secondary' onClick={() => props.onDeletePotential(potential.group, potential.id)}>{T.translate('generic.delete')}</Button>
            </ExpansionPanelActions>
        </ExpansionPanel>
    );
}