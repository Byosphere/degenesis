import React, { useState } from 'react'
import { Menu, List, ListSubheader, ListItem, ListItemIcon, ListItemText, Collapse, Divider } from '@material-ui/core';
import { LANG } from '../../constants';
import { getLang, setLang, disconnect } from '../../utils/StorageManager';
import T from 'i18n-react';
import { Language, ExpandLess, ExpandMore, Android, Email, CardMembership, PowerSettingsNew, CloudUpload } from '@material-ui/icons';
import packageJson from '../../../package.json';
import { useStyles } from './styles';

interface Props {
    anchorEl: Element;
    accountName: string;
    onClose: () => void;
    onDisconnect: () => void;
    onUpload: () => void;
}

export default function SettingsMenu(props: Props) {

    const lang = getLang();
    const [expanded, setExpanded] = useState<boolean>(false);
    const classes = useStyles();

    function handleDisconnect() {
        disconnect();
        props.onDisconnect();
    }

    return (
        <Menu
            classes={{ paper: classes.menu }}
            anchorEl={props.anchorEl}
            keepMounted
            open={Boolean(props.anchorEl)}
            onClose={props.onClose}
        >
            <List
                component="nav"
                aria-labelledby="settings"
                subheader={
                    <ListSubheader component="div" className={classes.subHeader}>
                        {T.translate('settings.settings')}
                    </ListSubheader>
                }
            >
                <ListItem button onClick={() => setExpanded(!expanded)}>
                    <ListItemIcon>
                        <Language />
                    </ListItemIcon>
                    <ListItemText primary={T.translate('settings.language')} secondary={T.translate('lang.' + lang)} />
                    {expanded ? <ExpandLess className={classes.secondaryAction} /> : <ExpandMore className={classes.secondaryAction} />}
                </ListItem>
                <Collapse in={expanded} timeout="auto" unmountOnExit className={classes.collapse}>
                    <List component="div">
                        {Object.keys(LANG).map((value, index) => (
                            <ListItem
                                key={index}
                                button
                                onClick={() => setLang(value)}
                                disabled={lang === value}
                            >
                                <ListItemText primary={T.translate('lang.' + value)} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
                <ListItem button onClick={props.onUpload}>
                    <ListItemIcon>
                        <CloudUpload />
                    </ListItemIcon>
                    <ListItemText
                        primary={T.translate('settings.importdata')}
                        secondary={T.translate('settings.importsub')}
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Email />
                    </ListItemIcon>
                    <ListItemText
                        primary={T.translate('settings.contact')}
                        secondary='degenesisapp@gmail.com'
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Android />
                    </ListItemIcon>
                    <ListItemText primary={T.translate('settings.version')} secondary={packageJson.version} />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <CardMembership />
                    </ListItemIcon>
                    <ListItemText primary={T.translate('settings.license')} secondary="Creative Commons" />
                </ListItem>
                <ListItem button onClick={handleDisconnect}>
                    <ListItemIcon>
                        <PowerSettingsNew />
                    </ListItemIcon>
                    <ListItemText
                        primary={T.translate('settings.disconnect')}
                        secondary={T.translate('settings.currentaccount', { name: props.accountName })}
                    />
                </ListItem>
                <Divider className={classes.divider} />
                <ListItem className={classes.bottomList}>
                    <ListItemText secondary='This is a fan App, Degenesis belongs' />
                    <ListItemText secondary='to SixMoreVodka - All Rights Reserved' />
                </ListItem>
            </List>
        </Menu>
    );
}
