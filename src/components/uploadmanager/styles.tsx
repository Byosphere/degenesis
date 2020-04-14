import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    dialogContent: {
        marginTop: '56px',
        display: 'flex',
        flexDirection: 'column'
    },
    fullHeight: {
        flexGrow: 1,
        '&>div': {
            height: '100%'
        },
        '& textarea': {
            height: '100% !important',
            overflowY: 'auto !important'
        }
    }
});