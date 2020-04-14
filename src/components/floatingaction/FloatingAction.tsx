import React from 'react';
import { Zoom, Fab } from '@material-ui/core';
import { useStyles } from './styles';

interface Props {
    icon: React.ReactNode;
    onClick: (event) => void;
    classes?: string;
}

export default function FloatingAction(props: Props) {

    const classes = useStyles();

    return (
        <Zoom in={true} unmountOnExit>
            <Fab
                onClick={props.onClick}
                color='secondary'
                className={classes.floatingAction + ' ' + props.classes}
            >
                {props.icon}
            </Fab>
        </Zoom>
    );
}