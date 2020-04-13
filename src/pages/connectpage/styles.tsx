import { makeStyles } from "@material-ui/core";
import theme from "../../theme";

export const useStyles = makeStyles({
    mainCard: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        paddingTop: '10%'
    },
    figure: {
        textAlign: 'center',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(4)
    },
    cardContent: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center'
    },
    pseudo: {
        marginBottom: theme.spacing(2)
    },
    connect: {
        marginTop: theme.spacing(4),
        marginRight: theme.spacing(2)
    },
    register: {
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(2)
    },
    figcaption: {
        opacity: 0.8
    },
    dialogContent: {
        marginTop: '56px'
    },
    dialogPseudo: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(2)
    },
    dialogMargin: {
        marginBottom: theme.spacing(3)
    }
});