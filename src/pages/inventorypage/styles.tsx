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
        '& span': {
            opacity: 0.6
        }
    },
    itemPanel: {
        boxShadow: 'none',
        border: '1px solid rgba(0,0,0,0.15)',
        marginBottom: theme.spacing(0.5),
        borderRadius: theme.spacing(0.5),
        '&:before': {
            backgroundColor: 'transparent'
        },
        '&>div': {
            paddingLeft: theme.spacing(2),
        },
        '& section': {
            flex: 1,
            height: '100%',
            paddingLeft: theme.spacing(2),
            borderLeft: '1px solid rgba(0,0,0,0.15)',
        },
        '& section:first-child': {
            borderLeft: 'none',
            paddingRight: theme.spacing(1),
            paddingLeft: 0
        }
    },
    textfield: {
        marginBottom: theme.spacing(2)
    },
    dialogContent: {
        marginTop: '56px',
        display: 'flex',
        flexDirection: 'column'
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
    },
    miniAvatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        marginRight: theme.spacing(2),
        backgroundColor: '#444'
    },
    valueChip: {
        position: 'absolute',
        top: theme.spacing(1),
        right: '64px'
    },
    formSection: {
        display: 'flex',
        '&>div': {
            flex: 1
        },
        '&>div:first-child': {
            marginRight: theme.spacing(1)
        },
        '&>div:last-child': {
            marginLeft: theme.spacing(1)
        }
    },
    fullHeight: {
        flex: 1,
        '&>div': {
            height: '100%'
        },
        '&>div textarea': {
            height: '100% !important',
            overflowY: 'auto !important'
        }
    }
});