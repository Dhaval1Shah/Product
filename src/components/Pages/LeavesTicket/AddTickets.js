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

const iniTickets = {
    leaveType : null,
    ticketMesasge : null,
    dateRange: null,
    startDate: null,
    endDate: null,
    noOfDays: null,
    
}


const AddTickets = (props) => {
    const classes = props;
    const [ticketValues, setTicketsValues] = useState(iniTickets);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        if (props && props.authToken === false) {
            props.history.push('/login');
          }
        });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicketsValues({ ...ticketValues, [name]: value });
        // console.log(ticketValues);
    };

    

    function dateDiffInDays(startDate, endDate) {
        // round to the nearest whole number
        return Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
    }
    const daysDiff = dateDiffInDays(new Date(ticketValues.startDate), new Date(ticketValues.endDate));
    const dsp = dateDiffInDays(new Date(), new Date(ticketValues.startDate));


    const validate = (values) => {
        let errors = {};
        const regex = /^[a-zA-Z]/;
        const dateR = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;


        if (!values.leaveType) {
            errors.leaveType = "Cannot be blank";
        }


        if (!values.ticketMesasge) {
            errors.ticketMesasge = "Cannot be blank";
        } else if (!regex.test(values.ticketMesasge)) {
            errors.ticketMesasge = "Invalid ticketMesasge format";
        }

        if (!values.startDate) {
            errors.startDate = "Cannot be  blank";
        } else if (!dateR.test(values.startDate)) {
            errors.startDate = "Invalid dob format"
        }
        else {


            if (dsp < 0) {
                errors.startDate = "you can chooes only Current and future Date";

            }
        }

        if (!values.endDate) {
            errors.endDate = "Cannot be  blank";
        } else if (!dateR.test(values.endDate)) {
            errors.endDate = "Invalid dob format"
        } else {


            if (daysDiff < 0) {
                errors.endDate = "you can chooes only Current and future Date";

            }
        }



        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormErrors(validate(ticketValues));
        setIsSubmitting(true);




    }

    useEffect(async () => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
          
             await Tickets();
        }
    }, [formErrors])

    const Tickets = async () => {
        let create1 = await AuthApi.createTicket(ticketValues);
        console.log(create1)
        if (create1 && create1.status === true) {
            props.history.push('/tickets');
        } else {
            swal({
                title: "OOPS!",
                icon: "fail",
                message: "Something went wrong, Please try later!"
            })
        }
    }

    function diffday() {
        const a = moment(ticketValues.startDate);
        const b = moment(ticketValues.endDate);
        const dateRangeArr = [];

        // if(e.target.name == "startDate"){
        var startDate = ticketValues.startDate;
        dateRangeArr.push(startDate);
        // }
        // if(e.target.name == "endDate"){
        var endDate = ticketValues.endDate;
        dateRangeArr.push(endDate);
        // }

        ticketValues.dateRange = dateRangeArr;
        ticketValues.noOfDays = b.diff(a, 'days')
        // console.log(ticketValues.noOfDays);
        // console.log( ticketValues.dateRange);

    }
  
    // console.log(ticketValues);




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
                                    secondaryPageName="Add" />
                            </CardContent>
                        </Card>
                        <Grid container className={classes.root} spacing={2}>
                            <Grid item xs={12}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <Typography variant="h2">Add Tickets</Typography>
                                        <form className={classes.form} onSubmit={handleSubmit} >
                                            <Grid container className={classes.root} spacing={5}>
                                                <Grid item xs={3}>
                                                    <FormControl variant="outlined" style={{ width : '100%'}} >
                                                        <InputLabel id="demo-simple-select-outlined-label">leave-Type</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="demo-simple-select-outlined"
                                                            label="leave-Type"
                                                            name="leaveType"
                                                            error = {formErrors.leaveType && true}
                                                            value={ticketValues.leaveType}
                                                            onChange={handleChange}
                                                            className={formErrors.leaveType && "input-error"}
                                                        >
                                                            
                                                            <MenuItem value="full leave">Full-leave</MenuItem>
                                                            <MenuItem value="half leave">Half-leave</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                        {formErrors.leaveType && (
                                                            <span className="error">{formErrors.leaveType}</span>
                                                        )}
                                                </Grid>

                                                
                                                <Grid item xs={4}>
                                                    <TextField
                                                        fullWidth
                                                        id="date"
                                                        variant="outlined"
                                                        label="Start-date"
                                                        name="startDate"
                                                        type="date"
                                                        error={formErrors.startDate && true}
                                                        value={ticketValues.startDate}
                                                        onChange={handleChange}
                                                        className={formErrors.startDate && "input-error"}
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                    {formErrors.startDate && (
                                                        <span className="error">{formErrors.startDate}</span>
                                                    )}

                                                </Grid>
                                                <h3 style={{ marginTop: "30px" }}>To</h3>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        fullWidth
                                                        id="date"
                                                        variant="outlined"
                                                        label="End-date"
                                                        name="endDate"
                                                        type="date"
                                                        error={formErrors.endDate && true}
                                                        value={ticketValues.endDate}
                                                        onChange={handleChange}
                                                        className={formErrors.endDate && "input-error"}
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                    {formErrors.endDate && (
                                                        <span className="error">{formErrors.endDate}</span>
                                                    )}

                                                </Grid>

                                                     <Grid item xs={7}>
                                                    <TextField
                                                        fullWidth
                                                        multiline
                                                        rows={4}
                                                        id="ticketMesasge"
                                                        name="ticketMesasge"
                                                        label="Reason for leave"
                                                        variant="outlined"
                                                        error={formErrors.ticketMesasge && true}
                                                        value={ticketValues.ticketMesasge}
                                                        onChange={handleChange}
                                                        className={formErrors.ticketMesasge && "input-error"}

                                                    />
                                                    {formErrors.ticketMesasge && (
                                                        <span className="error">{formErrors.ticketMesasge}</span>
                                                    )}
                                                </Grid>    


                                            </Grid>





                                            <Grid container className={classes.root} spacing={3}>
                                                <Grid item xs={4} style={{ display: 'flex' }}>
                                                    <Button type="submit"  onClick={(e) => { diffday() }}style={{ marginTop: "10px" }} variant="contained" color="primary">Save</Button>
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

export default AddTickets;



