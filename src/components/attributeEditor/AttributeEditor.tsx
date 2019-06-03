import React, { Component } from 'react';
import { Attribute, Skill } from '../../models/Character';
import { GridList, GridListTile, TextField, InputAdornment, Card, CardContent } from '@material-ui/core';
import { ATTRIBUTES, SKILLS } from '../../constants';
import T from 'i18n-react';

interface Props {
    attribute: Attribute;
    onChange: (attributeId: number, skillId: number, value: number) => void;
}

interface State {
    attribute: Attribute,
}

export default class AttributeEditor extends Component<Props, State> {

    public constructor(props: Props) {
        super(props);

        this.state = {
            attribute: JSON.parse(JSON.stringify(this.props.attribute))
        }
    }


    public handleChange = (event: React.ChangeEvent<HTMLInputElement>, skillId?: number) => {
        let value = parseInt(event.target.value);
        let attribute = this.state.attribute;
        if (skillId !== undefined) {
            let skill = attribute.skills.find(skill => skill.id === skillId);
            skill.value = value;
        } else {
            attribute.base = value;
        }
        this.setState({ attribute });
        if (!isNaN(value) && value <= 6 && value >= 0)
            this.props.onChange(this.state.attribute.id, skillId, value);
    }

    public render() {

        const { attribute } = this.state;

        return (
            <Card style={{ marginTop: '5px' }}>
                <CardContent>
                    <GridList cellHeight={80} spacing={5}>
                        <GridListTile cols={2} rows={1} style={{ marginTop: "10px" }}>
                            <TextField
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                margin="dense"
                                fullWidth
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">{T.translate('attributes.' + ATTRIBUTES[attribute.id]) + ':'}</InputAdornment>,
                                }}
                                value={attribute.base || ''}
                                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => this.handleChange(evt)}
                                error={attribute.base > 6 || attribute.base < 0}
                                helperText={attribute.base > 6 || attribute.base < 0 ? T.translate('generic.incorrectvalue') : ''}
                            />
                        </GridListTile>
                        {attribute.skills.map((skill: Skill) => (
                            <GridListTile cols={1} rows={1} key={attribute.id + '-' + skill.id} >
                                <TextField
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    margin="dense"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">{T.translate('skills.' + SKILLS[attribute.id][skill.id]) + ':'}</InputAdornment>,
                                    }}
                                    value={skill.value || ''}
                                    onChange={(evt: React.ChangeEvent<HTMLInputElement>) => this.handleChange(evt, skill.id)}
                                    helperText={skill.value > 6 || skill.value < 0 ? T.translate('generic.incorrectvalue') : ''}
                                    error={skill.value > 6 || skill.value < 0}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </CardContent>
            </Card>
        )
    }
}
