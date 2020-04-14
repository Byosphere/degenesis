import { makeStyles } from "@material-ui/styles";
import theme from "../../theme";

export const useStyles = makeStyles({
    attributeRepartitor: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '&>div': {
            display: 'flex'
        }
    },
    stepLabel: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    controls: {
        display: 'flex',
        justifyContent: "space-between",
        '& button': {
            marginTop: theme.spacing(2)
        }
    },
    container: {
        margin: theme.spacing(0.5),
        marginTop: '60px',
        display: 'flex',
        flex: 1,
        '&>div': {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflowY: 'auto'
        }
    },
    detailTypo: {
        fontSize: '0.9rem',
        opacity: 0.8,
        marginBottom: theme.spacing(1)
    },
    beliefDiv: {
        margin: theme.spacing(1) + 'px 0',
        display: 'flex',
        alignItems: 'center',
        '&>div': {
            marginRight: theme.spacing(0.5)
        }
    },
    dividerBelief: {
        margin: theme.spacing(2) + 'px 0',
    },
    bottomP: {
        marginBottom: theme.spacing(1)
    },
    topP: {
        marginTop: theme.spacing(0.5)
    },
    skills: {
        margin: 0,
        paddingLeft: theme.spacing(2)
    },
    cContainer: {
        margin: theme.spacing(2) + 'px 0'
    },
    cardMedia: {
        height: '100px'
    },
    money: {
        display: 'flex',
        alignItems: 'center',
        fontStyle: 'italic',
        '&>svg': {
            marginRight: theme.spacing(0.5)
        }
    },
    containerLast: {
        display: 'flex',
        '&>div': {
            flex: 1,
            marginLeft: theme.spacing(1)
        },
        '&>div:first-child': {
            marginLeft: '0',
            marginRight: theme.spacing(1)
        }
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        '&>svg': {
            marginRight: theme.spacing(2)
        }
    },
    skillSnackbar: {
        opacity: 0.9,
        '& > button': {
            color: 'white'
        }
    },
    skillList: {
        border: '1px solid rgba(0,0,0,0.2)',
        borderRadius: theme.spacing(1),
        paddingBottom: '0',
        marginBottom: theme.spacing(1)
    }
});