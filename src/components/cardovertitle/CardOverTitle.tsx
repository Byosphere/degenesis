import React from 'react'
import { Typography } from '@material-ui/core';
import { useStyles } from './styles';

export default function CardOverTitle(props: { title: React.ReactNode, className?: string }) {

    const classes = useStyles();

    return (
        <Typography variant='body1' component='p' className={classes.typography + ' ' + props.className}>{props.title}</Typography>
    );
}