import { makeStyles } from "@material-ui/styles";
import theme from "../../theme";

export const useStyles = makeStyles({
    floatingAction: {
        position: 'absolute',
        bottom: '70px',
        right: theme.spacing(2),
        zIndex: 10,
    }
});