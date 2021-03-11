import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import AuthApi from '../Services/Authapi';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import ls, { get, set } from "local-storage";
import { Textbox } from 'react-inputs-validation';
import LoadderButton from '../Layouts/LoadderButton';
import Logo from '../../Images/logo.png';
import swal from 'sweetalert';
import Grid from '@material-ui/core/Grid';
import { Formik } from 'formik';
import LoginForm from '../Layouts/Forms/AuthForms/LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: false,
      password: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props && this.props.authToken !== false) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(props) {
    if (props && props.authToken !== false) {
      props.history.push('/dashboard');
    }
  }

  handleSubmit = async (e) => {
    let formData = {
      email: this.state.email,
      password: this.state.password
    }
    let checkLogin = await AuthApi.login(formData);
    if (checkLogin && checkLogin !== false) {
      ls.set("authToken", checkLogin.access_token);
      this.props.setAutUser({ authUser: checkLogin.data, authToken: checkLogin.access_token })
    } else {
      swal({
        title: "OOPS!",
        text: "Invalid Credentials",
        icon: "error",
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <img style={{ height: "35px" }} src={Logo} alt="ds" />
          <Typography component="h1" variant="h5">
            CPSI EMS
          </Typography>
          <LoginForm setAutUser={this.props.setAutUser} />
        </Paper>
      </main>
    )
  }
}

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: '#000',
  },
  link: {
    marginTop: theme.spacing.unit * 2,
  },
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },

  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});
export default withStyles(styles)(Login);