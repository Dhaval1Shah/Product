import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import AddLeaves from  './components/Pages/Leaves/AddLeaves';
import EditLeaves from './components/Pages/Leaves/EditLeaves';
import LeavesTicket from './components/Pages/LeavesTicket/Ticket';
import AddTickets from './components/Pages/LeavesTicket/AddTickets';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authToken: (ls.get("authToken") && ls.get("authToken") !== null && ls.get("authToken") !== false) ? ls.get("authToken") : false,
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

  componentDidMount() {
    if (this.state.timerOn) {
      this.runCycle()
    }
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
      // console.log(newCount);
      this.setState({ count: newCount >= 0 ? newCount : 0 }, function (param) {
        //this.updateCounter(newCount);
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
      this.setState({ stopTime: Date.now()  });
      clearInterval(this.timer);
    });
    this.saveStateToLocalStorage();

  }

  updateCounterOnload(count) {
    this.setState({ count: count });
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
      ls.set('authToken', false)
      this.setAutUser({ authUser: false, authToken: false });
    }
  }

  setAutUser(authData) {
    this.setState(authData);
  }

  componentWillMount() {
    this.getAuth();
  }

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
            <Route exact path='/permission' render={(props) => (
              <Permission
                {...props}
                authUser={this.state.authUser}
                authToken={this.state.authToken}
                setAutUser={this.setAutUser} />
            )} />
            <Route exact path='/role' render={(props) => (
              <Role
                {...props}
                authUser={this.state.authUser}
                authToken={this.state.authToken}
                setAutUser={this.setAutUser} />
            )} />
            <Route exact path='/users' render={(props) => (
              <User
                {...props}
                authUser={this.state.authUser}
                authToken={this.state.authToken}
                setAutUser={this.setAutUser} />
            )} />
            <Route exact path='/users/add' render={(props) => (
              <AddForm
                {...props}
                authToken={this.state.authToken}
                setAutUser={this.setAutUser} />
            )} />
            <Route exact path='/users/edit/:id' render={(props) => (
              <EditUser
                {...props}
                authToken={this.state.authToken}
                setAutUser={this.setAutUser} />
            )} />
             <Route exact path='/leaves' render={(props) => (
              <Leaves
                {...props}
                authUser={this.state.authUser}
                authToken={this.state.authToken}
                setAutUser={this.setAutUser} />
            )} />
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