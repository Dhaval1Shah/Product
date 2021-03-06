import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from './components/Pages/Dashboard';
import Login from './components/Pages/Login';
import Pagenotfound from './Pagenotfound';
import InitComponent from './components/Pages/InitComponent';
import ls from "local-storage";
import User from './components/Pages/Users/Index';
import Permission from './components/Pages/Permission';
import AuthApi from './components/Services/Authapi';
import Role from "./components/Pages/Role";
import AddForm from './components/Pages/Users/HandleUser';
import green from '@material-ui/core/colors/green';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import EditUser from './components/Pages/Users/EditUser';
import Leaves from './components/Pages/Leaves/Leaves1';
import AddLeaves from './components/Pages/Leaves/AddLeaves';
import EditLeaves from './components/Pages/Leaves/EditLeaves';
import LeavesTicket from './components/Pages/LeavesTicket/Ticket';
import AddTickets from './components/Pages/LeavesTicket/AddTickets';
import EditTicket from './components/Pages/LeavesTicket/EditTicket';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Pages/Profile/Profile';
import Event from './components/Pages/Event/Event';
import AddEvent from './components/Pages/Event/AddEvent'
import EditEvent from './components/Pages/Event/EditEvent'
import ShowEvent from './components/Pages/ShowEvent/Show'
import Upcoming from './components/Pages/UpcomingEvent/Upcoming'
import AddUpcomingEvent from './components/Pages/UpcomingEvent/AddUpcomingEvent'
import EditUpcomingEvent from './components/Pages/UpcomingEvent/EditUpcomingEvent'
import Job from './components/Pages/JobPortal/JobList'
import Addjob from './components/Pages/JobPortal/AddJob'
import Editjob from './components/Pages/JobPortal/EditJob'
import Qulification from './components/Pages/Qulification/QulificationList'
import Addqulification from './components/Pages/Qulification/AddQulification'
import Editqulification from './components/Pages/Qulification/EditQulification'
import Experience from './components/Pages/Experience/ExperienceList';
import Addexperience from './components/Pages/Experience/AddExperience';
import Editexp from './components/Pages/Experience/EditExp'
import Time from './components/Pages/TIme Entry/AddTime';
import Check from './components/Pages/UserCheck/Check';
import { capture } from './ScreenShot';
import ReactNotification, { store } from 'react-notifications-component'

