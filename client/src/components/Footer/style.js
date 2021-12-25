import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    footer: {
        background: "#00022E",
        minHeight: "60px",
        color: "#FC86AA",
    },
    footerHeader: {
        textAlign: "right",
        justifyContent:'flex-end',
        alignItems:'center',
        display:'flex'
    },
    footerAddress: {
        textAlign:'right',
        display: 'flex',
        alignItems:'center',
        paddingRight:'10px',
        justifyContent:'flex-end',
        [theme.breakpoints.down('sm')]: {
            paddingRight:'0px',
            justifyContent:'center',
            textAlign:'center',
        },
    },
    footerPhnName: {
        width:'100%',
        textAlign:'right',
        display: 'flex',
        alignItems:'center',
        justifyContent:'flex-end',
        paddingRight:'20px',
        [theme.breakpoints.down('sm')]: {
            paddingLeft:'0px',
            justifyContent:'center',
            textAlign:'center',
        },
    }
}));