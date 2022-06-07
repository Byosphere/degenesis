import { makeStyles } from "@material-ui/core";
import theme from "../../theme";

export const useStyles = makeStyles({
    bottomNavigator: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        borderTop: '1px solid rgba(0, 0, 0, 0.16)',
        '& .Mui-selected': {
            color: '#d50000 !important'
        }
    },
    drawer: {
        display: 'flex',
        alignItems: 'center',
        width: '64px',
        zIndex: 2,
        paddingTop: theme.spacing(1) + 64
    }
});