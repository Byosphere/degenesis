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
        marginRight: theme.spacing(2)
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
        paddingRight: '12px',
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
    cardList: {
        flex: 1,
        marginTop: '5px',
        overflow: 'auto'
    },
    subHeader: {
        background: 'white'
    }
});