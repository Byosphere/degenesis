import { makeStyles } from "@material-ui/core";
import theme from "../../theme";

export const useStyles = makeStyles({
    searchbar: {
        padding: theme.spacing(1) + 'px ' + theme.spacing(2) + 'px',
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        flex: 1
    },
    search: {
        marginRight: theme.spacing(2),
        opacity: 0.5
    }
});