import React from 'react'
import { Paper, InputBase } from '@material-ui/core';
import { Search } from '@material-ui/icons';

interface Props {
    placeholder: string;
    style?: React.CSSProperties;
    onFilterChange?: (value: string) => void;
}

export default function Searchbar(props: Props) {

    return (
        <Paper component="form" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', ...props.style }}>
            <Search style={{ marginRight: '16px', opacity: 0.5 }} />
            <InputBase
                placeholder={props.placeholder}
                style={{ flex: 1 }}
                onChange={(event) => props.onFilterChange && props.onFilterChange(event.target.value)}
            />
        </Paper>
    );
}
