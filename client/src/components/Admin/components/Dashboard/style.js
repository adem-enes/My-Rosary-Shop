import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root:{
    minHeight: '84.8vh',
    [theme.breakpoints.down('sm')]: {
      minHeight:' 120vh',
    },

    [theme.breakpoints.down('xs')]: {
      minHeight:' 150vh',
    },
  },
  nav: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  menuIcon: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    width: '50px',
    maxHeight: '80vh',
    background: '#C8EAFF',
    margin: '10px 5px',
    padding: '10px 0px 10px 10px',
    borderRadius: '10px',
  },
  noDisplay: {
    display: 'none',
  },
  displayMenuIcon: {
    display: 'content',
    width: '50px',
    maxHeight: '80vh',
    background: '#C8EAFF',
    margin: '10px 5px',
    padding: '10px 0px 10px 10px',
    borderRadius: '10px'
  },
}));