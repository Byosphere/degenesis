import React, { useEffect, useContext, useState } from 'react';
import { Character, Attribute } from '../../models/Character';
import { RANGS, CULTES, CULTURES, SEX, CONCEPTS } from '../../constants';
import T from 'i18n-react';
import { HeaderContext } from '../../App';
import { Card, CardMedia, Chip, CardHeader, Avatar, IconButton, CardContent, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { Info, Edit, ExpandLess, ExpandMore } from '@material-ui/icons';
import InteractiveJauge from '../../components/interactiveJauge/InteractiveJauge';
import { getBlessuresMax, getEgoMax, getSporulationMax, getTraumaMax } from '../../utils/characterTools';
import Trauma from './Trauma';
import AttributePanel from '../../components/AttributePanel';
import CharacterEditDialog, { EditFormValues } from './CharacterEditDialog';
import { Prompt } from 'react-router-dom';
import FloatingAction from '../../components/FloatingAction';

interface Props {
    char: Character;
    onChange: (char: Character) => void;
}

const STORY_LENGTH: number = 200;

export default function StatsPage(props: Props) {

    const { char } = props;
    const rankDesc = T.translate('rangs.' + RANGS[char.culte][char.rang] + '.desc');
    const { setHeaderTitle } = useContext(HeaderContext);
    const [showRank, setShowRank] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<boolean>(false);

    useEffect(() => {
        setHeaderTitle(T.translate('generic.characterstats') as string);
    }, [setHeaderTitle]);

    function handleChange(field: string, newValue: number) {
        if (char[field] !== newValue) {
            char[field] = newValue;
            props.onChange(char);
        }
    }

    function handleTrauma(val: number) {
        if (char.trauma !== val) {
            char.trauma = val;
            props.onChange(char);
        }
    }

    function handleAttributeSave() {
        props.onChange(char);
    }

    function handleSave(formValues: EditFormValues) {
        setOpen(false);
        props.onChange({ ...char, ...formValues });
    }

    function actionOnPrompt(): boolean {
        setShowRank(false);
        return false;
    }

    return (
        <div style={{ margin: '5px' }}>
            <Card style={{ position: 'relative' }}>
                <CardMedia
                    image={"images/cultes/" + CULTES[char.culte].img}
                    title="Paella dish"
                    style={{ height: '100px' }}
                />
                <Chip
                    style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(255,255,255,0.7)' }}
                    label={T.translate('rangs.' + RANGS[char.culte][char.rang] + '.name')}
                    variant="outlined"
                    deleteIcon={<Info />}
                    onDelete={rankDesc ? () => setShowRank(true) : null}
                />
                <CardHeader
                    avatar={
                        <Avatar alt={CULTURES[char.culture].name} src={"images/cultures/" + CULTURES[char.culture].img} />
                    }
                    title={char.name + ' (' + T.translate('sex.' + SEX[char.sex]) + ')'}
                    subheader={
                        T.translate('cultes.' + CULTES[char.culte].name) + ' - ' +
                        T.translate('cultures.' + CULTURES[char.culture].name) + ' - ' +
                        T.translate('concepts.' + CONCEPTS[char.concept].name)
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
                        {char.story.length > STORY_LENGTH && !expanded ?
                            char.story.substr(0, 200) + '[...]' :
                            char.story
                        }
                    </Typography>
                </CardContent>
                {char.story.length > STORY_LENGTH &&
                    <CardContent style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0' }}>
                        <IconButton onClick={() => setExpanded(!expanded)}>
                            {expanded ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </CardContent>
                }
            </Card>
            <Typography variant='body1' component='p' className='card-overtitle'>{T.translate('generic.health')}</Typography>
            <Card style={{ margin: '5px 0' }}>
                <CardContent>
                    <InteractiveJauge
                        label='blessures'
                        currentValue={char.blessures}
                        maximum={getBlessuresMax(char)}
                        onChange={handleChange}
                    />
                    <InteractiveJauge
                        label='ego'
                        currentValue={char.ego}
                        maximum={getEgoMax(char)}
                        onChange={handleChange}
                    />
                    <InteractiveJauge
                        label='sporulation'
                        currentValue={char.sporulation}
                        maximum={getSporulationMax(char)}
                        onChange={handleChange}
                    />
                    <div>
                        <Typography component='div' variant='caption'>
                            {T.translate('generic.trauma') + ' (' + char.trauma + '/' + getTraumaMax(char) + ') :'}
                        </Typography>
                        <div style={{ marginTop: '-4px' }}>
                            <Trauma
                                char={props.char}
                                onClick={handleTrauma}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Typography variant='body1' component='p' className='card-overtitle'>{T.translate('generic.attributes')}</Typography>
            {char.attributes.map((att: Attribute, i: number) => (
                <AttributePanel key={i} attribute={att} onChange={handleAttributeSave} />
            ))}
            <Typography variant='body1' component='p' className='card-overtitle'>{T.translate('generic.origins')}</Typography>
            <ExpansionPanel style={{ marginBottom: '5px' }}>
                <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                    <Avatar alt={CULTES[char.culte].name} src={"images/cultes/" + CULTES[char.culte].img} />
                    <Typography style={{ alignSelf: 'center', marginLeft: '16px' }}>{T.translate('cultes.' + CULTES[char.culte].name)}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {T.translate('cultes.' + CULTES[char.culte].desc)}
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel style={{ marginBottom: '5px' }}>
                <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                    <Avatar alt={CULTURES[char.culture].name} src={"images/cultures/" + CULTURES[char.culture].img} />
                    <Typography style={{ alignSelf: 'center', marginLeft: '16px' }}>{T.translate('cultures.' + CULTURES[char.culture].name)}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
                    {T.translate('cultures.' + CULTURES[char.culture].desc)}
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel style={{ marginBottom: '5px' }}>
                <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                    <Avatar alt={CONCEPTS[char.concept].name} src={"images/concepts/" + CONCEPTS[char.concept].img} />
                    <Typography style={{ alignSelf: 'center', marginLeft: '16px' }}>{T.translate('concepts.' + CONCEPTS[char.concept].name)}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
                    {T.translate('concepts.' + CONCEPTS[char.concept].desc)}
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <span className='stats-bottom'></span>
            <CharacterEditDialog
                char={char}
                open={open}
                onClose={() => setOpen(false)}
                onSave={handleSave}
            />
            <Dialog
                open={showRank}
                onClose={() => setShowRank(false)}
            >
                <Prompt when={true} message={actionOnPrompt} />
                <DialogTitle>{T.translate('rangs.' + RANGS[char.culte][char.rang] + '.name')}</DialogTitle>
                <DialogContent>
                    {T.translate('rangs.' + RANGS[char.culte][char.rang] + '.desc')}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowRank(false)}>
                        {T.translate('generic.close')}
                    </Button>
                </DialogActions>
            </Dialog>
            <FloatingAction onClick={() => setOpen(true)} icon={<Edit />} />
        </div>
    );
}