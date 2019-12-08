import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
  tlbrPlcehldr: theme.mixins.toolbar,
}));

export default function ViewWorkReport(props){

  const classes = useStyles();

  return(
    <div className={classes.root}>
      <div className={classes.tlbrPlcehldr}/>
      <h1 style={{color:"#ffffff"}}>TODO View Work Report</h1>
    </div>
  );
}