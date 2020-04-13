import React from 'react';
import { Zoom, Fab } from '@material-ui/core';

interface Props {
    icon: React.ReactNode;
    onClick: (event) => void;
    style?: React.CSSProperties;
}

export default function FloatingAction(props: Props) {

    return (
        <Zoom in={true} unmountOnExit>
            <Fab
                onClick={props.onClick}
                color='secondary'
                style={{ position: 'absolute', bottom: '70px', right: '16px', zIndex: 10, ...props.style }}
            >
                {props.icon}
            </Fab>
        </Zoom>
    );
}