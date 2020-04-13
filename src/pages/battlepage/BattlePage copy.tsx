import React, { useContext, useEffect, useState } from 'react';
import { Character } from '../../models/Character';
import { HeaderContext } from '../../App';
import T from 'i18n-react';
import { AppBar, Toolbar, Card, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Badge, Avatar } from '@material-ui/core';
import { PlayArrow, FlipCameraAndroid } from '@material-ui/icons';
import FloatingAction from '../../components/FloatingAction';
import { getCharacterHealth, getEgoMax } from '../../utils/characterTools';

interface Props {
    char: Character;
}

export default function BattlePage(props: Props) {

    const { setHeaderTitle } = useContext(HeaderContext);
    const [step, setStep] = useState<number>(0);
    const { char } = props;

    useEffect(() => {
        setHeaderTitle(T.translate('navigator.battle') as string);
    }, [setHeaderTitle]);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <AppBar position='relative' style={{ borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
                <Toolbar>
                    <IconButton size="small" style={{ marginRight: '20px' }}>
                        <Badge badgeContent='Santé' color='primary' anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                            <Avatar style={{ width: '34px', height: '34px', backgroundColor: '#fafafa', color: 'black' }}>{getCharacterHealth(char)}</Avatar>
                        </Badge>
                    </IconButton>
                    <IconButton size="small" style={{ marginRight: '20px' }}>
                        <Badge badgeContent='Ego' color='primary' anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                            <Avatar style={{ width: '34px', height: '34px', backgroundColor: '#fafafa', color: 'black' }}>{getEgoMax(char) - char.ego}</Avatar>
                        </Badge>
                    </IconButton>
                    <IconButton size="small">
                        <Badge badgeContent='Tour' color='primary' anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                            <Avatar style={{ width: '34px', height: '34px', backgroundColor: '#fafafa', color: 'black' }}>1</Avatar>
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div style={{ width: '100%', height: 'calc(100% - 57px)', overflowY: 'auto' }}>
                <Typography variant='body1' component='p' className='card-overtitle'>Attaquer</Typography>
                <Card>
                    <List>
                        <ListItem role={undefined} button>
                            <ListItemText primary='Coup physique' />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments">
                                    <PlayArrow />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem role={undefined} button>
                            <ListItemText primary='Coup à arme blanche' />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments">
                                    <PlayArrow />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem role={undefined} button>
                            <ListItemText primary='Coup à arme à distance' />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments">
                                    <PlayArrow />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem role={undefined} button>
                            <ListItemText primary='Attaque mentale' />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments">
                                    <PlayArrow />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </Card>
                <Typography variant='body1' component='p' className='card-overtitle'>Défendre</Typography>
                <Card>
                    <List>
                        <ListItem role={undefined} button>
                            <ListItemText primary='Parer un coup' />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments">
                                    <PlayArrow />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem role={undefined} button>
                            <ListItemText primary='Esquiver une attaque' />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments">
                                    <PlayArrow />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem role={undefined} button>
                            <ListItemText primary='Défense mentale' />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments">
                                    <PlayArrow />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </Card>
                <Typography variant='body1' component='p' className='card-overtitle'>Soigner</Typography>
                <Card>
                    <List>
                        <ListItem role={undefined} button>
                            <ListItemText primary='Soin de blessure physique' />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments">
                                    <PlayArrow />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>

                        <ListItem role={undefined} button>
                            <ListItemText primary='Esquiver une attaque' />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments">
                                    <PlayArrow />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </Card>
                <span className='stats-bottom'></span>
                <FloatingAction onClick={() => { }} icon={<FlipCameraAndroid />} />
            </div>
        </div>
    );
}