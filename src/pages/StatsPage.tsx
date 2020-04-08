import React, { Component } from 'react'
import { Card, CardMedia, CardHeader, Avatar, CardContent, Typography, IconButton, Chip, Dialog, DialogContent, DialogActions, Button, DialogTitle, TextField, FormControl, InputLabel, Select, Input, MenuItem, InputAdornment, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions } from '@material-ui/core';
import { CULTES, CULTURES, CONCEPTS, RANGS, SEX } from '../constants';
import { ExpandMore, ExpandLess, OfflineBolt, OfflineBoltOutlined, Clear, Edit, Info } from '@material-ui/icons';
import Character, { Attribute } from '../models/Character';
import T from 'i18n-react';
import InteractiveJauge from '../components/interactiveJauge/InteractiveJauge';
import AttributePanel from '../components/AttributePanel';

interface Props {
    char: Character;
    onChange: (char: Character, save: boolean) => void;
}

interface State {
    expanded: boolean;
    open: boolean;
    charCopy: Character;
    errors: any;
    showRank: boolean;
}

export default class StatsPage extends Component<Props, State> {

    private STORY_LENGTH: number = 200;

    public constructor(props: Props) {
        super(props);

        this.state = {
            expanded: false,
            open: false,
            charCopy: this.props.char.clone(),
            errors: {},
            showRank: false
        }
    }

    public handleExpand = () => {
        this.setState({ expanded: !this.state.expanded });
    }

    public handleTrauma = (index: number) => {
        let char = this.props.char;
        if (char.trauma !== index) {
            char.trauma = index;
            this.props.onChange(char, true);
        }
    }

    public handleChange = (field: string, value: number) => {
        let char: any = this.props.char;
        char[field] = value;
        this.props.onChange(char, true);
    }

    public handleAttributeSave = () => {
        this.props.onChange(this.props.char, true);
    }

    public handleModalClose = (event: any) => {
        this.setState({
            open: false,
            charCopy: this.props.char.clone()
        });
    }

    public handleEditChar = (event: any) => {
        let char: any = this.state.charCopy;
        char[event.target.name] = event.target.value;
        this.setState({ charCopy: char });
    }

    public handleSave = () => {
        let char: Character = this.props.char;
        let errors = null;
        this.state.charCopy.name ?
            char.name = this.state.charCopy.name : errors = { name: T.translate('generic.invalidfield'), ...errors };
        this.state.charCopy.age ?
            char.age = this.state.charCopy.age : errors = { age: T.translate('generic.invalidfield'), ...errors };
        this.state.charCopy.weight ?
            char.weight = this.state.charCopy.weight : errors = { weight: T.translate('generic.invalidfield'), ...errors };
        this.state.charCopy.size ?
            char.size = this.state.charCopy.size : errors = { size: T.translate('generic.invalidfield'), ...errors };
        this.state.charCopy.story ?
            char.story = this.state.charCopy.story : errors = { story: T.translate('generic.invalidfield'), ...errors };
        this.state.charCopy.rang ?
            char.rang = this.state.charCopy.rang : errors = { rang: T.translate('generic.invalidfield'), ...errors };
        char.sex = this.state.charCopy.sex;

        if (errors) {
            this.setState({ errors });
        } else {
            this.props.onChange(this.props.char, true);
            this.setState({
                open: false,
                errors: {}
            });
        }

    }

