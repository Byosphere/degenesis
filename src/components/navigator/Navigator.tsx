import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Note, HowToReg, WifiTethering, BusinessCenter, Whatshot } from '@material-ui/icons';
import T from 'i18n-react';
import { useStyles } from './styles';

interface Props {
    currentTab: number;
    onTabChange: (event: React.ChangeEvent<{}>, value: any) => void;
}

export default function Navigator(props: Props) {

    const classes = useStyles();

    return (
        <div className={classes.bottomNavigator}>
            <BottomNavigation
                value={props.currentTab}
                onChange={props.onTabChange}
            >
                <BottomNavigationAction label={T.translate('navigator.stats')} icon={<HowToReg />} />
                <BottomNavigationAction label={T.translate('navigator.inventory')} icon={<BusinessCenter />} />
                <BottomNavigationAction label={T.translate('navigator.legacy')} icon={<WifiTethering />} />
                <BottomNavigationAction label={T.translate('navigator.notes')} icon={<Note />} />
                <BottomNavigationAction label={T.translate('navigator.battle')} icon={<Whatshot />} />
            </BottomNavigation>
        </div>
    );
}
