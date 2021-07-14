import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  image: {
    width: 128,
    height: 128,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop:'8px',
  },
  cartActions: {
    marginRight:'1vh',
    justifyContent: 'space-between',
    flexDirection:'column',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      minHeight:' 100px',
    },
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: '1',
  },
  removeButton: {
    cursor: 'pointer',
    width:'60px',
    textAlign:'center',
    "&:hover": {
      background: '#eeeeee',
    }
  }
}));