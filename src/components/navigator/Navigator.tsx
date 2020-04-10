import React from 'react';
import './style.css';
import { BottomNavigation, BottomNavigationAction, Divider } from '@material-ui/core';
import { Note, HowToReg, WifiTethering, ExitToApp, BusinessCenter } from '@material-ui/icons';
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
                <BottomNavigationAction label={T.translate('navigator.inventory')} icon={<BusinessCenter />} />
                <BottomNavigationAction label={T.translate('navigator.potentials')} icon={<WifiTethering />} />
                <BottomNavigationAction label={T.translate('navigator.notes')} icon={<Note />} />
                <Divider className='navigator-divider' />
                <BottomNavigationAction label={T.translate('navigator.back')} icon={<ExitToApp />} />
            </BottomNavigation>
        </div>
    );
}
