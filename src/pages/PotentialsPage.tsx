import React, { Component } from 'react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, Divider, Button, Dialog, Slide, AppBar, Toolbar, IconButton, DialogContent, List, ListItem, ListItemText, ListSubheader, Zoom, Fab, ExpansionPanelActions } from '@material-ui/core';
import T from 'i18n-react';
import { ExpandMore, Close, Add } from '@material-ui/icons';
import { TransitionProps } from 'react-transition-group/Transition';
import { Potential, Character } from '../models/Character';
import AttributeJauge from '../components/attributeJauge/AttributeJauge';
import { POTENTIALS, GENERIC_POTENTIALS } from '../constants';

interface Props {
    char: Character;
    onChange: (char: Character, save: boolean) => void;
}

interface State {
    modalOpen: boolean;
}

export default class PotentialsPage extends Component<Props, State>{

    // private Transition: any;

    // constructor(props: Props) {
    //     super(props);

    //     this.state = {
    //         modalOpen: false,
    //     };

    //     this.Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    //         return <Slide direction="up" ref={ref} {...props} />;
    //     });
    // }

    // public handleClose = (event: any) => {
    //     this.setState({ modalOpen: false });
    // }

    // public handleClick = (potentialId: number, type: number) => {
    //     let char = this.props.char;
    //     this.setState({ modalOpen: false });
    //     char.potentials.push({ id: potentialId, type, level: 1 });
    //     this.props.onChange(char, true);
    // }

    // public upgradePotential(type: number, id: number): void {
    //     let char = this.props.char;
    //     let potential = char.potentials.find((p) => p.id === id && p.type === type);
    //     if (potential)
    //         potential.level++;
    //     this.props.onChange(char, true);
    // }

    // public deletePotential(type: number, id: number): void {
    //     let char = this.props.char;
    //     let potentialIndex = char.potentials.findIndex((p) => p.id === id && p.type === type);
    //     if (potentialIndex > -1)
    //         char.potentials.splice(potentialIndex, 1);
    //     this.props.onChange(char, true);
    // }

    // public render() {

    //     const { char } = this.props;
    //     const genericPotentials = char.potentials.filter(p => p.type === 0);
    //     const cultePotentials = char.potentials.filter(p => p.type === 1);

