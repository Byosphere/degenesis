import { makeStyles } from "@material-ui/styles";
import theme from "../../theme";

export const useStyles = makeStyles({
    container: {
        height: '100%',
        padding: theme.spacing(0.5)
    },
    card: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    swipeableViews: {
        flex: 1
    },
    cardActions: {
        justifyContent: 'space-around',
        marginBottom: '8px'
    },
    note: {
        height: '100%',
        paddingTop: '0px',
        '&>div': {
            paddingBottom: theme.spacing(1),
            height: '100%'
        }
    },
    fullHeight: {
        '&>div': {
            height: '100%'
        },
        '&>div textarea': {
            height: '100% !important',
            overflowY: 'auto !important'
        }
    }
});