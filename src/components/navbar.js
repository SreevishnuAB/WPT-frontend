import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    backgroundColor: '#243447',
    borderTopStyle: 'solid',
    borderBottomStyle: 'solid',
    borderWidth: '1px',
    borderBottomColor: '#23C94A',
    borderTopColor: '#23C94A'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: '#23C94A',
  },
  title: {
    flexGrow: 1,
  },
  condRend:{
    display:'none',
  },
  logoutBtn: {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#23C94A',
    padding: '5px',
    color: '#23C94A'
  } 
}));

export default function NavBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" className={props.login ? classes.condRend :classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon className={props.login ? classes.condRend : ''} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.header}
          </Typography>
          <Button className={`${props.login ? classes.condRend:classes.logoutBtn} btn-logout`} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}