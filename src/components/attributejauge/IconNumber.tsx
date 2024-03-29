import React from 'react';
import { Backspace, BackspaceOutlined, LooksOne, LooksOneOutlined, LooksTwo, Looks3, LooksTwoOutlined, Looks3Outlined, Looks4, Looks4Outlined, Looks5, Looks5Outlined, Looks6, Looks6Outlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';

interface Props {
    num?: number;
    active?: boolean;
    onClick: (num: number) => void;
    locked?: boolean;
}

export default function IconNumber(props: Props) {

    const { num, active, locked } = props;
    const classes = makeStyles({
        iconNumber: {
            marginRight: '3px'
        }
    });

    function onClick(event: React.MouseEvent<any>) {
        if (locked) return;
        event.stopPropagation();
        props.onClick(num);
    }

    const itemProps = { className: classes['iconNumber'], onClick };

    switch (num) {
        case 0:
            return active ? <Backspace {...itemProps} /> : <BackspaceOutlined {...itemProps} />;
        case 1:
            return active ? <LooksOne {...itemProps} /> : <LooksOneOutlined {...itemProps} />;
        case 2:
            return active ? <LooksTwo {...itemProps} /> : <LooksTwoOutlined {...itemProps} />;
        case 3:
            return active ? <Looks3 {...itemProps} /> : <Looks3Outlined {...itemProps} />;
        case 4:
            return active ? <Looks4 {...itemProps} /> : <Looks4Outlined {...itemProps} />;
        case 5:
            return active ? <Looks5 {...itemProps} /> : <Looks5Outlined {...itemProps} />;
        case 6:
            return active ? <Looks6 {...itemProps} /> : <Looks6Outlined {...itemProps} />;
        default:
            return null;
    }
}