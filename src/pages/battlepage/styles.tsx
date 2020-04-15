import { makeStyles } from "@material-ui/styles";
import theme from "../../theme";

export const useStyles = makeStyles({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    topBar: {
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        '& button:first-child': {
            margin: '0 20px 0 4px'
        },
        '& button': {
            margin: '0 20px'
        }
    },
    topText: {
        flex: 1,
        textAlign: 'center'
    },
    chipManager: {
        margin: '5px',
        display: 'flex'
    },
    searchbar: {
        margin: '0 5px'
    },
    battleFab: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& button': {
            paddingLeft: '24px'
        },
        '& svg': {
            marginLeft: '16px'
        }
    },
    infoButton: {
        width: '34px',
        height: '34px',
        backgroundColor: '#fafafa',
        color: 'black'
    }
});