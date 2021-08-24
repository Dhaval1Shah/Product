import React, { Component } from 'react';
import Header from '../Layouts/Header'
import Footer from '../Layouts/Footer';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Breadcrumb from '../Layouts/Breadcrumb';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CountdownTimer from '../Layouts/CountdownTimer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import AuthApi from '../Services/Authapi';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import ScreenShot from '../../ScreenShot';
import Button from '@material-ui/core/Button';
import ls from "local-storage";
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



let length;

let bdayID = false;



class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: useStyles,
      alertIsOpnen: false,
      page: 0,
      rowsPerPage: 5,
      rows: [],
      totalDurationTime: "",
      selectedDate: "",
      getData: [],
      current: 0,
      people: [],
      userID: false,
      show: true,




    }
    this.getAttr = this.getAttr.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.getEventData = this.getEventData.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    // this.handleClose = this.handleClose.bind(this);
    // this.SlideTransition = this.SlideTransition.bind(this);
    this.notificationForBday = this.notificationForBday.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);


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

  componentDidMount() {
    this.getAttr();
    this.getEventData();
    // this.handleClick(this.SlideTransition)
    this.handleClickOpen();
    this.notificationForBday();
  }


  async getEventData() {
    const EventData = await AuthApi.getAllEvents();

    length = EventData.data.length
    if (EventData && EventData.status === true) {
      this.setState({
        getData: EventData.data
      })


    }

  }

  async getAttr() {
    let today = new Date();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    const attr = await AuthApi.getAttandance(month, year);
    if (attr && attr.status === true) {

      this.setState({
        totalDurationTime: attr.data
      })
    }
  }

  handleMonthChange = async (e) => {

    let select = e.target.value
    let ds = new Date(select);
    console.log(ds)
    let month = ds.getMonth() + 1;
    let year = ds.getFullYear();
    const attr = await AuthApi.getAttandance(month, year);
    if (attr && attr.status === true) {

      this.setState({
        totalDurationTime: attr.data
      })
    }
  }




  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    })
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: +event.target.value,

    })
  };



  createData(date, hours, attendance, dayType) {



    return { date, hours, attendance, dayType };

  }

  nextSlide = () => {
    this.setState({
      current: this.state.current === length - 1 ? 0 : this.state.current + 1
    })

  }

  prevSlid = () => {
    this.setState({
      current: this.state.current === 0 ? length - 1 : this.state.current - 1
    })

  }





  notificationForBday = async () => {
    const bday = await AuthApi.bdayNotification();
    if (bday && bday.status === true) {

      this.setState({
        people: bday.data
      })

    } else {

    }
  }

  // SlideTransition = (props) => {
  //   return <Slide {...props} direction="up" />;
  // }

  // handleClick = (Transition) => () => {
  //   this.setState({
  //     show: true,
  //     Transition,
  //   });
  // };

  // handleClose = () => {
  //   this.setState({

  //     show: false,
  //   });
  // };

  handleClickOpen = () => {
    this.setState({
      show: true
    })
  };

  handleClose = () => {
    this.setState({
      show: false
    })
  };


  render() {
    const classes = this.props;
    const len = length
    const columns = [
      { id: 'date', label: 'Date', minWidth: 170 },
      { id: 'hours', label: 'Hours / Min', minWidth: 100 },
      { id: 'attendance', label: 'Attendance', minWidth: 100 },
      { id: 'dayType', label: 'Day-Type', minWidth: 170, align: 'right' },

    ];




    const fs = ls('user').id;
    const { people } = this.state

    if (people.length) {

      bdayID = people.some((data) => data.id === fs)

    }

    // people.map((elements) => {
    //   // console.log(elements)
    //   temp = {
    //     'id': elements.id
    //   }
    //   // console.log(temp)
    // })








    // var weekday = new Array(7);
    // weekday[0] = "Sunday";
    // weekday[1] = "Monday";
    // weekday[2] = "Tuesday";
    // weekday[3] = "Wednesday";
    // weekday[4] = "Thursday";
    // weekday[5] = "Friday";
    // weekday[6] = "Saturday";

    var month = new Array();
    month[0] = "01";
    month[1] = "02";
    month[2] = "03";
    month[3] = "04";
    month[4] = "05";
    month[5] = "06";
    month[6] = "07";
    month[7] = "08";
    month[8] = "09";
    month[9] = "10";
    month[10] = "11";
    month[11] = "12";

    // var d = new Date();
    // var n = month[d.getMonth()];
    var d = new Date();
    var dateString = d.getFullYear() + '-' + (month[d.getMonth()])


    // var date = String(d.getDate()).padStart(2, '0');
    // var month1 = String(d.getMonth()).padStart(2, '0');
    // var year = d.getFullYear();
    // var days = [];
    // var i;
    // for (i = 1; i < date; i++) {
    //   var today1 = new Date(year, month1, i);
    //   var day = {
    //     // 'date': today1.getDate() + '-' + (today1.getMonth() + 1) + '-' + today1.getFullYear(),
    //     // 'date': today1.getFullYear() + '-' + (today1.getMonth() + 1) + '-' + today1.getDate(),
    //     'date': today1.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(today1.getDate()).padStart(2, '0'),
    //     'hours': "3 hours 57 minites ",
    //     'attendance': 'present',
    //     'dayType': 'Full day'
    //   };
    //   days.push(day);
    // }



    var ds = [this.state.totalDurationTime]


    let rows = [];

    if (ds[0].length !== 0) {

      ds[0].forEach((element1) => {

        rows.push(this.createData(element1.date, element1.hours, element1.attendance, element1.dayType));
      })
    } else {
      rows.push(this.createData("Data Not Found"));
    }


    // days.forEach((element) => {

    //   rows.push(this.createData(element.date, element.hour, element.attendance, element.dayType));


    // })

    if (!Array.isArray(len) || len.length <= 0) {

    }


    return (
      <div>
        <Header
          {...this.props}
          authUser={this.props.authUser}
          setAutUser={this.props.setAutUser}
          component={
            <div>
              {/* <Button onClick={this.handleClick(this.SlideTransition)}>Slide Transition</Button> */}
              {bdayID &&
                <Dialog
                  open={this.state.show}
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{" From Cherrypic Software Solutions"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Happy Birthday To You,
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                      Have A Great Day
                    </DialogContentText>
                  </DialogContent>

                </Dialog>
              }
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
                  <Card className={classes.root} style={{ marginBottom: '3%', height: "100%" }}>
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
                <Grid item xs={6} >
                  <Card className={classes.root} style={{ marginBottom: '3%', height: "100%" }}>
                    <CardContent>
                      <Grid container justify="space-around" style={{ top: '20px', paddingBottom: '10px' }}>
                        <TextField
                          id="datetime-local"
                          label="Select Month/Year"
                          views={["year", "month"]}
                          variant="outlined"
                          // format="yyyy/mm"                          
                          defaultValue={dateString}
                          type="Month"
                          // openTo="month"
                          // value={this.state.selectedDate}
                          onChange={this.handleMonthChange}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{ min: "2020-01", max: dateString }}
                        />
                      </Grid>
                      <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {columns.map((column) => (
                                <StyledTableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ minWidth: column.minWidth }}
                                >
                                  {column.label}
                                </StyledTableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {
                              return (
                                <StyledTableRow hover role="checkbox" tabIndex={-1} key={Math.random()}>
                                  {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                      <StyledTableCell key={column.id} align={column.align}>
                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                      </StyledTableCell>
                                    );
                                  })}
                                </StyledTableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      />
                      {/* </Paper> */}

                    </CardContent>

                  </Card>
                </Grid>
              </Grid>

              <Grid container className={this.state.classes.root} spacing={2}>
                <Grid item xs={6}>
                  <Card className={classes.root} style={{ marginBottom: '3%', height: "90%" }} >
                    <CardContent>
                      <h2>UPCOMING EVENT</h2>
                      <Grid item xs={6}>


                        <Typography variant="caption" style={{ float: 'left' }} display="block">

                          <section className="slider">
                            <SkipPreviousIcon className="left-arrow" onClick={this.prevSlid} />
                            <SkipNextIcon className="right-arrow" onClick={this.nextSlide} />
                            {this.state.getData.map((item, index) => {

                              return (
                                <div className={index === this.state.current ? 'slide active' : 'slide'} key={index}>
                                  {index === this.state.current && (
                                    <div className="slide-image">
                                      <div className="top-left">
                                        <Typography style={{ fontSize: "1.3em" }}>Event Name :   {item.name} </Typography>
                                        <Typography style={{ fontSize: "1.3em" }}>Event Date :   {item.date}  </Typography>
                                        <Typography style={{ fontSize: "1.3em" }}>Description :  {item.description}  </Typography>
                                      </div>
                                      <div>
                                        <img src={item.image} className="image" />
                                      </div>
                                    </div>
                                  )}

                                </div>

                              )

                            })}
                          </section>
                        </Typography>

                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={6}>
                  <Card className={"root"} style={{ marginBottom: '3%', height: "90%" }}>
                    <CardContent>
                      <h2 style={{ color: "black", textAlign: "center" }}>
                        {people.length} - Birthdays Today
                      </h2>
                      <Grid item xs={6}>

                        {people.map((person) => {
                          const { id, firstName, photo } = person

                          return (
                            <div className="container" key={id}>
                              <div className="avtar">
                                <div>
                                  <img className="bday" src={photo} alt={firstName} />
                                </div>

                                <div>
                                  <h3>{firstName}</h3>
                                </div>
                              </div>



                            </div>
                          )
                        })}

                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

              </Grid>
            </div>
          } />
        <Footer {...this.props} />
      </div>
    )
  }
}


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#1B6E95',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
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
  table: {
    minWidth: 650,
  },
  container: {
    maxHeight: 440,
  },
  paper1: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default Dashboard;









