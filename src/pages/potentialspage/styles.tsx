import { makeStyles } from "@material-ui/styles";
import theme from "../../theme";

export const useStyles = makeStyles({
    container: {
        margin: theme.spacing(0.5)
    },
    card: {
        marginBottom: theme.spacing(0.5),
        padding: theme.spacing(2) + 'px 24px'
    },
    dialogContent: {
        marginTop: '56px',
        paddingTop: 0
    },
    listSubHeader: {
        background: 'white'
    },
    typography: {
        alignSelf: 'center',
        marginLeft: theme.spacing(2)
    },
    expansion: {
        marginBottom: theme.spacing(0.5)
    },
    expansionDetail: {
        flexDirection: 'column'
    }
});