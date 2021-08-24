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


const inileaves = {
    leaveName: "",
    dateRange: "",
    startDate: "",
    endDate: "",
    noOfDays: ""
}

// const inilea = {
//     leaveName: "dsfsd",
//     dateRange: ["14-01-2021","15-01-2021"],
//     // startDate: null,
//     // endDate: null,
//     noOfDays:2
// }





const AddLeaves = (props) => {
    const classes = props;
    const [leaveValues, setLeaveValues] = useState(inileaves);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);






    useEffect(() => {
        if (props && props.authToken === false) {
            props.history.push('/login');
        }
    });


    //   componentWillReceiveProps(props) {
    //     if (props && props.authToken === false) {
    //       props.history.push('/login');
    //     }
    //   }





    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeaveValues({ ...leaveValues, [name]: value });
    };








    function dateDiffInDays(startDate, endDate) {
        // round to the nearest whole number
        return Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
    }
    const daysDiff = dateDiffInDays(new Date(leaveValues.startDate), new Date(leaveValues.endDate));
    const dsp = dateDiffInDays(new Date(), new Date(leaveValues.startDate));



    const validate = (values) => {
        let errors = {};
        const regex = /^[a-zA-Z]/;
        const dateR = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;




        if (!values.leaveName) {
            errors.leaveName = "Cannot be blank";
        } else if (!regex.test(values.leaveName)) {
            errors.leaveName = "Invalid firstName format";
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

        setFormErrors(validate(leaveValues));
        setIsSubmitting(true);




    }

    useEffect(async () => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            await createLeaves();
        }
    }, [formErrors]);


    const createLeaves = async () => {
        console.log("test");
        let create = await AuthApi.createHoliday(leaveValues)
        console.log(create);

        if (create && create.status === true) {
            props.history.push('/leaves');
        } else {
            swal({
                title: "OOPS!",
                icon: "fail",
                message: "Something went wrong, Please try later!"
            })
        }
    }

    function diffday() {
        const a = moment(leaveValues.startDate);
        const b = moment(leaveValues.endDate);
        const dateRangeArr = [];

        // if(e.target.name == "startDate"){
        var startDate = leaveValues.startDate;
        dateRangeArr.push(startDate);
        // }
        // if(e.target.name == "endDate"){
        var endDate = leaveValues.endDate;
        dateRangeArr.push(endDate);
        // }

        leaveValues.dateRange = dateRangeArr;
        leaveValues.noOfDays = b.diff(a, 'days')

    }
    // console.log(leaveValues);








    // function convertDate(userDate) {
    //     var date = userDate;
    //     var newdate = date.split("-").reverse().join("-");
    //     return newdate;
    // }

    //   console.log(convertDate(todaysDate)); // Returns: 2015-08-25

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
                                    primaryPageName="Leaves"
                                    primaryPageLink="/leaves"
                                    isSecondaryPage={true}
                                    secondaryPageName="Add" />
                            </CardContent>
                        </Card>
                        <Grid container className={classes.root} spacing={2}>
                            <Grid item xs={12}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <Typography variant="h2">Add leave</Typography>
                                        <form className={classes.form} onSubmit={handleSubmit} >
                                            <Grid container className={classes.root} spacing={5}>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        fullWidth
                                                        id="leaveName"
                                                        name="leaveName"
                                                        label="LeaveName"
                                                        variant="outlined"
                                                        error={formErrors.leaveName && true}
                                                        value={leaveValues.leaveName}
                                                        onChange={handleChange}
                                                        className={formErrors.leaveName && "input-error"}

                                                    />
                                                    {formErrors.leaveName && (
                                                        <span className="error">{formErrors.leaveName}</span>
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
                                                        value={leaveValues.startDate}
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
                                                        value={leaveValues.endDate}
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



                                            </Grid>





                                            <Grid container className={classes.root} spacing={3}>
                                                <Grid item xs={4} style={{ display: 'flex' }}>
                                                    <Button type="submit" onClick={(e) => { diffday() }} style={{ marginTop: "10px" }} variant="contained" color="primary">Save</Button>
                                                    <Button type="button" style={{ marginTop: "10px" }} onClick={(e) => { e.preventDefault(); props.history.push('/leaves') }}>Cancel</Button>
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

export default AddLeaves;