import { makeStyles } from "@material-ui/core";
import theme from "../../theme";

interface Props {
    potential: boolean;
    attribute: boolean;
    disabled: boolean;
    value: number;
}

export const useStyles = makeStyles({
    attributeJauge: (props: Props) => ({
        width: '100%',
        alignItems: 'center',
        paddingLeft: theme.spacing(2),
        position: 'relative',
        marginBottom: props.attribute ? 0 : theme.spacing(1),
        borderBottom: props.attribute ? 'none' : '1px solid rgba(0, 0, 0, 0.16)',
        color: props.attribute ? '#FFF' : '#555',
        paddingTop: (!props.potential && !props.attribute) ? theme.spacing(1) : '',
        pointerEvents: props.disabled ? 'none' : 'initial',
        backgroundColor: props.attribute ? '#444' : '',
        marginRight: props.attribute ? theme.spacing(1) : ''
    }),
    lastAttribute: {
        '&:last-child': {
            borderBottom: 'none',
            marginBottom: 0,
        }
    },
    infoButton: {
        position: 'absolute',
        left: '-18px',
        top: '6px',
        padding: '1px',
        background: 'white !important',
        color: '#444'
    },
    addButton: (props: Props) => ({
        position: 'absolute',
        right: '-10px',
        top: '-10px',
        padding: '1px',
        background: 'white',
        color: props.value === 6 ? '' : '#444',
    }),
    label1: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        flex: 1,
    },
    label2: (props: Props) => ({
        position: 'absolute',
        color: 'rgba(0, 0, 0, 0.87)',
        top: '0',
        opacity: props.disabled ? 0.3 : 1
    }),
    container: (props: Props) => ({
        paddingRight: props.attribute ? theme.spacing(2) : '',
        flex: 1,
        display: 'flex',
        justifyContent: (props.potential || props.attribute) ? 'flex-end' : 'flex-start',
        alignItems: 'center',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        opacity: props.disabled ? 0.3 : 1
    }),
    sideButtons: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'flex-end',
        '& hr': {
            margin: '0 ' + theme.spacing(0.5) + 'px 0 0',
            border: 'none',
            borderLeft: '1px solid rgba(0,0,0,0.16)'
        },
        '& button:nth-child(2)': {
            margin: '0 8px'
        }
    },
    iconNumber: {
        marginRight: '3px'
    }
});