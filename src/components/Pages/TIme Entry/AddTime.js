import React, { useState, useEffect } from 'react';
import Header from '../../Layouts/Header';
import Footer from '../../Layouts/Footer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Breadcrumb from '../../Layouts/Breadcrumb';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AuthApi from '../../Services/Authapi';
import swal from 'sweetalert';


const inivalue = {
    selectedDate: "",
    startTime: "",
    endTime: ""
}


const AddTime = (props) => {
    const classes = props;
    const [addValues, setAddValues] = useState(inivalue);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);



    useEffect(() => {
        if (props && props.authToken === false) {
            props.history.push('/login');
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddValues({ ...addValues, [name]: value });
        console.log(addValues);
    };


    const validate = (values) => {
        let errors = {};

        const dobRegx = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;





        if (!values.selectedDate) {
            errors.selectedDate = "Cannot be  blank";
        } else if (!dobRegx.test(values.selectedDate)) {
            errors.selectedDate = "Invalid dob format"
        }


        if (!values.startTime) {
            errors.startTime = "Cannot be blank";
        }

        if (!values.endTime) {
            errors.endTime = "Cannot be blank";
        }

        return errors;
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormErrors(validate(addValues));
        setIsSubmitting(true);



    }

    useEffect(async () => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            await addTimeData();
        }
    }, [formErrors]);


    const addTimeData = async () => {

        let create1 = await AuthApi.addTime(addValues);
        if (create1 && create1.status === true) {
            props.history.push('/check');
        } else {
            swal({
                title: "OOPS!",
                icon: "fail",
                message: "Something went wrong, Please try later!"
            })
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
                                    primaryPageName="AddTime Entry"
                                    primaryPageLink="/time"
                                    isSecondaryPage={false}
                                    secondaryPageName="" />
                            </CardContent>
                        </Card>
                        <Grid container className={classes.root} spacing={2}>
                            <Grid item xs={12}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <Typography variant="h2">Add AddTime-Entry</Typography>
                                        <form className={classes.form} onSubmit={handleSubmit}>
                                            <Grid container className={classes.root} spacing={5}>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        fullWidth
                                                        id="selectedDate"
                                                        variant="outlined"
                                                        label="Date"
                                                        name="selectedDate"
                                                        type="date"
                                                        error={formErrors.selectedDate && true}
                                                        value={addValues.selectedDate}
                                                        onChange={handleChange}
                                                        className={formErrors.selectedDate && "input-error"}
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                    {formErrors.selectedDate && (
                                                        <span className="error">{formErrors.selectedDate}</span>
                                                    )}

                                                </Grid>

                                                <Grid item xs={4}>
                                                    <TextField
                                                        fullWidth
                                                        id="time"
                                                        label="Start-time"
                                                        variant="outlined"
                                                        type="time"
                                                        name="startTime"
                                                        error={formErrors.startTime && true}
                                                        value={addValues.startTime}
                                                        onChange={handleChange}
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        inputProps={{
                                                            step: 300, // 5 min
                                                        }}
                                                    />
                                                    {formErrors.startTime && (
                                                        <span className="error">{formErrors.startTime}</span>
                                                    )}
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <TextField
                                                        fullWidth
                                                        id="time"
                                                        label="End-time"
                                                        variant="outlined"
                                                        type="time"
                                                        name="endTime"
                                                        error={formErrors.endTime && true}
                                                        value={addValues.endTime}
                                                        onChange={handleChange}
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        inputProps={{
                                                            step: 300, // 5 min
                                                        }}
                                                    />
                                                    {formErrors.endTime && (
                                                        <span className="error">{formErrors.endTime}</span>
                                                    )}
                                                </Grid>
                                            </Grid>

                                            <Grid container className={classes.root} spacing={3}>
                                                <Grid item xs={4} style={{ display: 'flex' }}>
                                                    <Button type="submit" style={{ marginTop: "10px" }} variant="contained" color="primary">Save</Button>
                                                    <Button type="button" style={{ marginTop: "10px" }} onClick={(e) => { e.preventDefault(); props.history.push('/dashboard') }}>Cancel</Button>
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

export default AddTime;
