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
    leave_id: 0,
}



const AddLeaves = (props) => {
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


    function dateDiffInDays(startDate, endDate) {
        // round to the nearest whole number
        return Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
    }
    const daysDiff = dateDiffInDays(new Date(editValues.startDate), new Date(editValues.endDate));
    const dsp = dateDiffInDays(new Date(), new Date(editValues.startDate));

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

    const getLeaveData = async () => {
        let leaveId = props.history.location.pathname.split('/')[props.history.location.pathname.split('/').length - 1];
        let leave = await AuthApi.singleLeave(leaveId);

        let leave_id = leaveId;
        let leaveName = (leave.status === true && leave.data && leave.data.name && (leave.data.name !== null || leave.data.name !== false)) ? leave.data.name : null;
        let dateRangeArr = (leave.status === true && leave.data && leave.data.date_range) ? leave.data.date_range : null;


        setEditValues({
            // ...editValuesObj,
            leaveName: leaveName,
            startDate: dateRangeArr[0],
            endDate: dateRangeArr[1],
            leave_id: leave_id,
        })



    }
    useEffect(
        () =>
            setTimeout(
                () => getLeaveData(),
                500), []);




    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormErrors(validate(editValues));
        setIsSubmitting(true);

    }

    useEffect(async () => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            await editUser1();
        }
    }, [formErrors]);


    function diffday() {
        const a = moment(editValues.startDate);
        const b = moment(editValues.endDate);
        const dateRangeArr = [];


        var startDate = editValues.startDate;
        dateRangeArr.push(startDate);

        var endDate = editValues.endDate;
        dateRangeArr.push(endDate);


        editValues.dateRange = dateRangeArr;
        editValues.noOfDays = b.diff(a, 'days')

    }

    const editUser1 = async (id) => {
        let status = await AuthApi.updateLeave(editValues, editValues.leave_id);
        console.log(status);
        if (status && status.status === true) {
            props.history.push('/leaves');
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
                                    primaryPageName="Leaves"
                                    primaryPageLink="/leaves"
                                    isSecondaryPage={true}
                                    secondaryPageName="edit" />
                            </CardContent>
                        </Card>
                        <Grid container className={classes.root} spacing={2}>
                            <Grid item xs={12}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <Typography variant="h2">Edit leave</Typography>
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
                                                        value={(editValues && editValues.leaveName !== null) ? editValues.leaveName : null}
                                                        focused={(editValues && editValues.leaveName !== null) ? true : false}
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
                                                        formate="yyyy-mm-dd"
                                                        error={formErrors.startDate && true}
                                                        value={(editValues && editValues.startDate !== null) ? editValues.startDate : null}
                                                        focused={(editValues && editValues.startDate !== null) ? true : false}
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
                                                        value={(editValues && editValues.endDate !== null) ? editValues.endDate : null}
                                                        focused={(editValues && editValues.endDate !== null) ? true : false}
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
                                                    <Button type="submit" style={{ marginTop: "10px" }} onClick={(e) => { diffday() }} variant="contained" color="primary" >Edit Leaves </Button>
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