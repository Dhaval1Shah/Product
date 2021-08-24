import React, { useState, useEffect } from 'react';
import Header from '../../Layouts/Header';
import Footer from '../../Layouts/Footer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Breadcrumb from '../../Layouts/Breadcrumb';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import LoadderButton from '../../Layouts/LoadderButton';
import AuthApi from '../../Services/Authapi';
import Paper from '@material-ui/core/Paper';
import FontAwesomeIconComponent from '../../Layouts/FontAwesomeIconComponent';
import { SignalCellularNull } from '@material-ui/icons';
import Authapi from '../../Services/Authapi';
import swal from 'sweetalert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { now } from 'moment';
import moment from 'moment';
import ls from "local-storage";


const inileaves = {
    leaveType: "",
    ticketMesasge: "",
    dateRange: "",
    startDate: "",
    endDate: "",
    leaveStatus: "",
    ticket_Id: 0,
}



const EditTicket = (props) => {
    const classes = props;
    const [editValues, setEditValues] = useState(inileaves);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        if (props && props.authToken === false) {
            props.history.push('/login');
        }
    });




    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(value);
        setEditValues({ ...editValues, [name]: value });
        // console.log(editValues);
    }


    // function dateDiffInDays(startDate, endDate) {
    //     // round to the nearest whole number
    //     return Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
    // }
    // const daysDiff = dateDiffInDays(new Date(editValues.startDate), new Date(editValues.endDate));
    // const dsp = dateDiffInDays(new Date(), new Date(editValues.startDate));

    const validate = (values) => {
        let errors = {};
        const regex = /^[a-zA-Z]/;
        // const dateR = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;




        // if (!values.leaveType) {
        //     errors.leaveType = "Cannot be blank";
        // } else if (!regex.test(values.leaveType)) {
        //     errors.leaveType = "Invalid firstName format";
        // }


        // if (!values.ticketMesasge) {
        //     errors.ticketMesasge = "Cannot be blank";
        // } else if (!regex.test(values.ticketMesasge)) {
        //     errors.ticketMesasge = "Invalid ticketMesasge format";
        // }

        // if (!values.startDate) {
        //     errors.startDate = "Cannot be  blank";
        // } else if (!dateR.test(values.startDate)) {
        //     errors.startDate = "Invalid dob format"
        // }
        // else {


        //     if (dsp < 0) {
        //         errors.startDate = "you can chooes only Current and future Date";

        //     }
        // }

        // if (!values.endDate) {
        //     errors.endDate = "Cannot be  blank";
        // } else if (!dateR.test(values.endDate)) {
        //     errors.endDate = "Invalid dob format"
        // } else {


        //     if (daysDiff < 0) {
        //         errors.endDate = "you can chooes only Current and future Date";

        //     }
        // }

        if (!values.leaveStatus) {
            errors.leaveStatus = "Cannot be blank";
        } else if (!regex.test(values.leaveStatus)) {
            errors.leaveStatus = "Invalid firstName format";
        }



        return errors;
    };

    const getTicketData = async () => {
        let ticketId = props.history.location.pathname.split('/')[props.history.location.pathname.split('/').length - 1];
        let ticket = await AuthApi.singleTicket(ticketId);
        let ticket_Id = ticketId

        let leaveType = (ticket.status === true && ticket.data[0] && ticket.data[0].leaveType && (ticket.data[0].leaveType !== null || ticket.data[0].leaveType !== false)) ? ticket.data[0].leaveType : null;
        let ticketMesasge = (ticket.status === true && ticket.data[0] && ticket.data[0].ticket_mesasge) ? ticket.data[0].ticket_mesasge : null;
        let dateRangeArr = (ticket.status === true && ticket.data[0] && ticket.data[0].date_range) ? ticket.data[0].date_range : null;
        let Status = (ticket.status === true && ticket.data[0] && ticket.data[0].status) ? ticket.data[0].status : null;

        setEditValues({
            leaveType: leaveType,
            ticketMesasge: ticketMesasge,
            startDate: dateRangeArr[0],
            endDate: dateRangeArr[1],
            leaveStatus: Status,
            ticket_Id: ticket_Id,
        });


    }
    useEffect(
        () =>
            setTimeout(
                () => getTicketData(),
                500), []);




    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormErrors(validate(editValues));
        setIsSubmitting(true);

    }

    useEffect(async () => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            await editTickets();
        }
    }, [formErrors]);


    // function  diffday() {
    //     const a = moment(editValues.startDate);
    //     const b = moment(editValues.endDate);
    //     const dateRangeArr = [];


    //         var startDate = editValues.startDate; 
    //         dateRangeArr.push(startDate);

    //         var endDate = editValues.endDate; 
    //         dateRangeArr.push(endDate);


    //     editValues.dateRange = dateRangeArr;
    //     editValues.noOfDays = b.diff(a, 'days')

    // }

    const editTickets = async (id) => {
        let status = await AuthApi.updateTicket(editValues, editValues.ticket_Id);
        if (status && status.status === true) {
            props.history.push('/tickets');
        }
    }


    return (
        <div>
            <Header
                {...props}
                authUser={props.authUser}
                component={
                    <div>
                        <Card className={classes.root} style={{ marginBottom: '3%' }}>
                            <CardContent>
                                <Breadcrumb
                                    {...props}
                                    primaryPageName="LeavesTicket"
                                    primaryPageLink="/tickets"
                                    isSecondaryPage={true}
                                    secondaryPageName="edit" />
                            </CardContent>
                        </Card>
                        <Grid container className={classes.root} spacing={2}>
                            <Grid item xs={12}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <Typography variant="h2">Edit Ticket</Typography>
                                        <form className={classes.form} onSubmit={handleSubmit} >
                                            <Grid container className={classes.root} spacing={5}>
                                                <Grid item xs={3}>
                                                    <FormControl variant="outlined" style={{ width: '100%' }} disabled >
                                                        <InputLabel id="demo-simple-select-outlined-label">Leave-Type</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="demo-simple-select-outlined"
                                                            label="leave-Type"
                                                            name="leaveType"
                                                            // error = {formErrors.leaveType && true}
                                                            value={(editValues && editValues.leaveType !== null) ? editValues.leaveType : ""}
                                                            // focused={(editValues && editValues.leaveType !== null) ? true : false}
                                                            className={formErrors.leaveType && "input-error"}
                                                        >

                                                            <MenuItem value="full-leave">Full leave</MenuItem>
                                                            <MenuItem value="half-leave">Half leave</MenuItem>
                                                            <MenuItem value="sick-leave">Sick leave</MenuItem>
                                                            <MenuItem value="early-leave">Early leave</MenuItem>


                                                        </Select>
                                                    </FormControl>
                                                    {/* {formErrors.leaveType && (
                                                            <span className="error">{formErrors.leaveType}</span>
                                                        )} */}
                                                </Grid>


                                                <Grid item xs={4}>
                                                    <TextField
                                                        disabled
                                                        fullWidth
                                                        id="date"
                                                        variant="outlined"
                                                        label="Start-date"
                                                        name="startDate"
                                                        type="date"
                                                        // error={formErrors.startDate && true}
                                                        value={(editValues && editValues.startDate !== null) ? editValues.startDate : null}
                                                        // focused={(editValues && editValues.startDate !== null) ? true : false}
                                                        // onChange={handleChange}
                                                        className={formErrors.startDate && "input-error"}
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}

                                                    />
                                                    {/* {formErrors.startDate && (
                                                        <span className="error">{formErrors.startDate}</span>
                                                    )} */}

                                                </Grid>
                                                <h3 style={{ marginTop: "30px" }}>To</h3>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        disabled
                                                        fullWidth
                                                        id="date"
                                                        variant="outlined"
                                                        label="End-date"
                                                        name="endDate"
                                                        type="date"
                                                        // error={formErrors.endDate && true}
                                                        value={(editValues && editValues.endDate !== null) ? editValues.endDate : null}
                                                        // focused={(editValues && editValues.endDate !== null) ? true : false}
                                                        // onChange={handleChange}
                                                        className={formErrors.endDate && "input-error"}
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                    {/* {formErrors.endDate && (
                                                        <span className="error">{formErrors.endDate}</span>
                                                    )} */}

                                                </Grid>

                                                <Grid item xs={7}>
                                                    <TextField
                                                        disabled
                                                        fullWidth
                                                        multiline
                                                        rows={4}
                                                        id="ticketMesasge"
                                                        name="ticketMesasge"
                                                        label="Reason for leave"
                                                        variant="outlined"
                                                        // defaultValue
                                                        // error={formErrors.ticketMesasge && true}
                                                        value={(editValues && editValues.ticketMesasge !== null) ? editValues.ticketMesasge : null}
                                                        // focused={(editValues && editValues.ticketMesasge !== null) ? true : false}
                                                        // onChange={handleChange}
                                                        className={formErrors.ticketMesasge && "input-error"}

                                                    />
                                                    {/* {formErrors.ticketMesasge && (
                                                        <span className="error">{formErrors.ticketMesasge}</span>
                                                    )} */}
                                                </Grid>


                                                <Grid item xs={3}>

                                                    <FormControl variant="outlined" style={{ width: '100%' }} disabled={ls('roles') === 'Super Admin' ? false : true}>
                                                        <InputLabel id="demo-simple-select-outlined-label1">Leave-Status</InputLabel>
                                                        <Select
                                                            autoFocus
                                                            labelId="demo-simple-select-outlined-label1"
                                                            id="demo-simple-select-outlined1"
                                                            label="leave-status"
                                                            name="leaveStatus"
                                                            error={formErrors.leaveStatus && true}
                                                            value={(editValues && editValues.leaveStatus !== null) ? editValues.leaveStatus : ""}
                                                            // focused={(editValues && editValues.leaveStatus !== null) ? true : false}
                                                            onChange={handleChange}
                                                            className={formErrors.leaveStatus && "input-error"}
                                                        >
                                                            <MenuItem value="pending">Pending</MenuItem>
                                                            <MenuItem value="approved">Approved</MenuItem>
                                                            <MenuItem value="declined">Declined</MenuItem>
                                                            <MenuItem value="canceled">Canceled</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    {formErrors.leaveStatus && (
                                                        <span className="error">{formErrors.leaveStatus}</span>
                                                    )}
                                                </Grid>


                                            </Grid>





                                            <Grid container className={classes.root} spacing={3}>
                                                <Grid item xs={4} style={{ display: 'flex' }}>
                                                    <Button type="submit" style={{ marginTop: "10px" }} variant="contained" color="primary">Edit</Button>
                                                    <Button type="button" style={{ marginTop: "10px" }} onClick={(e) => { e.preventDefault(); props.history.push('/tickets') }}>Cancel</Button>
                                                </Grid>
                                                <Grid item xs={4}></Grid>
                                                <Grid item xs={4}></Grid>
                                            </Grid>
                                        </form>

                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={6}></Grid>
                        </Grid>
                    </div>
                } />
            <Footer />
        </div>
    )
}

export default EditTicket;