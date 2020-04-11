import React, { useState } from 'react'
import { Menu, List, ListSubheader, ListItem, ListItemIcon, ListItemText, Collapse, Divider } from '@material-ui/core';
import { LANG } from '../../constants';
import { getLang, setLang, disconnect } from '../../utils/StorageManager';
import T from 'i18n-react';
import { Language, ExpandLess, ExpandMore, Android, Email, CardMembership, PowerSettingsNew, CloudUpload } from '@material-ui/icons';
import packageJson from '../../../package.json';

interface Props {
    anchorEl: Element;
    accountName: string;
    onClose: () => void;
    onDisconnect: () => void;
    onUpload: () => void;
}

interface State {
    langExpand: boolean;
}

export default function SettingsMenu(props: Props) {

    const lang = getLang();
    const [expanded, setExpanded] = useState<boolean>(false);

    function handleDisconnect() {
        disconnect();
        props.onDisconnect();
    }

    return (
        <Menu
            id="lang-menu"
            anchorEl={props.anchorEl}
            keepMounted
            open={Boolean(props.anchorEl)}
            onClose={props.onClose}
        >
            <List
                component="nav"
                aria-labelledby="settings"
                subheader={
                    <ListSubheader component="div" style={{ backgroundColor: 'white' }}>
                        {T.translate('settings.settings')}
                    </ListSubheader>
                }
            >
                <ListItem button onClick={() => setExpanded(!expanded)}>
                    <ListItemIcon>
                        <Language />
                    </ListItemIcon>
                    <ListItemText primary={T.translate('settings.language')} secondary={T.translate('lang.' + lang)} />
                    {expanded ? <ExpandLess style={{ marginLeft: '16px' }} /> : <ExpandMore style={{ marginLeft: '16px' }} />}
                </ListItem>
                <Collapse in={expanded} timeout="auto" unmountOnExit style={{ margin: '0 16px' }}>
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
                <Divider />
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
                <Divider style={{ marginBottom: '10px' }} />
                <ListItem style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <ListItemText secondary='This is a fan App, Degenesis belongs' />
                    <ListItemText secondary='to SixMoreVodka - All Rights Reserved' />
                </ListItem>
            </List>
        </Menu>
    );
}
