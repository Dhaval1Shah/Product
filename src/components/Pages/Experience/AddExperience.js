import React, { useState, useEffect } from 'react';
import Header from '../../Layouts/Header';
import Footer from '../../Layouts/Footer';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Breadcrumb from '../../Layouts/Breadcrumb';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AuthApi from '../../Services/Authapi';
import swal from 'sweetalert';

const inivalue = {
    minExpYear: "",
    maxExpYear: "",
}

const AddExperience = (props) => {
    const classes = props;
    const [exp, setExp] = useState(inivalue);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        if (props && props.authToken === false) {
            props.history.push('/login');
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExp({ ...exp, [name]: value });

    };

    const validate = (values) => {
        let errors = {};
        const regex = /^[a-zA-Z]/;
        const ds = /^[0-9\b]+$/;
        // const dateR = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;



        if (!ds.test(values.minExpYear)) {
            errors.minExpYear = "only numeric";
        }

        if (!ds.test(values.maxExpYear)) {
            errors.maxExpYear = "only numeric";
        }






        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormErrors(validate(exp));
        setIsSubmitting(true);
    }

    useEffect(async () => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            await experience();
        }
    }, [formErrors])


    const experience = async () => {

        let create = await AuthApi.createExperience(exp);
        if (create && create.status === true) {
            props.history.push('/experience');
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
                                    primaryPageName="Experience"
                                    primaryPageLink="/experience"
                                    isSecondaryPage={true}
                                    secondaryPageName="Add" />
                            </CardContent>
                        </Card>
                        <Grid container className={classes.root} spacing={2}>
                            <Grid item xs={12}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <Typography variant="h2">Add Experience</Typography>
                                        <form className={classes.form} onSubmit={handleSubmit} >
                                            <Grid container className={classes.root} spacing={5}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        fullWidth
                                                        id="minExpYear"
                                                        name="minExpYear"
                                                        label="MinExpYear"
                                                        variant="outlined"
                                                        error={formErrors.minExpYear && true}
                                                        value={exp.minExpYear}
                                                        onChange={handleChange}
                                                        className={formErrors.minExpYear && "input-error"}

                                                    />
                                                    {formErrors.minExpYear && (
                                                        <span className="error">{formErrors.minExpYear}</span>
                                                    )}
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <TextField
                                                        fullWidth
                                                        id="maxExpYear"
                                                        name="maxExpYear"
                                                        label="MaxExpYear"
                                                        variant="outlined"
                                                        error={formErrors.maxExpYear && true}
                                                        value={exp.maxExpYear}
                                                        onChange={handleChange}
                                                        className={formErrors.maxExpYear && "input-error"}

                                                    />
                                                    {formErrors.maxExpYear && (
                                                        <span className="error">{formErrors.maxExpYear}</span>
                                                    )}
                                                </Grid>







                                            </Grid>

                                            <Grid container className={classes.root} spacing={5}>
                                                <Grid item xs={4}></Grid>
                                                <Grid item xs={4}></Grid>
                                                <Grid item xs={4}></Grid>
                                            </Grid>




                                            <Grid container className={classes.root} spacing={3}>
                                                <Grid item xs={4} style={{ display: 'flex' }}>
                                                    <Button type="submit" style={{ marginTop: "10px" }} variant="contained" color="primary">Save</Button>
                                                    <Button type="button" style={{ marginTop: "10px" }} onClick={(e) => { e.preventDefault(); props.history.push('/qulification') }}>Cancel</Button>
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

export default AddExperience;