    public render() {

        const { char } = this.props;
        const { charCopy } = this.state;
        const rankDesc = T.translate('rangs.' + RANGS[char.culte][char.rang] + '.desc');

        return (
            <div style={{ margin: '5px 5px 61px 5px' }}>
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
                        onDelete={rankDesc ? this.showDetailRank : null}
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
                        action={
                            <IconButton onClick={() => this.setState({ open: true })}>
                                <Edit />
                            </IconButton>
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
                        <CardContent style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0' }}>
                            <IconButton onClick={this.handleExpand}>
                                {this.state.expanded ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                        </CardContent>}
                </Card>
                <Typography variant='body1' component='p' className='card-overtitle'>{T.translate('generic.health')}</Typography>
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
                <Typography variant='body1' component='p' className='card-overtitle'>{T.translate('generic.attributes')}</Typography>
                {char.attributes.map((att: Attribute, i: number) => (
                    <AttributePanel key={i} attribute={att} onChange={this.handleAttributeSave} />
                ))}
                <Typography variant='body1' component='p' className='card-overtitle'>Status</Typography>
                <ExpansionPanel style={{ marginBottom: '5px' }}>
                    <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                        <b>{T.translate('cultes.' + CULTES[char.culte].name)}</b>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {T.translate('cultes.' + CULTES[char.culte].desc)}
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                        <Button color='secondary'>{T.translate('generic.edit')}</Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
                <ExpansionPanel style={{ marginBottom: '5px' }}>
                    <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                        <b>{T.translate('cultures.' + CULTURES[char.culture].name)}</b>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
                        {T.translate('cultures.' + CULTURES[char.culture].desc)}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel style={{ marginBottom: '5px' }}>
                    <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                        <b>{T.translate('concepts.' + CONCEPTS[char.concept].name)}</b>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
                        {T.translate('concepts.' + CONCEPTS[char.concept].desc)}
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                        <Button color='secondary'>{T.translate('generic.edit')}</Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
                <span className='stats-bottom'></span>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleModalClose}
                >
                    <DialogTitle id="edit-character">{T.translate('generic.characteredit')}</DialogTitle>
                    <DialogContent>
                        <TextField
                            name='name'
                            label={T.translate('generic.name')}
                            margin="dense"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            value={charCopy.name}
                            onChange={this.handleEditChar}
                            required
                            error={Boolean(this.state.errors['name'])}
                            helperText={this.state.errors['name']}
                        />
                        <div style={{ display: 'flex' }}>
                            <TextField
                                name='age'
                                label={T.translate('generic.age')}
                                margin="dense"
                                type='number'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                style={{ flex: 1, marginRight: '8px' }}
                                value={charCopy.age}
                                onChange={this.handleEditChar}
                                required
                                error={Boolean(this.state.errors['age'])}
                                helperText={this.state.errors['age']}
                            />
                            <FormControl
                                margin='dense'
                                style={{ flex: 1, marginLeft: '8px' }}
                            >
                                <InputLabel shrink htmlFor="sex">
                                    {T.translate('generic.sex')}
                                </InputLabel>
                                <Select
                                    input={<Input name="sex" />}
                                    value={charCopy.sex}
                                    onChange={this.handleEditChar}
                                    required
                                >
                                    {SEX.map((text, key) => {
                                        if (text) {
                                            return (
                                                <MenuItem key={key} value={key}>
                                                    {text ? T.translate('sex.' + text) : T.translate('generic.none')}
                                                </MenuItem>
                                            )
                                        } else {
                                            return null;
                                        }
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <TextField
                                name='weight'
                                label="Poids"
                                margin="dense"
                                type='number'
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Kg</InputAdornment>
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                style={{ flex: 1, marginRight: '8px' }}
                                value={charCopy.weight}
                                onChange={this.handleEditChar}
                                required
                                error={Boolean(this.state.errors['weight'])}
                                helperText={this.state.errors['weight']}
                            />
                            <TextField
                                name='size'
                                label="Taille"
                                margin="dense"
                                type='number'
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">cm</InputAdornment>
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                style={{ flex: 1, marginLeft: '8px' }}
                                value={charCopy.size}
                                onChange={this.handleEditChar}
                                required
                                error={Boolean(this.state.errors['size'])}
                                helperText={this.state.errors['size']}
                            />
                        </div>
                        <FormControl fullWidth margin='dense'>
                            <InputLabel shrink htmlFor="rang">
                                {T.translate('generic.rang')}
                            </InputLabel>
                            <Select
                                input={<Input name="rang" fullWidth />}
                                fullWidth
                                value={charCopy.rang}
                                onChange={this.handleEditChar}
                                error={charCopy.rang < 0}
                                required
                            >
                                {RANGS[charCopy.culte].map((text, key) => (
                                    <MenuItem key={key} value={key}>
                                        {T.translate('rangs.' + text)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            name="story"
                            label={T.translate('generic.story')}
                            margin="dense"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            multiline
                            fullWidth
                            rows={5}
                            rowsMax={20}
                            value={charCopy.story}
                            onChange={this.handleEditChar}
                            required
                            error={Boolean(this.state.errors['story'])}
                            helperText={this.state.errors['story']}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color='secondary' onClick={this.handleSave}>
                            {T.translate('generic.validate')}
                        </Button>
                        <Button color='primary' onClick={this.handleModalClose}>
                            {T.translate('generic.cancel')}
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.showRank}
                    onClose={this.hideDetailRank}
                >
                    <DialogTitle>{T.translate('rangs.' + RANGS[char.culte][char.rang] + '.name')}</DialogTitle>
                    <DialogContent>
                        {T.translate('rangs.' + RANGS[char.culte][char.rang] + '.desc')}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.hideDetailRank}>
                            {T.translate('generic.close')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    public showDetailRank = (event: any) => {
        this.setState({ showRank: true });
    }

    public hideDetailRank = (event: React.MouseEvent<any>) => {
        event.stopPropagation();
        this.setState({ showRank: false });
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
