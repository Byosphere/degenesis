import React, { Component } from 'react'
import { Menu, List, ListSubheader, ListItem, ListItemIcon, ListItemText, Collapse, Divider } from '@material-ui/core';
import { LANG } from '../../constants';
import { getLang, setLang, getLocalData, disconnect } from '../../utils/StorageManager';
import T from 'i18n-react';
import { Language, ExpandLess, ExpandMore, Android, Email, CardMembership, CloudDownload, PowerSettingsNew } from '@material-ui/icons';
import { saveFile } from '../../utils/helper';
import packageJson from '../../../package.json';

interface Props {
    anchorEl: Element;
    accountName: string;
    onClose: () => void;
    onDisconnect: () => void;
}

interface State {
    langExpand: boolean;
}

export default class SettingsMenu extends Component<Props, State> {

    public constructor(props: Props) {
        super(props);

        this.state = {
            langExpand: false
        };
    }


    public changeLang(value: string): void {
        setLang(value);
    }

    public handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        this.setState({ langExpand: !this.state.langExpand });
    }

    public saveData = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        saveFile(getLocalData(), 'degenesis.json');
    }

    public disconnect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        disconnect();
        this.props.onDisconnect();
    }

    public render() {

        const lang = getLang();

        return (
            <Menu
                id="lang-menu"
                anchorEl={this.props.anchorEl}
                keepMounted
                open={Boolean(this.props.anchorEl)}
                onClose={this.props.onClose}
            >
                <List
                    component="nav"
                    aria-labelledby="settings"
                    subheader={
                        <ListSubheader component="div" id="settings-subheader">
                            {T.translate('settings.settings')}
                        </ListSubheader>
                    }
                >
                    <ListItem button onClick={this.handleExpand}>
                        <ListItemIcon>
                            <Language />
                        </ListItemIcon>
                        <ListItemText primary={T.translate('settings.language')} secondary={T.translate('lang.' + lang)} />
                        {this.state.langExpand ? <ExpandLess style={{ marginLeft: '16px' }} /> : <ExpandMore style={{ marginLeft: '16px' }} />}
                    </ListItem>
                    <Collapse in={this.state.langExpand} timeout="auto" unmountOnExit style={{ margin: '0 16px' }}>
                        <List component="div">
                            {Object.keys(LANG).map((value, index) => (
                                <ListItem
                                    key={index}
                                    button
                                    onClick={() => this.changeLang(value)}
                                    disabled={lang === value}
                                >
                                    <ListItemText primary={T.translate('lang.' + value)} />
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                    <ListItem button onClick={this.saveData}>
                        <ListItemIcon>
                            <CloudDownload />
                        </ListItemIcon>
                        <ListItemText primary={T.translate('settings.exportdata')} secondary="degenesis.json" />
                    </ListItem>
                    {/* <ListItem button disabled>
                        <ListItemIcon>
                            <CloudUpload />
                        </ListItemIcon>
                        <ListItemText primary={T.translate('settings.importdata')} />
                    </ListItem> */}
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
                    <ListItem button onClick={this.disconnect}>
                        <ListItemIcon>
                            <PowerSettingsNew />
                        </ListItemIcon>
                        <ListItemText
                            primary={T.translate('settings.disconnect')}
                            secondary={T.translate('settings.currentaccount', { name: this.props.accountName })}
                        />
                    </ListItem>
                    {/* <ListItem style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <ListItemText secondary='This is a fan App, Degenesis belongs' />
                        <ListItemText secondary='to SixMoreVodka - All Rights Reserved' />
                    </ListItem> */}
                </List>
            </Menu>
        );
    }
}
