import { makeStyles } from "@material-ui/core";
import theme from "../../theme";
import { Props } from "./CustomSnackbar";

export const useStyles = makeStyles({
    snackbar: (props: Props) => ({
        '& > div': {
            backgroundColor: props.type === 'error' ? '#d32f2f' : '#4caf50'
        }
    }),
    message: {
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        marginRight: theme.spacing(2)
    }
});