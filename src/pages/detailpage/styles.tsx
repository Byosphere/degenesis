import { makeStyles } from "@material-ui/core";
import theme from "../../theme";

interface Props {
    disabled: boolean;
    dirty: boolean;
}

export const useStyles = makeStyles({
    container: {
        height: 'calc(100% - 57px)',
        overflowY: 'auto'
    },
    saveButton: {
        position: 'absolute',
        right: theme.spacing(0.5),
        top: theme.spacing(0.5),
        zIndex: 1200,
        pointerEvents: (props: Props) => props.disabled ? 'none' : 'initial',
        color: 'white',
        opacity: (props: Props) => props.dirty ? 1 : 0.4
    },
    progress: {
        color: 'white'
    }
});