import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  root: {
    [theme.breakpoints.up('lg')]: {
      minHeight: '85vh',
    },
    [theme.breakpoints.only('md')]: {
      minHeight: '82vh',
    },
    [theme.breakpoints.only('sm')]: {
      minHeight: '86.5vh',
    },
    [theme.breakpoints.only('xs')]: {
      minHeight: '82.3vh',
    },
  },
  media: {
    [theme.breakpoints.up('lg')]: {
      height: 400,
    },
    [theme.breakpoints.only('md')]: {
      height: 300,
    },
    [theme.breakpoints.down('sm')]: {
      height: 200,
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));