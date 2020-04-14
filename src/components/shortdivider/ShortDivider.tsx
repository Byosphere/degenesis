import React from 'react';
import { useStyles } from './styles';

export default function ShortDivider() {
    return (<hr className={useStyles().shortDivider} />);
}