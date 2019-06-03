import React, { Component } from 'react'
import Character, { Attribute } from '../../models/Character';
import { Card, CardContent, TextField, FormControl, InputLabel, Select, MenuItem, Input, InputAdornment, CardActions, Button, Typography, Fab, Zoom } from '@material-ui/core';
import T from 'i18n-react';
import { SEX, CULTES, CULTURES, CONCEPTS, RANGS } from '../../constants';
import AttributeEditor from '../attributeEditor/AttributeEditor';
import { SettingsBackupRestore, Save } from '@material-ui/icons';

interface Props {
    char: Character;
    onCharChange: (char: Character) => void;
    visible: boolean;
}

interface State {
    char: Character;
    pristine: boolean;
}

export default class EditStatsPage extends Component<Props, State> {

    public constructor(props: Props) {
        super(props);

        this.state = {
            char: JSON.parse(JSON.stringify(this.props.char)),
            pristine: true
        }
    }

    public handleChange = (event: any) => {
        let char: any = this.state.char;
        char[event.target.name] = event.target.value;
        switch (event.target.name) {
            case 'culte':
                // TODO
                break;
            default:
                break;
        }
        this.setState({ char, pristine: false });
    }

    public handleJaugeChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        let char: any = this.state.char;
        char[event.target.name].total = event.target.value;
        this.setState({ char, pristine: false });
    }

    public handleAttributeChange = (attributeId: number, skillId: number, value: number) => {
        const attr: Attribute = this.state.char.attributes.find(attribute => attributeId === attribute.id);
        if (attr && skillId) {
            let skill = attr.skills.find(skill => skill.id === skillId);
            skill.value = value;
        } else if (attr) {
            attr.base = value;
        }
        this.setState({ char: { ...this.state.char }, pristine: false });
    }

    public handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            char: JSON.parse(JSON.stringify(this.props.char)),
            pristine: true
        });
    }

    public handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onCharChange(this.state.char);
        this.setState({ pristine: true });
    }

    public render() {

        const { char, pristine } = this.state;

        return (
            <div style={{ margin: '5px', position: 'relative' }}>
                <Typography variant='subtitle1' component='p' className="card-overtitle">
                    {T.translate('generic.characteredit')}
                </Typography>
                <Card>
                    <Zoom
                        in={this.props.visible && !pristine}
                        timeout={400}
                        style={{
                            transitionDelay: `${this.props.visible && !pristine ? 100 : 0}ms`,
                        }}
                        unmountOnExit
                    ><Fab
                        style={{ position: 'fixed', bottom: '12px', zIndex: 100, marginLeft: 'calc(50% - 90px)', opacity: 0.85 }}
                        color="secondary"
                        aria-label={T.translate('generic.save').toString()}
                        variant="extended"
                        onClick={this.handleSave}
                    >
                            <Save style={{ marginRight: '5px' }} />
                            {T.translate('generic.save')}
                        </Fab>
                    </Zoom>
                    <CardContent>
                        <TextField
                            name='name'
                            label={T.translate('generic.name')}
                            margin="dense"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            value={char.name}
                            onChange={this.handleChange}
                            required
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
                                value={char.age}
                                onChange={this.handleChange}
                                required
                            />
                            <FormControl margin='dense' style={{ flex: 1, marginLeft: '8px' }}>
                                <InputLabel shrink htmlFor="sex">
                                    {T.translate('generic.sex')}
                                </InputLabel>
                                <Select
                                    input={<Input name="sex" />}
                                    value={char.sex}
                                    onChange={this.handleChange}
                                    required
                                >
                                    {SEX.map((text, key) => (
                                        <MenuItem key={key} value={key}>
                                            {T.translate('sex.' + text)}
                                        </MenuItem>
                                    ))}
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
                                value={char.weight}
                                onChange={this.handleChange}
                                required

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
                                value={char.size}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <FormControl fullWidth margin='dense'>
                            <InputLabel shrink htmlFor="culture">
                                {T.translate('generic.culture')}
                            </InputLabel>
                            <Select
                                input={<Input name="culture" fullWidth />}
                                fullWidth
                                value={char.culture}
                                onChange={this.handleChange}
                                error={char.culture < 0}
                                disabled
                            >
                                {CULTURES.map((text, key) => (
                                    <MenuItem key={key} value={key}>
                                        {T.translate('cultures.' + text)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin='dense'>
                            <InputLabel shrink htmlFor="culte">
                                {T.translate('generic.culte')}
                            </InputLabel>
                            <Select
                                input={<Input name="culte" fullWidth />}
                                fullWidth
                                value={char.culte}
                                onChange={this.handleChange}
                                error={char.culte < 0}
                                disabled
                            >
                                {CULTES.map((text, key) => (
                                    <MenuItem key={key} value={key}>
                                        {T.translate('cultes.' + text)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin='dense'>
                            <InputLabel shrink htmlFor="concept">
                                {T.translate('generic.concept')}
                            </InputLabel>
                            <Select
                                input={<Input name="concept" fullWidth />}
                                fullWidth
                                value={char.concept}
                                disabled
                                onChange={this.handleChange}
                                error={char.concept < 0}
                                required
                            >
                                {CONCEPTS.map((text, key) => (
                                    <MenuItem key={key} value={key}>
                                        {T.translate('concepts.' + text)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin='dense'>
                            <InputLabel shrink htmlFor="rang">
                                {T.translate('generic.rang')}
                            </InputLabel>
                            <Select
                                input={<Input name="rang" fullWidth />}
                                fullWidth
                                disabled={char.culte < 0}
                                value={char.rang}
                                onChange={this.handleChange}
                                error={char.rang < 0}
                                required
                            >
                                {RANGS[char.culte].map((text, key) => (
                                    <MenuItem key={key} value={key}>
                                        {T.translate('rangs.' + text)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div style={{ display: 'flex' }}>
                            <TextField
                                name="blessures"
                                label={T.translate('generic.blessures')}
                                margin="dense"
                                type='number'
                                style={{ flex: 1, marginRight: '8px' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    max: 24
                                }}
                                value={char.blessures.total}
                                onChange={this.handleJaugeChange}
                                required
                            />
                            <TextField
                                name="sporulation"
                                label={T.translate('generic.sporulation')}
                                margin="dense"
                                type='number'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    max: 24
                                }}
                                style={{ flex: 1, margin: '8px' }}
                                value={char.sporulation.total}
                                onChange={this.handleJaugeChange}
                                required
                            />
                            <TextField
                                name="trauma"
                                label={T.translate('generic.trauma')}
                                margin="dense"
                                type='number'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    max: 8
                                }}
                                style={{ flex: 1, margin: '8px' }}
                                value={char.trauma.total}
                                onChange={this.handleJaugeChange}
                                required
                            />
                            <TextField
                                name="ego"
                                label={T.translate('generic.ego')}
                                margin="dense"
                                type='number'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    max: 24
                                }}
                                style={{ flex: 1, marginLeft: '8px' }}
                                value={char.ego.total}
                                onChange={this.handleJaugeChange}
                                required
                            />
                        </div>
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
                            value={char.story}
                            onChange={this.handleChange}
                            required
                        />
                    </CardContent>
                </Card>
                <Typography variant='subtitle1' component='p' className="card-overtitle">
                    {T.translate('generic.attributesedit')}
                </Typography>
                {char.attributes.map((attribute, key) => (
                    <AttributeEditor
                        key={key}
                        attribute={attribute}
                        onChange={this.handleAttributeChange}
                    />
                ))}
            </div>
        );
    }
}
