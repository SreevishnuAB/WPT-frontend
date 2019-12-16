import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme)=>({
  toast:{
    border: '1px solid #001215',
    borderRadius: '2px',
  },
  toastContent:{
    backgroundColor: '#23C94A',
    color: '#001215',
  },
  errorToast:{
    backgroundColor: '#FF0000',
    color: '#ffffff'
  },
  close: {
    padding: theme.spacing(0.5),
  },
}));

const ToastNotification = (props)=>{

  const classes = useStyles();
  
  return(
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    className={classes.toast}
    open={props.open}
    autoHideDuration={3000}
    onClose={()=>{props.onClose(!props.open)}}
    ContentProps={{
      'aria-describedby': 'message-id',
      'className':(props.message.error)?classes.errorToast:classes.toastContent,
    }}
    message={<span id="message-id">{props.message.messageText}</span>}
    action={[
      <IconButton
        key="close"
        aria-label="close"
        color="inherit"
        className={classes.close}
        onClick={()=>{props.onClose(!props.open)}}
      >
        <CloseIcon />
      </IconButton>,
    ]}
  />
  );
}

export default ToastNotification;