import React, { useEffect, useContext, useState } from 'react';
import { Character, Attribute } from '../../models/Character';
import { RANGS, CULTES, SEX, STORY_LENGTH } from '../../constants';
import T from 'i18n-react';
import { Card, CardMedia, Chip, CardHeader, IconButton, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { Info, Edit, ExpandLess, ExpandMore, Lock, LockOpen } from '@material-ui/icons';
import { getBlessuresMax, getEgoMax, getSporulationMax } from '../../utils/characterTools';
import Trauma from './Trauma';
import AttributePanel from './AttributePanel';
import CharacterEditDialog, { EditFormValues } from './CharacterEditDialog';
import { Prompt } from 'react-router-dom';
import FloatingAction from '../../components/floatingaction/FloatingAction';
import InteractiveJauge from './InteractiveJauge';
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
            <Card>
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
                    title={char.name}
                    subheader={
                        T.translate('sex.' + SEX[char.sex]) + ' | ' +
                        char.size + ' ' + T.translate('generic.s') + ' | ' +
                        char.weight + ' ' + T.translate('generic.w') + ' | ' +
                        char.age + ' ' + T.translate('generic.y')
                    }
                />
                <CardContent classes={{ root: classes.cardContent }}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {char.story.length > STORY_LENGTH && !expanded ?
                            <span>{char.story.substr(0, 200) + '[...]'}</span> :
                            <span>{char.story}</span>
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
                        label={T.translate('stats.blessures.label') as string}
                        desc={T.translate('stats.blessures.desc') as string}
                        currentValue={char.blessures}
                        maximum={getBlessuresMax(char)}
                        onChange={(value) => handleChange('blessures', value)}
                    />
                    <InteractiveJauge
                        label={T.translate('stats.ego.label') as string}
                        desc={T.translate('stats.ego.desc') as string}
                        currentValue={char.ego}
                        maximum={getEgoMax(char)}
                        onChange={(value) => handleChange('ego', value)}
                    />
                    <InteractiveJauge
                        label={T.translate('stats.sporulation.label') as string}
                        desc={T.translate('stats.sporulation.desc') as string}
                        currentValue={char.sporulation}
                        maximum={getSporulationMax(char)}
                        onChange={(value) => handleChange('sporulation', value)}
                    />
                    <Trauma
                        label={T.translate('stats.trauma.label') as string}
                        desc={T.translate('stats.trauma.desc') as string}
                        char={props.char}
                        onClick={handleTrauma}
                    />
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