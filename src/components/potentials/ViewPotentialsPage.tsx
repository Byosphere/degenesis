import React, { Component } from 'react'
import Character, { Potential } from '../../models/Character';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import { POTENTIALS, GENERIC_POTENTIALS } from '../../constants';
import T from 'i18n-react';
import { ExpandMore } from '@material-ui/icons';
import AttributeJauge from '../attributeJauge/AttributeJauge';

interface Props {
    char: Character;
}

export default class ViewPotentialsPage extends Component<Props, {}>{

    public render() {

        const { char } = this.props;

        return (
            <div style={{ margin: '5px' }}>
                <Typography variant='subtitle1' component='p' className="card-overtitle">
                    {T.translate('generic.potential0')}
                </Typography>
                {char.potentials.filter(p => p.type === 0).map((potential: Potential) => (
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
                            />
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
                            <Typography variant='body1'>
                                {T.translate('potentials.' + POTENTIALS[GENERIC_POTENTIALS][potential.id] + '.desc')}
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))}
                <Typography variant='subtitle1' component='p' style={{ opacity: 0.6, margin: '8px 16px' }}>
                    {T.translate('generic.potential1')}
                </Typography>
                {char.potentials.filter(p => p.type === 1).map((potential: Potential) => (
                    <ExpansionPanel key={potential.id}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMore />}
                        >
                            <AttributeJauge
                                potential
                                attribute
                                value={potential.level}
                                label={
                                    T.translate('potentials.' + POTENTIALS[char.culte][potential.id] + '.name') as string
                                }
                            />
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
                            <Typography variant='body1'>
                                {T.translate('potentials.' + POTENTIALS[char.culte][potential.id] + '.desc')}
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))}
            </div>
        )
    }
}
