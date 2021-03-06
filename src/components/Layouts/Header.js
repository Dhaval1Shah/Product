import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Tooltip from '@material-ui/core/Tooltip';
import AuthApi from '../Services/Authapi';
import ls from "local-storage";
import Logo from "../../Images/logo.png";
import FontAwesomeIconComponent from './FontAwesomeIconComponent';
import Nav from './Nav';
import { revokeAccess } from '../../ScreenShot';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import { Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';



const drawerWidth = 240;

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const opens = Boolean(anchorEl);
  const [ds, setDs] = React.useState(false);

  const handleClick = () => {
    setDs(!ds);
  };







  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  const logOut = async (e) => {

    outTimer();
    let logOut = await AuthApi.logout();
    if (logOut.status === true) {
      ls.set("authToken", false);
      props.setAutUser({ authToken: false, authUser: false })
      revokeAccess();
    }
    ls.clear();
    window.location.reload();
  }

  const outTimer = async (e) => {
    await AuthApi.outTime();
  }



  // useEffect(
  //   () =>
  //   setTimeout(() => {
  //     console.log(props.roles)
  //   }, 10000));

  // console.log(props.roles)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            className={classes.ds}
            color="inherit"><AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={opens}
            onClose={handleClose}
          >
            <MenuItem onClick={(e) => { e.preventDefault(); props.history.push('/profile') }} primary="Profile" title="Profile" placement="right">Profile</MenuItem>
            <MenuItem onClick={(e) => { logOut(e) }}>Logout</MenuItem>
          </Menu>

        </Toolbar>

      </AppBar>


      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <img style={{ height: "35px", paddingRight: "30px" }} src={Logo} alt="ds" />
          <h1 style={{ fontSize: "20px", paddingRight: "20px" }}>CPSI EMS</h1>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {/* <Tooltip title="Dashabord" placement="right">
            <ListItem button onClick={(e) => { e.preventDefault(); props.history.push('/dashboard') }}  >
              <ListItemIcon>
                <FontAwesomeIconComponent classes="fa fa-home" colorName="primary" fontSize={"small"} />
              </ListItemIcon>
              <ListItemText primary="Dashabord" />
            </ListItem>
          </Tooltip> */}
          <Nav key={Math.random()} onClick={(e) => { e.preventDefault(); props.history.push('/dashboard') }} classes="fa fa-home" primary="Dashabord" title="Dashabord" placement="right" />

          {/* <Tooltip title="Manage Permission" placement="right" style={{ display: (props.authUser && props.authUser.userAccess && props.authUser.userAccess.length > 0 && props.authUser.userAccess.indexOf('manage-permission') > -1) ? "flex" : "none" }} > */}
          {/* <Tooltip title="Manage Permission" placement="right" >
            <ListItem button onClick={(e) => { props.history.push('/permission') }} >
              <ListItemIcon>
                <FontAwesomeIconComponent classes="fa fa-lock" colorName="primary" fontSize={"small"} />
              </ListItemIcon>
              <ListItemText primary="Manage Permission" />
            </ListItem>
          </Tooltip>
          <Tooltip title="Manage Role" placement="right">
            <ListItem button onClick={(e) => { props.history.push('/role') }}>
              <ListItemIcon>
                <FontAwesomeIconComponent classes="fa fa-user" colorName="primary" fontSize={"small"} />
              </ListItemIcon>
              <ListItemText primary="Manage Role" />
            </ListItem>
          </Tooltip>
          <Tooltip title="Manage Users" placement="right">
            <ListItem button onClick={(e) => { e.preventDefault(); props.history.push('/users') }} >
              <ListItemIcon>
                <FontAwesomeIconComponent classes="fa fa-users" colorName="primary" fontSize={"small"} />
              </ListItemIcon>
              <ListItemText primary="Manage Users" />
            </ListItem>
          </Tooltip>
          <Tooltip title="Leaves & Holidays" placement="right">
            <ListItem button onClick={(e) => { e.preventDefault(); props.history.push('/leaves') }} >
              <ListItemIcon>
                <FontAwesomeIconComponent classes="fas fa-sign-out-alt" colorName="primary" fontSize={"small"} />
              </ListItemIcon>
              <ListItemText primary= "Leaves & Holidays" />
            </ListItem>
          </Tooltip> */}
          {ls('roles') === 'Super Admin' || ls('roles') === 'Admin' ?
            [<Nav key={Math.random()} onClick={(e) => { e.preventDefault(); props.history.push('/permission') }} classes="fa fa-lock" primary="Manage Permission" title="Manage Permission" placement="right" />,
            <Nav key={Math.random()} onClick={(e) => { e.preventDefault(); props.history.push('/role') }} classes="fa fa-user" primary="Manage Role" title="Manage Role" placement="right" />,
            <Nav key={Math.random()} onClick={(e) => { e.preventDefault(); props.history.push('/users') }} classes="fa fa-users" primary="Manage Users" title="Manage Users" placement="right" />,
            <Nav key={Math.random()} onClick={(e) => { e.preventDefault(); props.history.push('/leaves') }} classes="fas fa-sign-out-alt" primary="Leaves & Holidays" title="Leaves & Holidays" placement="right" />,
            <Nav key={Math.random()} onClick={(e) => { e.preventDefault(); props.history.push('/upcoming') }} classes="fa fa-arrow-right" primary="Upcoming Event" title="Upcoming Event" placement="right" />
            ]
            : null
          }
          {/* <Tooltip title="Leave Tickets" placement="right">
            <ListItem button onClick={(e) => { e.preventDefault(); props.history.push('/tickets') }} >
              <ListItemIcon>
                <FontAwesomeIconComponent classes="fas fa-ticket-alt" colorName="primary" fontSize={"small"} />
              </ListItemIcon>
              <ListItemText primary= "Leaves Tickets" />
            </ListItem>
          </Tooltip> */}
          <Nav key={Math.random()} onClick={(e) => { e.preventDefault(); props.history.push('/tickets') }} classes="fas fa-ticket-alt" primary="Leaves Tickets" title="Leave Tickets" placement="right" />
          <Nav key={Math.random()} onClick={(e) => { e.preventDefault(); props.history.push('/event') }} classes="fa fa-calendar" primary="Event" title="Event" placement="right" />
          {/* <Nav key={Math.random()} onClick={(e) => { e.preventDefault(); props.history.push('/job') }} classes="fas fa-briefcase" primary="Job-Portal" title="JobPortal" placement="right" /> */}


          <ListItem button onClick={handleClick}  >
            <ListItemIcon>
              <FontAwesomeIconComponent classes="fas fa-briefcase" colorName="primary" fontSize={"small"} />
            </ListItemIcon>
            <ListItemText primary="Job-Portal" />
            {ds || open ? <ExpandMore /> : <ExpandLess />}
          </ListItem>
          <Collapse in={ds && open} timeout="auto" unmountOnExit >
            <List disablePadding>
              <ListItem button onClick={(e) => { e.preventDefault(); props.history.push('/job') }} className={classes.nested}>

                <ListItemText primary="job" />
              </ListItem>
              <ListItem button onClick={(e) => { e.preventDefault(); props.history.push('/qulification') }} className={classes.nested}>

                <ListItemText primary="Qualification" />
              </ListItem>
              <ListItem button onClick={(e) => { e.preventDefault(); props.history.push('/experience') }} className={classes.nested}>

                <ListItemText primary="Experience" />
              </ListItem>
            </List>
          </Collapse>

          <Nav key={Math.random()} onClick={(e) => { e.preventDefault(); props.history.push('/time') }} classes="far fa-times-circle" primary="Time Entry" title="Time Entry" placement="right" />

          {ls('roles') === 'Admin' ?
            <Nav key={Math.random()} onClick={(e) => { e.preventDefault(); props.history.push('/check') }} classes="fas fa-clipboard-check" primary="User Check" title="User Check" placement="right" />
            : ""}




        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.component}
      </main>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  ds: {
    position: 'absolute',
    right: 0
  },
  back: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },

}));