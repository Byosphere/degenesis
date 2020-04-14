import { makeStyles } from "@material-ui/styles";
import theme from "../../theme";

export const useStyles = makeStyles({
    container: {
        margin: theme.spacing(0.5)
    },
    card: {
        marginBottom: theme.spacing(0.5)
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
    expansionDetail: {
        flexDirection: 'column'
    }
});