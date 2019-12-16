import '../App.css';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
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
    backgroundColor: '#021D25',
    borderTopStyle: 'solid',
    borderBottomStyle: 'solid',
    borderWidth: '1px',
    borderBottomColor: '#23C94A',
    borderTopColor: '#23C94A',
  },
  tlbrPlcehldr: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#021D25',
    color: '#23C94A',
    borderWidth:'1px 1px 1px 1px',
    borderColor:'#23C94A',
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
    color: '#23C94A',
    backgroundColor: '#001215'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawerBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderColor: '#23C94A',
  },
  drawerBtnContainer: {
    verticalAlign: 'top',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  dbBtn: {
    marginTop: '5px',
    padding: '15px 10px 15px 10px',
    borderColor: '#23C94A',
    borderStyle: 'solid',
    borderWidth: '1px 0px 1px 0px',
    borderRadius: '0',
    color: '#23C94A',
    backgroundColor: '#001215'
  },
  dbBtnActive: {
    marginTop: '5px',
    padding: '15px 10px 15px 10px',
    borderColor: '#23C94A',
    borderStyle: 'solid',
    borderWidth: '1px 0px 1px 0px',
    borderRadius: '0',
    color: '#001215',
    backgroundColor: '#23C94A'
  }

}));

export default function NavBar(props) {
  const classes = useStyles();
  const { container } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeTab,setActiveTab] = React.useState('db-btn0');

  const handleTabPress = (event)=>{
    event.persist();
    let activeBtn;
    if(!event.target.classList.contains("db-btn0") && !event.target.classList.contains("db-btn1"))
//      console.log(event.target.parentElement.classList);
      activeBtn = event.target.parentElement.classList[3];
    else
//      console.log(event.target.classList);
      activeBtn = event.target.classList[3];
//    console.log(activeBtn);
    if(activeTab === '' || activeTab !== activeBtn){
      setActiveTab(activeBtn);
      props.onTabSwitch(activeBtn);
    }
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = ()=>{
    let newAuthObj = {state:false,user:{name:"",designation:""}};
    props.onLogout(newAuthObj);
  }

  const drawer = (
    <div>
      <div className={`${classes.tlbrPlcehldr} ${classes.drawerBar}`}>
        <Typography style={{fontSize:'20px',paddingTop:'5px'}} variant="h5">
          {props.user.name}
          <br/>
          <Typography style={{fontSize: '15px'}} variant="h6" component="span">
            {props.user.designation}
          </Typography>
        </Typography>
        <IconButton style={{color:'#23C94A'}} aria-label="close drawer" component="span" onClick={handleDrawerToggle}>
          {mobileOpen && <ChevronLeftOutlinedIcon />}
        </IconButton>
      </div>
      <Divider style={{backgroundColor: '#23C94A'}}/>
        <div className={classes.drawerBtnContainer}>
        {props.tablabels.map((text, index) => (
          <Button className={(activeTab === `db-btn${index}`)?`db-btn${index} ${classes.dbBtnActive} btn-db`:`db-btn${index} ${classes.dbBtn} btn-db`} onClick={handleTabPress} key={index}>{text}</Button>
        ))}
        </div>
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
            Work Progress Tracker
          </Typography>
          <Button className={`${props.login ? classes.condRend:classes.logoutBtn} btn-logout`} onClick={handleLogout} color="inherit">Logout</Button>
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