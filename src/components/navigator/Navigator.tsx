import React from 'react';
import { BottomNavigation, BottomNavigationAction, Drawer, IconButton, Tooltip, useMediaQuery } from '@material-ui/core';
import { Note, HowToReg, WifiTethering, BusinessCenter, Whatshot } from '@material-ui/icons';
import T from 'i18n-react';
import { useStyles } from './styles';

interface Props {
    currentTab: number;
    onTabChange: (event: React.ChangeEvent<{}>, value: any) => void;
}

export default function Navigator(props: Props) {

    const classes = useStyles();
    const matches = useMediaQuery('(min-width:1000px)');

    function handleClickChange(value) {
        return () => {
            props.onTabChange(undefined, value);
        }
    }

    if (matches) {
        return (
            <Drawer variant="permanent" classes={{ paper: classes.drawer }}>
                <Tooltip title={T.translate('navigator.stats')} placement="right">
                    <IconButton color={props.currentTab === 0 ? 'secondary' : 'default'} onClick={handleClickChange(0)}>
                        <HowToReg />
                    </IconButton>
                </Tooltip>
                <Tooltip title={T.translate('navigator.inventory')} placement="right">
                    <IconButton color={props.currentTab === 1 ? 'secondary' : 'default'} onClick={handleClickChange(1)}>
                        <BusinessCenter />
                    </IconButton>
                </Tooltip>
                <Tooltip title={T.translate('navigator.legacy')} placement="right">
                    <IconButton color={props.currentTab === 2 ? 'secondary' : 'default'} onClick={handleClickChange(2)}>
                        <WifiTethering />
                    </IconButton>
                </Tooltip>
                <Tooltip title={T.translate('navigator.battle')} placement="right">
                    <IconButton color={props.currentTab === 3 ? 'secondary' : 'default'} onClick={handleClickChange(3)}>
                        <Whatshot />
                    </IconButton>
                </Tooltip>
                <Tooltip title={T.translate('navigator.notes')} placement="right">
                    <IconButton color={props.currentTab === 4 ? 'secondary' : 'default'} onClick={handleClickChange(4)}>
                        <Note />
                    </IconButton>
                </Tooltip>
            </Drawer>
        );
    } else {
        return (
            <div className={classes.bottomNavigator}>
                <BottomNavigation
                    value={props.currentTab}
                    onChange={props.onTabChange}
                >
                    <BottomNavigationAction label={T.translate('navigator.stats')} icon={<HowToReg />} />
                    <BottomNavigationAction label={T.translate('navigator.inventory')} icon={<BusinessCenter />} />
                    <BottomNavigationAction label={T.translate('navigator.legacy')} icon={<WifiTethering />} />
                    <BottomNavigationAction label={T.translate('navigator.battle')} icon={<Whatshot />} />
                    <BottomNavigationAction label={T.translate('navigator.notes')} icon={<Note />} />
                </BottomNavigation>
            </div>
        );
    }
}
