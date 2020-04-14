import { makeStyles } from "@material-ui/styles";
import theme from "../../theme";

export const useStyles = makeStyles({
    container: {
        margin: theme.spacing(0.5)
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
        flexGrow: 1
    },
    formControl: {
        marginTop: theme.spacing(2)
    },
    trauma: {
        marginTop: -theme.spacing(0.5)
    },
    lock: {
        float: 'right'
    },
    traumaButton: {
        padding: theme.spacing(0.5)
    }
});