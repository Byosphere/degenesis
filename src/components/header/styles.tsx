import { makeStyles } from "@material-ui/core";

interface Props {
    disabled: boolean;
    dirty: boolean;
}

export const useStyles = makeStyles({
    toolbar: {
        paddingRight: '5px'
    },
    divider1: {
        margin: '0 5px'
    },
    divider2: {
        margin: '0 0 0 5px'
    },
    progress: {
        color: 'white'
    },
    divider3: {
        marginRight: '5px'
    },
    xpButton: {
        margin: '0 6px'
    },
    avatar: {
        backgroundColor: '#555',
        width: '24px',
        height: '24px'
    },
    saveButton: {
        pointerEvents: (props: Props) => props.disabled ? 'none' : 'initial',
        color: 'white',
        opacity: (props: Props) => props.dirty ? 1 : 0.4
    }
});