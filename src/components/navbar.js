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
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    zIndex: theme.zIndex.appBar-1,
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
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
    backgroundColor: '#243447',
    color: '#ffffff'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      visibility: 'hidden',
    },
    color: '#23C94A',
  },
  title: {
    flexGrow: 1,
    color: '#23C94A'
  },
  fullWidthAppbar: {
    width:'100%',
    marginLeft: '0'
  },
  condRend:{
    visibility: 'hidden',
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
  drawerBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
}));

export default function NavBar(props) {
  const classes = useStyles();
  const { container } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const items = (props.grouphead === true)?
                  ["Work Reports By Date","Work Reports By User"] :
                  ["Create Work Report", "View Work Reports"];
 
  const drawer = (
    <div>
      <div className={`${classes.tlbrPlcehldr} ${classes.drawerBar}`}>
        <Typography variant="h5">
          User
          <br/>
          <Typography style={{fontSize: '15px'}} variant="h6" component="span">
            Group Head
          </Typography>
        </Typography>
        <IconButton style={{color:'#23C94A'}} aria-label="close drawer" component="span" onClick={handleDrawerToggle}>
          {mobileOpen && <ChevronLeftOutlinedIcon />}
        </IconButton>
      </div>
      <Divider style={{backgroundColor: '#23C94A'}}/>
      <List>
        {items.map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider style={{backgroundColor: '#23C94A'}} />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={!props.login ? classes.appBar : classes.fullWidthAppbar}>
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
      {!props.login && <nav className={classes.drawer} aria-label="mailbox folders">
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
      </nav>}
    </div>
  );
}