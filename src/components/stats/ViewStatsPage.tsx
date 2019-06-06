import React, { Component } from 'react'
import { Card, CardMedia, CardHeader, Avatar, CardContent, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, IconButton, Chip, Snackbar } from '@material-ui/core';
import { CULTES, CULTURES, CONCEPTS, RANGS, ATTRIBUTES, SEX, SKILLS } from '../../constants';
import { ExpandMore, ExpandLess, OfflineBolt, OfflineBoltOutlined, Clear } from '@material-ui/icons';
import Character, { Attribute, Skill } from '../../models/Character';
import AttributeJauge from '../attributeJauge/AttributeJauge';
import T from 'i18n-react';
import InteractiveJauge from '../interactiveJauge/InteractiveJauge';

interface Props {
    char: Character;
    onCharChange: (char: Character, save: boolean) => void;
}

interface State {
    expanded: boolean;
    open: boolean;
}

export default class ViewStatsPage extends Component<Props, State> {

    private STORY_LENGTH: number = 200;

    public constructor(props: Props) {
        super(props);

        this.state = {
            expanded: false,
            open: false
        }
    }

    public handleExpand = () => {
        this.setState({ expanded: !this.state.expanded });
    }

    public handleTrauma = (index: number) => {
        let char = this.props.char;
        char.trauma = index;
        this.props.onCharChange(char, true);
    }

    public handleRollDice(): void {
        this.setState({ open: true });
    }

    public handleChange = (field: string, value: number) => {
        let char: any = this.props.char;
        char[field] = value;
        this.props.onCharChange(char, true);
    }

    public render() {

        const { char } = this.props;

        return (
            <div style={{ margin: '5px' }}>
                <Card>
                    <CardMedia
                        image={"/images/cultes/" + CULTES[char.culte].name + ".jpg"}
                        title="Paella dish"
                        style={{ height: '100px' }}
                    />
                    <CardHeader
                        avatar={
                            <Avatar alt={CULTURES[char.culture].name} src={"/images/cultures/" + CULTURES[char.culture].name + ".jpg"} />
                        }
                        title={char.name + ' (' + T.translate('sex.' + SEX[char.sex]) + ')'}
                        subheader={
                            T.translate('cultes.' + CULTES[char.culte].name) + ' - ' +
                            T.translate('cultures.' + CULTURES[char.culture].name) + ' - ' +
                            T.translate('concepts.' + CONCEPTS[char.concept].name)
                        }
                        action={
                            <Chip label={T.translate('rangs.' + RANGS[char.culte][char.rang])} variant="outlined" />
                        }
                    />
                    <CardContent>
                        <Typography variant="caption" component='p'>
                            {
                                char.size + ' ' + T.translate('generic.s') + ' | ' +
                                char.weight + ' ' + T.translate('generic.w') + ' | ' +
                                char.age + ' ' + T.translate('generic.y')
                            }
                        </Typography>
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
                                    {T.translate('generic.trauma') + ' (' + char.trauma + '/' + char.traumaMax + ') :'}
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
                <Card style={{ margin: '5px 0' }}>
                    <CardContent>
                        <InteractiveJauge
                            label='blessures'
                            currentValue={char.blessures}
                            maximum={char.blessuresMax}
                            onChange={this.handleChange}
                        />
                        <InteractiveJauge
                            label='ego'
                            currentValue={char.ego}
                            maximum={char.egoMax}
                            onChange={this.handleChange}
                        />
                        <InteractiveJauge
                            label='sporulation'
                            currentValue={char.sporulation}
                            maximum={char.sporulationMax}
                            onChange={this.handleChange}
                        />
                    </CardContent>
                </Card>
                <Typography variant='body1' component='p' className='card-overtitle'>{T.translate('generic.attributes')}</Typography>
                {char.attributes.map((att: Attribute) => (
                    <ExpansionPanel key={att.id}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMore />}
                        >
                            <AttributeJauge
                                label={T.translate('attributes.' + ATTRIBUTES[att.id] + '.name') as string}
                                value={att.base}
                                attribute
                            />
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
                            {att.skills.map((skill: Skill) => (
                                <AttributeJauge
                                    key={skill.id}
                                    label={T.translate('skills.' + SKILLS[att.id][skill.id]) as string}
                                    value={skill.value}
                                />
                            ))}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))}
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={() => this.setState({ open: false })}
                    message={<span id="message-id">Test de Force : 4 5 6 4 2 1</span>}
                />
            </div>
        )
    }


    private displayTrauma(): JSX.Element[] {
        const traumaMax = this.props.char.traumaMax;
        let trauma = [];
        trauma.push(
            <IconButton key={0} style={{ padding: '6px' }} onClick={() => this.handleTrauma(0)}>
                <Clear />
            </IconButton>
        )
        for (let i = 1; i <= traumaMax; i++) {
            trauma.push(
                <IconButton key={i} style={{ padding: '6px' }} onClick={() => this.handleTrauma(i)}>
                    {i <= this.props.char.trauma ? <OfflineBolt /> : <OfflineBoltOutlined />}
                </IconButton>
            );
        }
        return trauma;
    }
}
