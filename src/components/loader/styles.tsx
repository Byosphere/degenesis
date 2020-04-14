import { makeStyles } from "@material-ui/core";
import theme from "../../theme";


export const useStyles = makeStyles({
    card: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: 'center'
    },
    figure: {
        textAlign: 'center',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(4)
    },
    progress: {
        marginTop: 'calc(50% - 25px)'
    },
    text: {
        marginTop: '10px'
    }
});