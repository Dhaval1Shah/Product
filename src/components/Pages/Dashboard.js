import React, { Component } from 'react';
import Header from '../Layouts/Header'
import Footer from '../Layouts/Footer';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumb from '../Layouts/Breadcrumb';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CountdownTimer from '../Layouts/CountdownTimer';
import Grid from '@material-ui/core/Grid';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: useStyles,
      alertIsOpnen: false,
    }
  }

  componentWillMount() {
    if (this.props && this.props.authToken === false) {
      this.props.history.push('/login');
    }
  }

  componentWillReceiveProps(props) {
    if (props && props.authToken == false) {
      props.history.push('/login');
    }
  }

  render() {
    const classes = this.props;
    return (
      <div>
        <Header
          {...this.props}
          authUser={this.props.authUser}
          setAutUser={this.props.setAutUser}
          component={
            <div>
              <Card className={classes.root} style={{ marginBottom: '3%' }}>
                <CardContent>
                  <Breadcrumb
                    {...this.props}
                    primaryPageName="Dashboard"
                    primaryPageLink="/dashboard"
                    isSecondaryPage={false}
                    secondaryPageName="" />
                </CardContent>
              </Card>
              <Grid container className={this.state.classes.root} spacing={2}>
                <Grid item xs={6}>
                  <Card className={classes.root} style={{ marginBottom: '3%' }}>
                    <CardContent>
                      <CountdownTimer
                        count={this.props.count}
                        timerOn={this.props.timerOn}
                        updateCounter={this.props.updateCounter}
                        startTimer={this.props.startTimer}
                        stopTimer={this.props.stopTimer}
                        startTime={this.props.startTime}
                        {...this.props} />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>
            </div>
          } />
        <Footer {...this.props} />
      </div>
    )
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default Dashboard;
