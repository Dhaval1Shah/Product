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



const iniJob = {
    jobtitle: "",
    jobdescription: "",
    roleresponsibilities: "",
    exprequire: "",
    minqualification: "",
    jobactive: "",
    numofvacanciese: '',
    Companyprofile: "",
    job_id: 0,

}


const EditJob = (props) => {
    const classes = props;
    const [jobportal, setJobPortal] = useState(iniJob);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (props && props.authToken === false) {
            props.history.push('/login');
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobPortal({ ...jobportal, [name]: value });
        // console.log(ticketValues);
    };



    const validate = (values) => {
        let errors = {};
        const regex = /^[a-zA-Z]/;
        const ds = /^[0-9\b]+$/;
        // const dateR = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;


        if (!values.jobtitle) {
            errors.jobtitle = "Cannot be blank";
        }


        if (!values.jobdescription) {
            errors.jobdescription = "Cannot be blank";
        } else if (!regex.test(values.jobdescription)) {
            errors.jobdescription = "Invalid jobdescription format";
        }

        if (!values.roleresponsibilities) {
            errors.roleresponsibilities = "Cannot be blank";
        } else if (!regex.test(values.roleresponsibilities)) {
            errors.roleresponsibilities = "Invalid roleresponsibilities format";
        }

        if (!ds.test(values.exprequire)) {
            errors.exprequire = "Cannot be blank";
        }

        if (!values.minqualification) {
            errors.minqualification = "Cannot be blank";
        }

        if (!values.jobactive) {
            errors.jobactive = "Cannot be blank";
        }

        if (!ds.test(values.numofvacanciese)) {
            errors.numofvacanciese = "only numeric";
        }

        if (!values.Companyprofile) {
            errors.Companyprofile = "Cannot be blank";
        } else if (!regex.test(values.Companyprofile)) {
            errors.Companyprofile = "Invalid Companyprofile format";
        }




        return errors;
    };

    const getJob = async (e) => {
        let jobId = props.history.location.pathname.split('/')[props.history.location.pathname.split('/').length - 1];
        let job = await AuthApi.singleJob(jobId)
        // console.log(job)
        let job_id = jobId

        let jobTitle = (job.data && job.data.jobTitle && (job.data.jobTitle !== null || job.data.jobTitle !== false)) ? job.data.jobTitle : null;
        let numberOfVacancies = (job.data && job.data.numberOfVacancies) ? job.data.numberOfVacancies : null;
        let expRequired = (job.data && job.data.expRequired) ? job.data.expRequired : null;
        let minQuallification = (job.data && job.data.minQuallification) ? job.data.minQuallification : null;
        // console.log(minQuallification)
        let jobActive = (job.data && job.data.jobActive) ? job.data.jobActive : null;
        let jobDescription = (job.data && job.data.jobDescription) ? job.data.jobDescription : null;
        let companyProfile = (job.data && job.data.companyProfile) ? job.data.companyProfile : null;
        let rolesResponbilities = (job.data && job.data.rolesResponbilities) ? job.data.rolesResponbilities : null;

        setJobPortal({
            jobtitle: jobTitle,
            jobdescription: jobDescription,
            roleresponsibilities: rolesResponbilities,
            exprequire: expRequired,
            minqualification: minQuallification,
            jobactive: jobActive,
            numofvacanciese: numberOfVacancies,
            Companyprofile: companyProfile,
            job_id: job_id

        })


    }

    useEffect(
        () =>
            setTimeout(
                () => getJob(),
                500), []);


    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormErrors(validate(jobportal));
        setIsSubmitting(true);

    }

    useEffect(async () => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            await job();
        }
    }, [formErrors])

    const job = async (id) => {
        let status = await AuthApi.updateJob(jobportal, jobportal.job_id);
        console.log(status)
        if (status && status.status === true) {
            props.history.push('/job');
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
                                    primaryPageName="JobPortal"
                                    primaryPageLink="/job"
                                    isSecondaryPage={true}
                                    secondaryPageName="edit" />
                            </CardContent>
                        </Card>
                        <Grid container className={classes.root} spacing={2}>
                            <Grid item xs={12}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <Typography variant="h2">Edit Job-Portal</Typography>
                                        <form className={classes.form} onSubmit={handleSubmit}>
                                            <Grid container className={classes.root} spacing={5}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        fullWidth
                                                        id="Job Title"
                                                        name="jobtitle"
                                                        label="Job-Title"
                                                        variant="outlined"
                                                        error={formErrors.jobtitle && true}
                                                        value={(jobportal && jobportal.jobtitle !== null) ? jobportal.jobtitle : null}
                                                        onChange={handleChange}
                                                        className={formErrors.jobtitle && "input-error"}

                                                    />
                                                    {formErrors.jobtitle && (
                                                        <span className="error">{formErrors.jobtitle}</span>
                                                    )}
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <TextField
                                                        fullWidth
                                                        id="Number of vacanciese"
                                                        name="numofvacanciese"
                                                        label="Number of vacancies"
                                                        variant="outlined"
                                                        error={formErrors.numofvacanciese && true}
                                                        value={(jobportal && jobportal.numofvacanciese !== null) ? jobportal.numofvacanciese : null}
                                                        onChange={handleChange}
                                                        className={formErrors.numofvacanciese && "input-error"}

                                                    />
                                                    {formErrors.numofvacanciese && (
                                                        <span className="error">{formErrors.numofvacanciese}</span>
                                                    )}
                                                </Grid>


                                            </Grid>

                                            <Grid container className={classes.root} spacing={5}>
                                                <Grid item xs={4}></Grid>
                                                <Grid item xs={4}></Grid>
                                                <Grid item xs={4}></Grid>
                                            </Grid>

                                            <Grid container className={classes.root} spacing={5} >
                                                <Grid item xs={4}>
                                                    <FormControl variant="outlined" style={{ width: '100%' }}>
                                                        <InputLabel id="demo-simple-select-outlined-label">Exp. required</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="demo-simple-select-outlined"
                                                            name="exprequire"
                                                            error={formErrors.exprequire && true}
                                                            value={(jobportal && jobportal.exprequire !== null) ? jobportal.exprequire : ""}
                                                            onChange={handleChange}
                                                            className={formErrors.exprequire && "input-error"}
                                                            label="Exp. required"
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            <MenuItem value={1}>0</MenuItem>
                                                            <MenuItem value={2}>1</MenuItem>
                                                            <MenuItem value={3}>2</MenuItem>
                                                            <MenuItem value={4}>3</MenuItem>
                                                            <MenuItem value={5}>4</MenuItem>
                                                            <MenuItem value={6}>5</MenuItem>
                                                            <MenuItem value={7}>6</MenuItem>
                                                            <MenuItem value={8}>7</MenuItem>
                                                            <MenuItem value={9}>8</MenuItem>
                                                            <MenuItem value={10}>9</MenuItem>
                                                            <MenuItem value={11}>10</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    {formErrors.exprequire && (
                                                        <span className="error">{formErrors.exprequire}</span>
                                                    )}

                                                </Grid>

                                                <Grid item xs={4}>
                                                    <FormControl variant="outlined" style={{ width: '100%' }}>
                                                        <InputLabel id="demo-simple-select-outlined-label">Min. Qualification </InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="demo-simple-select-outlined"
                                                            name="minqualification"
                                                            label="Min. Qualification"
                                                            error={formErrors.minqualification && true}
                                                            value={(jobportal && jobportal.minqualification !== null) ? jobportal.minqualification : null}
                                                            onChange={handleChange}
                                                            className={formErrors.minqualification && "input-error"}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            <MenuItem value="btech">btech</MenuItem>
                                                            <MenuItem value="be">Btech,BE</MenuItem>
                                                            <MenuItem value="graduation">graduation</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    {formErrors.minqualification && (
                                                        <span className="error">{formErrors.minqualification}</span>
                                                    )}
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <FormControl variant="outlined" style={{ width: '100%' }}>
                                                        <InputLabel id="demo-simple-select-outlined-label">Job active </InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="demo-simple-select-outlined"
                                                            name="jobactive"
                                                            label="Job active"
                                                            error={formErrors.jobactive && true}
                                                            value={(jobportal && jobportal.jobactive !== null) ? jobportal.jobactive : null}
                                                            onChange={handleChange}
                                                            className={formErrors.jobactive && "input-error"}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            <MenuItem value="yes">Yes</MenuItem>
                                                            <MenuItem value="no">No</MenuItem>
                                                            {/* <MenuItem value={3}>3</MenuItem> */}
                                                        </Select>
                                                    </FormControl>
                                                    {formErrors.jobactive && (
                                                        <span className="error">{formErrors.jobactive}</span>
                                                    )}
                                                </Grid>




                                            </Grid>

                                            <Grid container className={classes.root} spacing={5}>
                                                <Grid item xs={4}></Grid>
                                                <Grid item xs={4}></Grid>
                                                <Grid item xs={4}></Grid>
                                            </Grid>

                                            <Grid container className={classes.root} spacing={5} >
                                                <Grid item xs={4} >
                                                    <TextareaAutosize
                                                        // fullWidth
                                                        // multiline
                                                        rows={3}
                                                        id="Job Description"
                                                        variant="outlined"
                                                        label="Job-Description"
                                                        name="jobdescription"
                                                        placeholder="job description"
                                                        style={{ width: '450px', height: "100px" }}
                                                        error={formErrors.jobdescription && true}
                                                        value={(jobportal && jobportal.jobdescription !== null) ? jobportal.jobdescription : null}
                                                        onChange={handleChange}
                                                        className={formErrors.jobdescription && "input-error"}
                                                        className={classes.textField}
                                                    // InputLabelProps={{
                                                    //     shrink: true,
                                                    // }}
                                                    />
                                                    {formErrors.jobdescription && (
                                                        <span className="error">{formErrors.jobdescription}</span>
                                                    )}

                                                </Grid>

                                                <Grid item xs={4}>
                                                    <TextareaAutosize
                                                        // fullWidth
                                                        // multiline
                                                        rows={3}
                                                        id="Company profile"
                                                        variant="outlined"
                                                        label="Company profile"
                                                        name="Companyprofile"
                                                        placeholder="Company profile"
                                                        style={{ width: '450px', height: "100px" }}
                                                        error={formErrors.Companyprofile && true}
                                                        value={(jobportal && jobportal.Companyprofile !== null) ? jobportal.Companyprofile : null}
                                                        onChange={handleChange}
                                                        className={formErrors.Companyprofile && "input-error"}
                                                        className={classes.textField}
                                                    // InputLabelProps={{
                                                    //     shrink: true,
                                                    // }}
                                                    />
                                                    {formErrors.Companyprofile && (
                                                        <span className="error">{formErrors.Companyprofile}</span>
                                                    )}

                                                </Grid>

                                                <Grid item xs={4}>
                                                    <TextareaAutosize
                                                        // fullWidth
                                                        // multiline
                                                        rows={3}
                                                        id="Role&responsibilities"
                                                        variant="outlined"
                                                        label="Role&responsibilities"
                                                        name="roleresponsibilities"
                                                        placeholder="role & responsibilities"
                                                        style={{ width: '430px', height: "100px" }}
                                                        error={formErrors.roleresponsibilities && true}
                                                        value={(jobportal && jobportal.roleresponsibilities !== null) ? jobportal.roleresponsibilities : null}
                                                        onChange={handleChange}
                                                        className={formErrors.roleresponsibilities && "input-error"}
                                                        className={classes.textField}
                                                    // InputLabelProps={{
                                                    //     shrink: true,
                                                    // }}
                                                    />
                                                    {formErrors.roleresponsibilities && (
                                                        <span className="error">{formErrors.roleresponsibilities}</span>
                                                    )}
                                                </Grid>



                                            </Grid>


                                            <Grid container className={classes.root} spacing={3}>
                                                <Grid item xs={4} style={{ display: 'flex' }}>
                                                    <Button type="submit" style={{ marginTop: "10px" }} variant="contained" color="primary">Edit</Button>
                                                    <Button type="button" style={{ marginTop: "10px" }} onClick={(e) => { e.preventDefault(); props.history.push('/job') }}>Cancel</Button>
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

export default EditJob;
