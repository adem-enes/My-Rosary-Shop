import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    root: {
        maxWidth: '100%',
    },
    media: {
        height: 0,
        paddingTop: '100%',
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cardButton: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    price: {
        padding: '10px',
    }
}));