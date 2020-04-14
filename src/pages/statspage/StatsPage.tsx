import React, { useEffect, useContext, useState } from 'react';
import { Character, Attribute } from '../../models/Character';
import { RANGS, CULTES, CULTURES, SEX, CONCEPTS, STORY_LENGTH } from '../../constants';
import T from 'i18n-react';
import { Card, CardMedia, Chip, CardHeader, Avatar, IconButton, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { Info, Edit, ExpandLess, ExpandMore, Lock, LockOpen } from '@material-ui/icons';
import { getBlessuresMax, getEgoMax, getSporulationMax, getTraumaMax } from '../../utils/characterTools';
import Trauma from './Trauma';
import AttributePanel from './AttributePanel';
import CharacterEditDialog, { EditFormValues } from './CharacterEditDialog';
import { Prompt } from 'react-router-dom';
import FloatingAction from '../../components/floatingaction/FloatingAction';
import InteractiveJauge from '../../components/InteractiveJauge';
import CardOverTitle from '../../components/cardovertitle/CardOverTitle';
import { HeaderContext } from '../detailpage/DetailPage';
import { useStyles } from './styles';
import ShortDivider from '../../components/shortdivider/ShortDivider';

interface Props {
    char: Character;
    onChange: (char: Character) => void;
}

export default function StatsPage(props: Props) {

    const { char } = props;
    const classes = useStyles();
    const rankDesc = T.translate('rangs.' + RANGS[char.culte][char.rang] + '.desc');
    const { setHeaderTitle } = useContext(HeaderContext);
    const [showRank, setShowRank] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [lock, setLock] = useState<boolean>(true);

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
        <div className={classes.container}>
            <Card style={{ position: 'relative' }}>
                <CardMedia
                    image={"images/cultes/" + CULTES[char.culte].img}
                    title="Paella dish"
                    className={classes.cardMedia}
                />
                <Chip
                    className={classes.rankChip}
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
                {char.story.length > STORY_LENGTH && <CardContent className={classes.storyContent}>
                    <IconButton onClick={() => setExpanded(!expanded)}>
                        {expanded ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </CardContent>}
            </Card>
            <CardOverTitle title={T.translate('generic.health')} />
            <Card>
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
                        <div className={classes.trauma}>
                            <Trauma
                                char={props.char}
                                onClick={handleTrauma}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <CardOverTitle
                title={
                    <>
                        {T.translate('generic.attributes')}
                        <span className={classes.lock} onClick={() => setLock(!lock)}>
                            {lock ? <Lock fontSize='small' /> : <LockOpen fontSize='small' />}
                        </span>
                    </>
                }
            />
            {char.attributes.map((att: Attribute, i: number) => (
                <AttributePanel
                    key={i}
                    char={char}
                    behavior={char.behavior}
                    belief={char.belief}
                    attribute={att}
                    onChange={handleAttributeSave}
                    locked={lock}
                />
            ))}
            <ShortDivider />
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
                {showRank && <Prompt when={true} message={actionOnPrompt} />}
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