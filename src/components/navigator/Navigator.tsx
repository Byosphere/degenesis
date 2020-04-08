import React from 'react';
import './style.css';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Note, HowToReg, NextWeek, WifiTethering } from '@material-ui/icons';
import T from 'i18n-react';

interface Props {
    currentTab: number;
    onTabChange: (event: React.ChangeEvent<{}>, value: any) => void;
}

export default function (props: Props) {
    return (
        <div className='bottom-navigator'>
            <BottomNavigation
                value={props.currentTab}
                onChange={props.onTabChange}
            >
                <BottomNavigationAction label={T.translate('navigator.stats')} icon={<HowToReg />} />
                <BottomNavigationAction label={T.translate('navigator.inventory')} icon={<NextWeek />} />
                <BottomNavigationAction label={T.translate('navigator.potentials')} icon={<WifiTethering />} />
                <BottomNavigationAction label={T.translate('navigator.notes')} icon={<Note />} />
            </BottomNavigation>
        </div>
    );
}