    //     return (
    //         <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    //             <div style={{ overflow: 'auto', paddingBottom: '5px' }}>
    //                 <Typography variant='subtitle1' component='p' className="card-overtitle">
    //                     {T.translate('generic.potential0')}
    //                 </Typography>
    //                 {!genericPotentials.length && <this.Empty />}
    //                 {genericPotentials.map((potential: Potential) => (
    //                     <ExpansionPanel key={potential.id}>
    //                         <ExpansionPanelSummary
    //                             expandIcon={<ExpandMore />}
    //                         >
    //                             <AttributeJauge
    //                                 potential
    //                                 attribute
    //                                 value={potential.level}
    //                                 label={
    //                                     T.translate('potentials.' + POTENTIALS[GENERIC_POTENTIALS][potential.id] + '.name') as string
    //                                 }
    //                                 desc={
    //                                     T.translate('potentials.' + POTENTIALS[GENERIC_POTENTIALS][potential.id] + '.desc') as string
    //                                 }
    //                             />
    //                         </ExpansionPanelSummary>
    //                         <Divider />
    //                         <ExpansionPanelActions>
    //                             <Button disabled={potential.level === 3} onClick={() => this.upgradePotential(0, potential.id)}>{T.translate('generic.levelup')}</Button>
    //                             <Button color='secondary' onClick={() => this.deletePotential(0, potential.id)}>{T.translate('generic.delete')}</Button>
    //                         </ExpansionPanelActions>
    //                     </ExpansionPanel>
    //                 ))}
    //                 <Typography variant='subtitle1' component='p' style={{ opacity: 0.6, margin: '8px 16px' }}>
    //                     {T.translate('generic.potential1')}
    //                 </Typography>
    //                 {!cultePotentials.length && <this.Empty />}
    //                 {cultePotentials.map((potential: Potential) => (
    //                     <ExpansionPanel key={potential.id}>
    //                         <ExpansionPanelSummary
    //                             expandIcon={<ExpandMore />}
    //                         >
    //                             <AttributeJauge
    //                                 potential
    //                                 attribute
    //                                 value={potential.level}
    //                                 desc={
    //                                     T.translate('potentials.' + POTENTIALS[GENERIC_POTENTIALS][potential.id] + '.desc') as string
    //                                 }
    //                                 label={
    //                                     T.translate('potentials.' + POTENTIALS[char.culte][potential.id] + '.name') as string
    //                                 }
    //                             />
    //                         </ExpansionPanelSummary>
    //                         <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
    //                             <Typography variant='body1'>
    //                                 {T.translate('potentials.' + POTENTIALS[char.culte][potential.id] + '.desc')}
    //                             </Typography>
    //                         </ExpansionPanelDetails>
    //                         <Divider />
    //                         <ExpansionPanelActions>
    //                             <Button disabled={potential.level === 3} onClick={() => this.upgradePotential(1, potential.id)}>{T.translate('generic.levelup')}</Button>
    //                             <Button color='secondary' onClick={() => this.deletePotential(1, potential.id)}>{T.translate('generic.delete')}</Button>
    //                         </ExpansionPanelActions>
    //                     </ExpansionPanel>
    //                 ))}
    //             </div>
    //             <Zoom
    //                 in={true}
    //                 unmountOnExit
    //             >
    //                 <Fab onClick={() => this.setState({ modalOpen: true })} color='secondary' style={{ position: 'absolute', bottom: '70px', right: '20px' }}>
    //                     <Add />
    //                 </Fab>
    //             </Zoom>
    //             <Dialog
    //                 open={this.state.modalOpen}
    //                 onClose={this.handleClose}
    //                 aria-labelledby="addpotential-dialog-title"
    //                 aria-describedby="addpotential-dialog-description"
    //                 fullScreen
    //                 TransitionComponent={this.Transition}
    //             >
    //                 <AppBar style={{}}>
    //                     <Toolbar>
    //                         <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="Close">
    //                             <Close />
    //                         </IconButton>
    //                         <Typography variant="h6">
    //                             {T.translate('potential.add')}
    //                         </Typography>
    //                     </Toolbar>
    //                 </AppBar>
    //                 <DialogContent style={{ marginTop: '56px', paddingTop: 0 }}>
    //                     <List
    //                         dense
    //                         component="div"
    //                         role="list"
    //                         subheader={
    //                             <ListSubheader component="div" style={{ background: 'white' }}>
    //                                 {T.translate('generic.potential1')}
    //                             </ListSubheader>
    //                         }
    //                     >
    //                         {POTENTIALS[this.props.char.culte].map((potential: string, key: number) => (
    //                             < ListItem
    //                                 key={'c' + key}
    //                                 role="listitem"
    //                                 button
    //                                 onClick={() => this.handleClick(key, 1)}
    //                                 disabled={Boolean(this.props.char.potentials.find(p => p.id === key && p.type === 1))}
    //                             >
    //                                 <ListItemText
    //                                     primary={T.translate('potentials.' + potential + '.name')}
    //                                     secondary={T.translate('potentials.' + potential + '.desc')}
    //                                 />
    //                             </ListItem>
    //                         ))}
    //                     </List>
    //                     <List
    //                         dense
    //                         component="div"
    //                         role="list"
    //                         subheader={
    //                             <ListSubheader component="div" style={{ background: 'white' }}>
    //                                 {T.translate('generic.potential0')}
    //                             </ListSubheader>
    //                         } >
    //                         {POTENTIALS[GENERIC_POTENTIALS].map((potential: string, key: number) => (
    //                             < ListItem
    //                                 key={'g' + key}
    //                                 role="listitem"
    //                                 button
    //                                 onClick={() => this.handleClick(key, 0)}
    //                                 disabled={Boolean(this.props.char.potentials.find(p => p.id === key && p.type === 0))}
    //                             >
    //                                 <ListItemText
    //                                     primary={T.translate('potentials.' + potential + '.name')}
    //                                     secondary={T.translate('potentials.' + potential + '.desc')}
    //                                 />
    //                             </ListItem>
    //                         ))}
    //                     </List>
    //                 </DialogContent>
    //             </Dialog>
    //         </div>
    //     )
    // }

    // private Empty = () => (
    //     <span style={{
    //         width: '100%',
    //         textAlign: 'center',
    //         display: 'block',
    //         opacity: 0.5,
    //         marginBottom: '16px'
    //     }}>{T.translate('generic.empty')}</span>
    // );
}
