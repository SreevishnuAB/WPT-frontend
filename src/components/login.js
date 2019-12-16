import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import '../App.css';
import Button from '@material-ui/core/Button';
import ToastNotification from './toast';

const drawerWidth = 240;
const useStyles = makeStyles((theme)=>({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  fullWidthRoot: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginLeft: '0',
  },
  form: {
    marginTop: '150px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#23C94A',
    height: '350px',
    width: '450px',
    padding: '75px 100px 70px 100px',
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#021D25',
    borderRadius: '5px'

  },
  formElement: {
    width: '250px',
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor:'#001215',
  },
  submitBtn:{
    color: '#23C94A',
    backgroundColor: '#001215',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#23C94A',
    width: '50px',
    padding: '5px 35px 5px 35px',
    marginLeft: '90px'
  }
}));

export default function Login(props){

  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openToast,setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({error:false,messageText:''});

  const handleToast = (open)=>{
    setOpenToast(open);
  }

  const handleSubmit = ()=>{
    if(!username || !password){
      setToastMessage({error:true,messageText:"Username and password cannot be empty"});
      setOpenToast(!openToast);
    }
    else{
      /* Get user details from db, create auth obj */
      //for testing
      const desgn = (username.toLowerCase() === "faculty")?"Faculty":(username.toLowerCase() === "group head")?"Group Head":false;
      const newAuthObj = (desgn !== false)? {state:true, user:{name:username,designation:desgn}}:{state:desgn,user:{name:"",designation:""}};
      props.onLogin(newAuthObj);
    }
  }

  return(
    <div className={props.login?classes.fullWidthRoot:classes.root}>
      <div className={classes.form}>
        <TextField
          className={classes.formElement}
          id="outlined-username-input"
          label="Username"
          variant="outlined"
          size="small"
          value={username}
          onChange={(e)=>{setUsername(e.target.value)}}
        />
        <TextField
          className={classes.formElement}
          id="outlined-password-input"
          label="Password"
          type="password"
          variant="outlined"
          size="small"
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
        />
        <Button className={`${classes.submitBtn} btn-submit`} onClick={handleSubmit}>Submit</Button>
      </div>
      <ToastNotification open={openToast} onClose={handleToast} message={toastMessage}/>
    </div>
  );
}