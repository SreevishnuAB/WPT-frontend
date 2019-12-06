import '../App.css';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      zIndex: theme.zIndex.drawer + 1,
    },
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    backgroundColor: '#243447',
    borderTopStyle: 'solid',
    borderBottomStyle: 'solid',
    borderWidth: '1px',
    borderBottomColor: '#23C94A',
    borderTopColor: '#23C94A',
  },
  tlbrPlcehldr: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    color: '#23C94A',
  },
  title: {
    flexGrow: 1,
    color: '#23C94A'
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
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const { container } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);


  const items = (props.grouphead === true)?
                  ["Work Reports By Date","Work Reports By User"] :
                  ["Create Work Report", "View Work Reports"];
 
  const drawer = (
    <div>
      <div className={classes.tlbrPlcehldr} />
      <Divider />
      <List>
        {items.map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" className={props.login ? classes.condRend :classes.menuButton} aria-label="open drawer" onClick={handleDrawerToggle}>
            <MenuIcon className={props.login ? classes.condRend : ''} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.header}
          </Typography>
          <Button className={`${props.login ? classes.condRend:classes.logoutBtn} btn-logout`} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="js">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}