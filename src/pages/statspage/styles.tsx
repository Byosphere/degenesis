import { makeStyles } from "@material-ui/styles";
import theme from "../../theme";

export const useStyles = makeStyles({
    container: {
        margin: theme.spacing(0.5),
        '&>div:first-child': {
            position: 'relative'
        }
    },
    cardMedia: {
        height: '100px'
    },
    rankChip: {
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2),
        background: 'rgba(255,255,255,0.7)'
    },
    storyContent: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingTop: '0'
    },
    dialogContent: {
        marginTop: '56px',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing(3)
    },
    div: {
        display: 'flex',
        marginTop: theme.spacing(2)
    },
    textfieldRight: {
        flex: 1,
        marginRight: theme.spacing(1)
    },
    textfieldLeft: {
        flex: 1,
        marginLeft: theme.spacing(1)
    },
    textfieldTop: {
        marginTop: theme.spacing(2),
    },
    formControl: {
        marginTop: theme.spacing(2)
    },
    traumaContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    lock: {
        float: 'right'
    },
    traumaButton: {
        padding: '2px'
    },
    fullHeight: {
        flexGrow: 1,
        marginTop: theme.spacing(2),
        '&>div': {
            height: '100%'
        },
        '& textarea': {
            height: '100% !important',
            overflowY: 'auto !important'
        }
    },
    expansion: {
        marginBottom: theme.spacing(0.5)
    },
    expansionDetail: {
        flexDirection: 'column'
    },
    jaugeIcon: {
        margin: 0
    },
    jaugeContainer: {
        marginBottom: theme.spacing(1),
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: theme.spacing(1),
        borderBottom: '1px solid rgba(0,0,0,0.16)'
    },
    infoButton: {
        borderLeft: '1px solid rgba(0,0,0,0.16)',
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(0.5)
    },
    cardContent: {
        paddingTop: 0,
        paddingBottom: theme.spacing(2) + 'px !important'
    }
});