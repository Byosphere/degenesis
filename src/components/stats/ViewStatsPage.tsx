import React, { Component } from 'react'
import { Card, CardMedia, CardHeader, Avatar, CardContent, Typography, IconButton, Chip } from '@material-ui/core';
import { CULTES, CULTURES, CONCEPTS, RANGS, SEX } from '../../constants';
import { ExpandMore, ExpandLess, OfflineBolt, OfflineBoltOutlined, Clear } from '@material-ui/icons';
import Character, { Attribute } from '../../models/Character';
import T from 'i18n-react';
import InteractiveJauge from '../interactiveJauge/InteractiveJauge';
import AttributePanel from './AttributePanel';

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
        if (char.trauma !== index) {
            char.trauma = index;
            this.props.onCharChange(char, true);
        }
    }

    public handleRollDice(): void {
        this.setState({ open: true });
    }

    public handleChange = (field: string, value: number) => {
        let char: any = this.props.char;
        char[field] = value;
        this.props.onCharChange(char, true);
    }

    public handleAttributeSave = () => {
        this.props.onCharChange(this.props.char, true);
    }

    public render() {

        const { char } = this.props;

        return (
            <div style={{ margin: '5px 5px 61px 5px' }}>
                <Card>
                    <CardMedia
                        image={"images/cultes/" + CULTES[char.culte].name + ".jpg"}
                        title="Paella dish"
                        style={{ height: '100px' }}
                    />
                    <CardHeader
                        avatar={
                            <Avatar alt={CULTURES[char.culture].name} src={"images/cultures/" + CULTURES[char.culture].name + ".jpg"} />
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
                            <IconButton onClick={this.handleExpand}>
                                {this.state.expanded ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                        </CardContent>}
                    <CardContent>
                        <div>
                            <Typography component='div' variant='caption'>
                                {T.translate('generic.trauma') + ' (' + char.trauma + '/' + char.traumaMax + ') :'}
                            </Typography>
                            <div style={{ marginTop: '-4px' }}>
                                {this.displayTrauma()}
                            </div>
                        </div>
                    </CardContent>
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
                {char.attributes.map((att: Attribute, i: number) => (
                    <AttributePanel key={i} attribute={att} onChange={this.handleAttributeSave} />
                ))}
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
