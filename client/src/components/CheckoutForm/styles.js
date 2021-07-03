import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root:{
    display: 'flex',
    justifyContent: 'center',
    margin: '0',
    padding: '0',
    width: '100%',
  },
  cartInfos: {
    paddingTop: '2vh',
  },
  cartVisual:{
  },
  cardDetails: {
    display: 'flex',
    marginLeft: '2vh',
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
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: '1',  
  }
}));