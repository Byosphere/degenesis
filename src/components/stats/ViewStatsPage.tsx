import React, { Component } from 'react'
import { Card, CardMedia, CardHeader, Avatar, CardContent, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, IconButton, Chip, Snackbar } from '@material-ui/core';
import { CULTES, CULTURES, CONCEPTS, RANGS, ATTRIBUTES, SEX, SKILLS } from '../../constants';
import { ExpandMore, ExpandLess, OfflineBolt, OfflineBoltOutlined } from '@material-ui/icons';
import Character, { Attribute, Skill } from '../../models/Character';
import AttributeJauge from '../attributeJauge/AttributeJauge';
import T from 'i18n-react';
import InteractiveJauge from '../interactiveJauge/InteractiveJauge';

interface Props {
    char: Character;
    onCharChange: (char: Character) => void;
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
        char.trauma.actuel = index;
        this.props.onCharChange(char);
    }

    public handleRollDice(): void {
        this.setState({ open: true });
    }

    public handleChange(field: string, value: number): void {
        let char: any = this.props.char;
        char[field].actuel = value;
        this.props.onCharChange(char);
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
                        title={char.name + ' (' + T.translate('sex.' + SEX[char.sex]) + ')'}
                        subheader={
                            T.translate('cultes.' + CULTES[char.culte]) + ' - ' +
                            T.translate('cultures.' + CULTURES[char.culture]) + ' - ' +
                            T.translate('concepts.' + CONCEPTS[char.concept])
                        }
                        action={
                            <Chip label={T.translate('rangs.' + RANGS[char.culte][char.rang])} variant="outlined" />
                        }
                    />
                    <CardContent style={{ padding: '0px 16px' }}>
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
                <Card style={{ margin: '5px 0' }}>
                    <CardContent>
                        <InteractiveJauge
                            label={T.translate('generic.life') as string}
                            currentValue={char.blessures.actuel}
                            maximum={char.blessures.total}
                            onChange={(newValue) => this.handleChange('blessures', newValue)}
                        />
                        <InteractiveJauge
                            label={T.translate('generic.ego') as string}
                            currentValue={char.ego.actuel}
                            maximum={char.ego.total}
                            onChange={(newValue) => this.handleChange('ego', newValue)}
                        />
                        <InteractiveJauge
                            label={T.translate('generic.sporulation') as string}
                            currentValue={char.sporulation.actuel}
                            maximum={char.sporulation.total}
                            onChange={(newValue) => this.handleChange('sporulation', newValue)}
                        />
                    </CardContent>
                </Card>
                {char.attributes.map((att: Attribute) => (
                    <ExpansionPanel key={att.id}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMore />}
                        >
                            <AttributeJauge
                                label={T.translate('attributes.' + ATTRIBUTES[att.id]) as string}
                                value={att.base}
                                attribute
                                onRollDice={() => this.handleRollDice()}
                            />
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
                            {att.skills.map((skill: Skill) => (
                                <AttributeJauge
                                    key={skill.id}
                                    label={T.translate('skills.' + SKILLS[att.id][skill.id]) as string}
                                    value={skill.value}
                                    onRollDice={() => this.handleRollDice()}
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
        const charTrauma = this.props.char.trauma;
        let trauma = [];
        for (let i = 1; i <= charTrauma.total; i++) {
            trauma.push(
                <IconButton key={i} style={{ padding: '6px' }} onClick={() => this.handleTrauma(i)}>
                    {i <= charTrauma.actuel ? <OfflineBolt /> : <OfflineBoltOutlined />}
                </IconButton>
            );
        }
        return trauma;
    }
}
