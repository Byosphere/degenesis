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
        margin: '12px 12px 12px ' + theme.spacing(2) + 'px',
        backgroundColor: '#444',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        '& svg': {
            margin: theme.spacing(1)
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
        backgroundColor: 'white'
    },
    expansionPanel: {
        justifyContent: 'space-between',
        textTransform: 'capitalize',
        '& span': {
            opacity: 0.6
        }
    },
    itemPanel: {
        boxShadow: 'none',
        '&:before': {
            backgroundColor: 'transparent'
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
        top: '184px',
        borderRadius: theme.spacing(0.5)
    },
    iconList: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    slider: {
        padding: theme.spacing(1),
        margin: 0,
        '&>span:first-child': {
            color: 'rgba(0, 0, 0, 0.54)'
        }
    },
    selected: {
        '&>span:first-child': {
            borderBottom: '2px solid red',
            paddingBottom: theme.spacing(0.5)
        }
    }
});