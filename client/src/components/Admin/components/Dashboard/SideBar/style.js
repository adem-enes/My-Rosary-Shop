import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    nav: {
        height: '80vh',
        maxWidth: '200px',
        background: '#C8EAFF',
        padding: '10px 0px 10px 10px',
        borderRadius: '10px'
    },
    closeIcon: {
        cursor: 'pointer'
    },
    link: {
        paddingLeft: '5px',
        marginBottom: '5px',
        cursor: 'pointer',
        '&:hover': {
            background: '#fcfcfc',
        },
    },
    activeLink: {
        background: 'white',
        paddingLeft: '5px',
        borderRight: '0px',
        '-moz-border-radius': '5px 0px 0px 5px',
        '-webkit-border-radius': '5px 0px 0px 5px',
    },

}));