let bdayID = false;


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authToken: (ls.get("authToken") && ls.get("authToken") !== null && ls.get("authToken") !== false) ? ls.get("authToken") : false,
      roles: (ls.get("roles") && ls.get("roles") !== null && ls.get("roles") !== false) ? ls.get("roles") : false,
      user: (ls.get("user") && ls.get("user") !== null && ls.get("user") !== false) ? ls.get("user") : false,
      authUser: false,
      location: document.location.pathname,
      count: (ls.get('count')) ? ls.get('count') : 0,
      timerOn: (ls.get('timerOn')) ? ls.get('timerOn') : false,
      startTime: (ls.get('startTime')) ? ls.get('startTime') : 0,
      stopTime: (ls.get('stopTime')) ? ls.get('stopTime') : 0,
      startTimeStat: false,
    }
    this.setAutUser = this.setAutUser.bind(this);
    this.updateCounterOnload = this.updateCounterOnload.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    // this.handleOnClick = this.handleOnClick.bind(this);

  }

  saveStateToLocalStorage() {
    ls.set('startTime', this.state.startTime);
    ls.set('count', this.state.count);
    ls.set('timerOn', this.state.timerOn);
    ls.set('stopTime', this.state.stopTime);
  }

  componentDidMount() {
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
    // if (this.state.timerOn) {
    //   this.runCycle()
    // }
  }




  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  runCycle() {
    this.timer = setInterval(async () => {
      const newCount = this.state.count + parseInt(1);
      this.setState({ count: newCount >= 0 ? newCount : 0 }, function (param) {
        // this.updateCounterOnload(newCount);
      });
      this.saveStateToLocalStorage();
    }, 1000);

    // window.addEventListener(
    //   "beforeunload",
    //   this.saveStateToLocalStorage.bind(this)
    // );

  }

  async startTimer() {
    await AuthApi.inTime();
    this.setState({ timerOn: true }, function () {
      this.setState({ startTime: Date.now() - this.state.startTime });
      this.runCycle();
    });
  }

  async stopTimer() {
    await AuthApi.outTime();
    this.setState({ timerOn: false }, function () {
      this.setState({ stopTime: Date.now() });
      clearInterval(this.timer);
    });
    this.saveStateToLocalStorage();

  }

  updateCounterOnload(count) {
    this.setState({ count: count });
    // console.log(this.state.count)
  }

  // updateCounter(count) {
  //   this.setState({ count: count });
  //   console.log(this.state.count)
  // }

  async getAuth() {
    let checkLogin = await AuthApi.checkAuth();
    if (checkLogin && checkLogin.status !== false) {
      this.setAutUser({ authUser: checkLogin.data });

    } else {
      ls.set('roles', false)
      ls.set('authToken', false)
      ls.set('user', false)
      this.setAutUser({ authUser: false, authToken: false, roles: false, user: false });
    }

    // if (this.state.authToken !== false) {
    //   setInterval(() => { console.log(capture()) }, 1000)
    // }

  }


  setAutUser(authData) {
    this.setState(authData);
  }



  componentDidMount() {
    if (this.state.timerOn) {
      this.runCycle()
    }
  }

  componentWillMount() {
    this.getAuth();
  }

  // componentDidMount() {
  //   if (this.state.user) {
  //     setInterval(() => { capture() }, 1000)
  //   }
  // }
  // componentDidMount() {
  //   this.handleOnClick();
  // }

  // handleOnClick = async () => {

  //   store.addNotification({
  //     title: "Happy Birthday To you",
  //     message: "Have A Great Day",
  //     type: "info",
  //     insert: "center",
  //     container: "top-center",
  //     animationIn: ["animated", "fadeIn"],
  //     animationOut: ["animated", "fadeOut"],
  //     dismiss: {
  //       duration: 10000,
  //       onScreen: true,
  //       showIcon: true
  //     },
  //     width: 700,
  //   })

  //   const bday = await AuthApi.bdayNotification();
  //   console.log(bday)
  //   // if (bday && bday.status === true) {

  //   //   this.setState({
  //   //     people: bday.data
  //   //   })

  //   // }

  //   const fs = ls('user').id;
  //   // const { people } = this.state

  //   if (bday && bday.status === true && bday.data.length) {
  //     bdayID = bday.data.some((data) => data.id == fs)
  //     console.log('bdayID: ', bdayID);
  //   }

  // }



  render() {

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/dashboard' render={(props) => (
              <Dashboard
                {...props}
                authUser={this.state.authUser}
                authToken={this.state.authToken}
                roles={this.state.roles}
                user={this.state.user}
                setAutUser={this.setAutUser}
                count={this.state.count}
                timerOn={this.state.timerOn}
                // updateCounter={this.updateCounter}
                updateCounterOnload={this.updateCounterOnload}
                startTimer={this.startTimer}
                stopTimer={this.stopTimer}
                startTime={this.state.startTime}
                stopTime={this.state.stopTime}
              />
            )} />
            <ProtectedRoute
              {...this.props}
              exact
              path="/permission"
              component={Permission}
              authUser={this.state.authUser}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/role"
              component={Role}
              authUser={this.state.authUser}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/users"
              component={User}
              authUser={this.state.authUser}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/users/add"
              component={AddForm}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/users/edit/:id"
              component={EditUser}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/leaves"
              component={Leaves}
              authUser={this.state.authUser}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/leaves/add"
              component={AddLeaves}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/leaves/edit/:id"
              component={EditLeaves}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/tickets"
              component={LeavesTicket}
              authUser={this.state.authUser}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/tickets/add"
              component={AddTickets}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/tickets/edit/:id"
              component={EditTicket}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/profile"
              component={Profile}
              authUser={this.state.authUser}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/event"
              component={Event}
              authUser={this.state.authUser}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/event/add"
              component={AddEvent}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/event/edit/:id"
              component={EditEvent}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/show/:id"
              component={ShowEvent}
              authUser={this.state.authUser}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/upcoming"
              component={Upcoming}
              authUser={this.state.authUser}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/upcoming/add"
              component={AddUpcomingEvent}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/upcoming/edit/:id"
              component={EditUpcomingEvent}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/job"
              component={Job}
              authUser={this.state.authUser}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/job/add"
              component={Addjob}
              authUser={this.state.authUser}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/job/edit/:id"
              component={Editjob}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/qulification"
              component={Qulification}
              authUser={this.state.authUser}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/qulification/add"
              component={Addqulification}
              authUser={this.state.authUser}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/qulification/edit/:id"
              component={Editqulification}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/experience"
              component={Experience}
              authUser={this.state.authUser}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/experience/add"
              component={Addexperience}
              authUser={this.state.authUser}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/experience/edit/:id"
              component={Editexp}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/time"
              component={Time}
              authUser={this.state.authUser}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />
            <ProtectedRoute
              {...this.props}
              exact
              path="/check"
              component={Check}
              authUser={this.state.authUser}
              authToken={this.state.authToken}
              setAutUser={this.setAutUser}
            />


            {/* {ls('roles') === 'Super Admin' ?
              <Route exact path='/permission' render={(props) => (
                <Permission
                  {...props}
                  authUser={this.state.authUser}
                  authToken={this.state.authToken}
                  setAutUser={this.setAutUser} />
              )} /> : null}
            {ls('roles') === 'Super Admin' ?
              <Route exact path='/role' render={(props) => (
                <Role
                  {...props}
                  authUser={this.state.authUser}
                  authToken={this.state.authToken}
                  setAutUser={this.setAutUser} />
              )} /> : null}
            {ls('roles') === 'Super Admin' ?
              <Route exact path='/users' render={(props) => (
                <User
                  {...props}
                  authUser={this.state.authUser}
                  authToken={this.state.authToken}
                  setAutUser={this.setAutUser} />
              )} /> : null}
            <Route exact path='/users/add' render={(props) => (
              <AddForm
                {...props}
                authToken={this.state.authToken}
                setAutUser={this.setAutUser} />
            )} /> */}
            {/* <Route exact path='/users/edit/:id' render={(props) => (
              <EditUser
                {...props}
                authToken={this.state.authToken}
                setAutUser={this.setAutUser} />
            )} /> */}
            {/*{ls('roles') === 'Super Admin' ?
              <Route exact path='/leaves' render={(props) => (
                <Leaves
                  {...props}
                  authUser={this.state.authUser}
                  authToken={this.state.authToken}
                  setAutUser={this.setAutUser} />
              )} /> : null}
            <Route exact path='/leaves/add' render={(props) => (
              <AddLeaves
                {...props}
                authToken={this.state.authToken}
                setAutUser={this.setAutUser} />
            )} />
            <Route exact path='/leaves/edit/:id' render={(props) => (
              <EditLeaves
                {...props}
                authToken={this.state.authToken}
                setAutUser={this.setAutUser} />
            )} />
            <Route exact path='/tickets' render={(props) => (
              <LeavesTicket
                {...props}
                authUser={this.state.authUser}
                authToken={this.state.authToken}
                setAutUser={this.setAutUser} />
            )} />
            <Route exact path='/tickets/add' render={(props) => (
              <AddTickets
                {...props}
                authToken={this.state.authToken}
                setAutUser={this.setAutUser} />
            )} />
            <Route exact path='/tickets/edit/:id' render={(props) => (
              <EditTicket
                {...props}
                authToken={this.state.authToken}
                setAutUser={this.setAutUser} />
            )} /> */}



            <Route exact path='/' render={(props) => (
              <InitComponent
                {...props}
                authUser={this.state.authUser}
                setAutUser={this.setAutUser}
                authToken={this.state.authToken} />
            )} />
            <Route exact path='/login' render={(props) => (
              <Login
                {...props}
                authUser={this.state.authUser}
                setAutUser={this.setAutUser}
                authToken={this.state.authToken} />
            )} />

            <Route exact path='*' exact={true} component={Pagenotfound} />

          </Switch>
        </Router>
      </div>
    )
  };
}

export default function CustomStyles() {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1B6E95',
      light: '#1b6e9582',
      dark: '#1B6E95'
    },
    secondary: {
      main: green[500],
      light: green[100],
      dark: green[900],
      contrastText: green[600]
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'italic',
    },
    h2: {
      fontSize: '1.2rem',
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
      float: 'left',
      padding: '1%',
      marginTop: '5px',
      fontWeight: '500',
      color: '#1B6E95'
    }
  }
});