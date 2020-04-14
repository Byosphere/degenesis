import { makeStyles } from "@material-ui/styles";
import theme from "../../theme";

export const useStyles = makeStyles({
    shortDivider: {
        width: ' 50%',
        margin: theme.spacing(3) + 'px auto',
        border: 'none',
        borderBottom: '1px solid rgba(0,0,0,0.16)'
    }
});