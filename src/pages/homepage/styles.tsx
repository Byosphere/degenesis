import { makeStyles } from "@material-ui/core";
import theme from "../../theme";
import { Character } from "../../models/Character";
import { CULTES } from "../../constants";

interface Props {
    char: Character;
}

export const useStyles = makeStyles({
    mainList: {
        height: 'calc(100% - 64px)',
        overflowY: 'auto'
    },
    card: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        '&>div': {
            height: '200px'
        }
    },
    cardContent: {
        flex: 1,
        height: 'calc(100% - 300px)'
    },
    subHeader: {
        background: 'white',
        '& span': {
            float: 'right'
        }
    },
    listItem: {
        background: '#F44336',
        margin: theme.spacing(0.5) + 'px 0',
        height: 'calc(100% - ' + theme.spacing(0.5) * 2 + 'px)',
        color: 'white',
        flexDirection: 'row-reverse',
        '& svg': {
            color: 'white'
        }
    },
    characterItem: {
        backgroundImage: (props: Props) => 'url(images/cultes/' + CULTES[props.char ? props.char.culte : 0].img + ')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '160px center',
        margin: theme.spacing(0.5) + 'px 0'
    },
    settingsMenu: {
        position: 'absolute',
        top: '3px',
        right: '3px',
        '& svg': {
            color: 'white'
        }
    },
    menu: {
        padding: '0 ' + theme.spacing(1) + 'px'
    },
    listText: {
        background: 'rgba(255, 255, 255, 0.3)',
        marginRight: '50px'
    },
    secondaryAction: {
        marginLeft: theme.spacing(2)
    },
    collapse: {
        margin: '0 ' + theme.spacing(2) + 'px'
    },
    divider: {
        marginBottom: theme.spacing(1)
    },
    bottomList: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
});