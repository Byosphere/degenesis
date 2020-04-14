import React from 'react'
import { Paper, InputBase } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useStyles } from './styles';

interface Props {
    placeholder: string;
    className?: string;
    onFilterChange?: (value: string) => void;
}

export default function Searchbar(props: Props) {

    const classes = useStyles();

    return (
        <Paper component="form" className={classes.searchbar + ' ' + props.className}>
            <Search className={classes.search} />
            <InputBase
                placeholder={props.placeholder}
                className={classes.input}
                onChange={(event) => props.onFilterChange && props.onFilterChange(event.target.value)}
            />
        </Paper>
    );
}
