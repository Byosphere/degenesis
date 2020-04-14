import { makeStyles } from "@material-ui/core";
import theme from "../../theme";

export const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - ' + theme.spacing(1) + 'px)',
        margin: theme.spacing(0.5),
        '&>div:first-child': {
            display: 'flex'
        }
    },
    headButton: {
        marginRight: theme.spacing(2),
    },
    badge: {
        whiteSpace: 'nowrap'
    },
    searchbar: {
        marginTop: theme.spacing(0.5)
    },
    avatar: {
        backgroundColor: '#444'
    },
    customBadge: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 16px',
        maxWidth: '100px',
        '& svg': {
            width: '12px',
            height: '12px',
            marginLeft: '2px'
        }
    },
    pets: {
        flex: 1,
        margin: '12px',
        backgroundColor: '#444',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        '& svg': {
            margin: '12px'
        },
        '& p': {
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '40px'
        }
    },
    clearPet: {
        padding: 0,
        color: 'white'
    },
    cardList: {
        flex: 1,
        marginTop: theme.spacing(0.5),
        overflow: 'auto',
        padding: theme.spacing(0.5) + 'px ' + theme.spacing(2) + 'px'
    },
    subHeader: {
        background: 'white'
    },
    cardOverTitle: {
        top: theme.spacing(0.5),
        margin: theme.spacing(1),
        position: 'sticky',
        zIndex: 5,
        backgroundColor: '#dcdcdc'
    },
    expansionPanel: {
        justifyContent: 'space-between',
        textTransform: 'capitalize',
        '& span': {
            opacity: 0.6
        }
    },
    textfield: {
        marginBottom: theme.spacing(2)
    },
    dialogContent: {
        marginTop: '56px'
    },
    weightSize: {
        position: "fixed",
        right: theme.spacing(1),
        top: '196px'
    },
    iconList: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing(2)
    }
});