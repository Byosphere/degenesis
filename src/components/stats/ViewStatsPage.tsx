import React, { Component } from 'react'
import { Card, CardMedia, CardHeader, Avatar, CardContent, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Divider, CardActions, IconButton, Chip } from '@material-ui/core';
import { CULTES, CULTURES, CONCEPTS, RANGS } from '../../constants';
import { ExpandMore, ExpandLess, OfflineBolt, OfflineBoltOutlined } from '@material-ui/icons';
import Character, { Attribute, Skill } from '../../models/Character';
import AttributeJauge from '../attributeJauge/AttributeJauge';
import T from 'i18n-react';
import InteractiveJauge from '../interactiveJauge/InteractiveJauge';

interface Props {
    char: Character;
}

interface State {
    expanded: boolean
}

export default class ViewStatsPage extends Component<Props, State> {

    private STORY_LENGTH: number = 200;

    public constructor(props: Props) {
        super(props);

        this.state = {
            expanded: false
        }
    }

    public handleExpand = () => {
        this.setState({ expanded: !this.state.expanded });
    }

    public handleTrauma = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    }


    public render() {

        const { char } = this.props;

        return (
            <div style={{ margin: '5px' }}>
                <Card>
                    <CardMedia

                        image={"/images/cultes/" + CULTES[char.culte] + ".jpg"}
                        title="Paella dish"
                        style={{ height: '100px' }}
                    />
                    <CardHeader
                        avatar={
                            <Avatar alt={CULTURES[char.culture]} src={"/images/cultures/" + CULTURES[char.culture] + ".jpg"} />
                        }
                        title={char.name}
                        subheader={
                            T.translate('cultes.' + CULTES[char.culte]) + ' - ' +
                            T.translate('cultures.' + CULTURES[char.culture]) + ' - ' +
                            T.translate('concepts.' + CONCEPTS[char.concept])
                        }
                        action={
                            <Chip label={T.translate('rang.' + RANGS[char.culte][char.rang])} variant="outlined" />
                        }
                    />
                    <CardContent style={{ paddingBottom: '0px' }}>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {char.story.length > this.STORY_LENGTH && !this.state.expanded ?
                                char.story.substr(0, 200) + '[...]' :
                                char.story
                            }
                        </Typography>
                    </CardContent>
                    {char.story.length > this.STORY_LENGTH &&
                        <CardContent style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px' }}>
                            <div>
                                <Typography component='div' variant='caption'>
                                    {T.translate('generic.trauma') + ' (' + char.trauma.actuel + '/' + char.trauma.total + ') :'}
                                </Typography>
                                <div style={{ marginTop: '-4px' }}>
                                    {this.displayTrauma()}
                                </div>
                            </div>
                            <IconButton onClick={this.handleExpand}>
                                {this.state.expanded ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                        </CardContent>}
                </Card>
                <Card style={{ marginTop: '1px' }}>
                    <CardContent>
                        <InteractiveJauge
                            label={T.translate('generic.life') as string}
                            currentValue={char.blessures.actuel}
                            maximum={char.blessures.total}
                        />
                        <InteractiveJauge
                            label={T.translate('generic.ego') as string}
                            currentValue={char.ego.actuel}
                            maximum={char.ego.total}
                        />
                        <InteractiveJauge
                            label={T.translate('generic.sporulation') as string}
                            currentValue={char.sporulation.actuel}
                            maximum={char.sporulation.total}
                        />
                    </CardContent>
                </Card>
                {char.attributes.map((att: Attribute) => (
                    <ExpansionPanel key={att.id}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMore />}
                        >
                            <AttributeJauge label={T.translate('attributes.' + att.id) as string} value={att.base} attribute />
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
                            {att.skills.map((skill: Skill) => (
                                <AttributeJauge key={skill.id} label={T.translate('skills.' + skill.id) as string} value={skill.value} />
                            ))}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))}
            </div>
        )
    }


    private displayTrauma(): JSX.Element[] {
        const charTrauma = this.props.char.trauma;
        let trauma = [];
        for (let i = 1; i <= charTrauma.total; i++) {
            trauma.push(
                <IconButton key={i} style={{ padding: '6px' }} onClick={this.handleTrauma}>
                    {i <= charTrauma.actuel ? <OfflineBolt /> : <OfflineBoltOutlined />}
                </IconButton>
            );
        }
        return trauma;
    }
}
