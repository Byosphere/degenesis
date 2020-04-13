import React, { useState } from 'react'
import { Card, List, ListSubheader, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { PlayArrow } from '@material-ui/icons';
import Searchbar from '../../components/Searchbar';

interface Props {

}

export default function ActionsList(props: Props) {

    const [filter, setFilter] = useState<string>('');

    return (
        <>
            <Searchbar
                style={{ margin: '5px 5px 0 5px' }}
                placeholder='Rechercher une action'
                onFilterChange={(value) => setFilter(value)}
            />
            <Card style={{ flex: 1, margin: '5px', overflowY: 'auto' }}>
                <List
                    component="nav"
                    subheader={
                        <ListSubheader component="div" style={{ backgroundColor: 'white' }}>
                            Attaquer
                    </ListSubheader>
                    }
                >
                    <ListItem button>
                        <ListItemText primary='Coup physique' />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                                <PlayArrow />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary='Coup à arme blanche' />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                                <PlayArrow />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary='Coup à arme à distance' />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                                <PlayArrow />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary='Attaque mentale' />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                                <PlayArrow />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
                <List
                    component="nav"
                    subheader={
                        <ListSubheader component="div" style={{ backgroundColor: 'white' }}>
                            Défendre
                    </ListSubheader>
                    }
                >
                    <ListItem button>
                        <ListItemText primary='Parer un coup' />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                                <PlayArrow />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary='Esquiver une attaque' />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                                <PlayArrow />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary='Défense mentale' />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                                <PlayArrow />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
                <List
                    component="nav"
                    subheader={
                        <ListSubheader component="div" style={{ backgroundColor: 'white' }}>
                            Soigner
                    </ListSubheader>
                    }
                >
                    <ListItem button>
                        <ListItemText primary='Coup physique' />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                                <PlayArrow />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
                <List
                    component="nav"
                    subheader={
                        <ListSubheader component="div" style={{ backgroundColor: 'white' }}>
                            Divers
                    </ListSubheader>
                    }
                >
                    <ListItem button>
                        <ListItemText primary='Recharger larme' />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                                <PlayArrow />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Card>
        </>
    );
}
