import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    bottomNavigator: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        borderTop: '1px solid rgba(0, 0, 0, 0.16)',
        '& .Mui-selected': {
            color: '#d50000 !important'
        }
    }
});