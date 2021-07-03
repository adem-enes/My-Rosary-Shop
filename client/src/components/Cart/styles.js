import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    display: 'flex',
  },
  title: {
    marginTop: '5%',
  },
  emptyButton: {
    minWidth: '120px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
  },
  checkoutButton: {
    minWidth: '120px',
  },
  link: {
    textDecoration: 'none',
  },
  cardDetails: {
    display: 'flex',
    flexDirection:'column',
    padding: '5vh',
    width: '100%',
    textAlign: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 0px 5px 1px #8a8a8a',
    maxHeight:'250px'
  },
  buttons:{
    display: 'flex',
  }
}));