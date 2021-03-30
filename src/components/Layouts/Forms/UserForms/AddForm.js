import React, { useState, useEffect } from 'react';
import './AddForm.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AuthApi from '../../../Services/Authapi';
import swal from 'sweetalert';
import ls from "local-storage";
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FontAwesomeIconComponent from '../../../Layouts/FontAwesomeIconComponent';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const iniuservalid = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dob: "",
    photo: null,
    imageName: "",
    qualification: "",
    last_organization: "",
    password: "",
    roleName: "",
    role: false

}


const Addform = (props) => {
    const classes = props;
    const [roleOptions] = React.useState([]);
    const [formValues, setFormValues] = useState(iniuservalid);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);



    const submitForm = () => {
        console.log(formValues);
    };


    const handleChange1 = (e) => {
        const { name, value } = e.target;
        // console.log(value);
        setFormValues({ ...formValues, [name]: value });
        // console.log(formValues);
    };


    const validate = (values) => {
        let errors = {};
        const regex = /^[a-zA-Z]/;
        const emailRegx = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
        const dobRegx = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
        const passRegx = /^[#\w@_-]{8,20}$/;


        if (!values.firstName) {
            errors.firstName = "Cannot be blank";
        } else if (!regex.test(values.firstName)) {
            errors.firstName = "Invalid firstName format";
        }

        if (!values.lastName) {
            errors.lastName = "Cannot be blank";
        } else if (!regex.test(values.lastName)) {
            errors.lastName = "Invalid lastName format";
        }

        if (!values.email) {
            errors.email = "Cannot be  blank";
        } else if (!emailRegx.test(values.email)) {
            errors.email = "Invalid email format"
        }

        if (!values.dob) {
            errors.dob = "Cannot be  blank";
        } else if (!dobRegx.test(values.dob)) {
            errors.dob = "Invalid dob format"
        }

        if (!values.qualification) {
            errors.qualification = "Cannot be blank";
        } else if (!regex.test(values.qualification)) {
            errors.qualification = "Invalid qualification format";
        }

        if (!values.last_organization) {
            errors.last_organization = "Cannot be blank";
        } else if (!regex.test(values.last_organization)) {
            errors.last_organization = "Invalid last_organization format";
        }

        if (!values.password) {
            errors.password = "Cannot be blank";
        } else if (!passRegx.test(values.password)) {
            errors.password = "Password must be require";
        }

        if (!values.roleName) {
            errors.roleName = "Cannot be blank";
        }

        return errors;
    };

   


    async function RoleData() {
        let role = await AuthApi.getRole();
        //    console.log(rolee); 
        if (role && role.status === true) {
            if (Object.keys(role.data).length > 0) {
                Object.keys(role.data).forEach((key) => {
                    roleOptions.push(<MenuItem key={key} value={role.data[key].name}>{role.data[key].name}</MenuItem>)
                })
            }
            else {
                roleOptions.push(<MenuItem value=""><em>Select Role</em></MenuItem>);
            }
        }




    }
    React.useEffect(() => RoleData(), []);




    const imgUpload = async (e) => {
        const postData = new FormData();
        postData.append('file', e.target.files[0]);
        let updaImg = await AuthApi.updateImg(postData);
        if (updaImg && updaImg.status === true) {

            setFormValues({
                ...formValues,
                photo: updaImg.data.image_url,
                imageName: updaImg.data.image_name
            })

        }
      
    }

    const removeImg = async (e) => {
        let imageLink = formValues.photo;
        imageLink = imageLink.substr(imageLink.indexOf('/', 7) + 1)
        let remImg = await AuthApi.deleteImg(imageLink);
        if (remImg && remImg.status === true) {
            setFormValues({
                ...formValues,
                photo: null,
                imageName: null
            })

        } else {

        }

    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormErrors(validate(formValues));
        setIsSubmitting(true);

        

    }

    useEffect(async () => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            await createUser();
        }
    }, [formErrors]);



    const createUser = async () => {
        let create = await AuthApi.createUser(formValues)

        if (create && create.status === true) {
            props.history.push('/users');
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

            <form className={classes.form} onSubmit={handleSubmit} >
                <Grid container className={classes.root} spacing={5}>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            id="firstName"
                            name="firstName"
                            label="FirstName"
                            variant="outlined"
                            error = {formErrors.firstName && true}
                            value={formValues.firstName}
                            onChange={handleChange1}
                            className={formErrors.firstName && "input-error"}
                            
                        />
                        {formErrors.firstName && (
                            <span className="error">{formErrors.firstName}</span>
                        )}
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            id="lastName"
                            name="lastName"
                            label="LastName"
                            variant="outlined"
                            error = {formErrors.lastName && true}
                            value={formValues.lastName}
                            onChange={handleChange1}
                            className={formErrors.lastName && "input-error"}

                        />
                        {formErrors.lastName && (
                            <span className="error">{formErrors.lastName}</span>
                        )}
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            error = {formErrors.email && true}
                            value={formValues.email}
                            onChange={handleChange1}
                            className={formErrors.email && "input-error"}

                        />
                        {formErrors.email && (
                            <span className="error">{formErrors.email}</span>
                        )}
                    </Grid>
                </Grid>
                <Grid container className={classes.root} spacing={5}>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
                <Grid container className={classes.root} spacing={5} >
                    <Grid item xs={4} style={{ display: 'flex' }}>
                        <FormControl component="fieldset">
                            <Grid container className={classes.root} spacing={4} >
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <FormLabel component="legend">Gender</FormLabel>
                                </Grid>
                            </Grid>
                            <RadioGroup aria-label="gender" name="gender" defaultValue="female" onChange={handleChange1}>
                                <Grid container className={classes.root} spacing={2}>
                                    <Grid textalign='left' item xs={6}><FormControlLabel value="female" control={<Radio />} label="Female" /></Grid>
                                    <Grid item xs={6}><FormControlLabel value="male" control={<Radio />} label="Male" /></Grid>

                                </Grid>
                            </RadioGroup>
                        </FormControl></Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            id="date"
                            variant="outlined"
                            label="Birthday"
                            name="dob"
                            type="date"
                            error = {formErrors.dob && true}
                            value={formValues.dob}
                            onChange={handleChange1}
                            className={formErrors.dob && "input-error"}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        {formErrors.dob && (
                            <span className="error">{formErrors.dob}</span>
                        )}
                    </Grid>
                    <Grid item xs={4} style={{ display: 'flex' }}>
                        {
                            (formValues.photo === null) ?
                                <div>
                                    <input
                                        accept="image/*"
                                        className={classes.input}
                                        name="photo"
                                        id="contained-button-file"
                                        type="file"
                                        onChange={(e) => imgUpload(e)}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Button variant="contained" color="primary" component="span" > Upload Profile Picture </Button>
                                    </label>
                                </div>
                                :
                                <div>
                                    <Card className={classes.root}>
                                        <CardContent>
                                            <Grid container className={classes.root} spacing={5}>
                                                <Grid item xs={4}>
                                                    <img src={formValues.photo} alt="User profile image" width="35" height="35" />
                                                </Grid>
                                                <input
                                                    className={classes.input}
                                                    name="photo"
                                                    id="photo"
                                                    type="hidden"
                                                    value={formValues.photo ? formValues.photo : ""}
                                                />
                                                <Grid item xs={4}>
                                                    <Typography variant="subtitle1" gutterBottom>
                                                        {formValues.imageName}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Button onClick={(e) => removeImg(e)}>
                                                        <FontAwesomeIconComponent classes="fa fa-trash" colorName="primary" fontSize={"small"} /></Button>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </div>
                        }

                    </Grid>
                </Grid>
                <Grid container className={classes.root} spacing={5}>
                    <Grid item xs={4}><TextField
                        fullWidth id="outlined-basic"
                        name="qualification"
                        label="Qualification"
                        variant="outlined"
                        error = {formErrors.qualification && true}
                        value={formValues.qualification}
                        onChange={handleChange1}
                        className={formErrors.dob && "input-error"}


                    />
                        {formErrors.qualification && (
                            <span className="error">{formErrors.qualification}</span>
                        )}
                    </Grid>
                    <Grid item xs={4}><TextField
                        fullWidth id="outlined-basic"
                        name="last_organization"
                        label="Last Organization"
                        variant="outlined"
                        error = {formErrors.last_organization && true}
                        value={formValues.last_organization}
                        onChange={handleChange1}
                        className={formErrors.last_organization && "input-error"}

                    />
                        {formErrors.last_organization && (
                            <span className="error">{formErrors.last_organization}</span>
                        )}
                    </Grid>
                    <Grid item xs={4}><TextField
                        fullWidth id="outlined-basic"
                        name="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        error = {formErrors.password && true}
                        value={formValues.password}
                        onChange={handleChange1}
                        className={formErrors.password && "input-error"}

                    />
                        {formErrors.password && (
                            <span className="error">{formErrors.password}</span>
                        )}
                    </Grid>
                </Grid>
                <Grid container className={classes.root} spacing={5}>
                    <Grid item xs={4}>
                        <FormControl variant="outlined" style={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                name="roleName"
                                label="Role"
                                error = {formErrors.roleName && true}
                                value={formValues.roleName}
                                onChange={handleChange1}
                                className={formErrors.roleName && "input-error"}


                            >
                                {roleOptions}

                            </Select>
                           
                        </FormControl>
                        {formErrors.roleName && (
                                <span className="error">{formErrors.roleName}</span>
                            )}

                    </Grid>
                    <Grid item xs={4} ></Grid>
                    <Grid item xs={4} ></Grid>
                </Grid>
                <Grid container className={classes.root} spacing={3}>
                    <Grid item xs={4} style={{ display: 'flex' }}>
                        <Button type="submit" variant="contained"  color="primary">Save</Button>
                        <Button type="button" onClick={(e) => { e.preventDefault(); props.history.push('/users') }}>Cancel</Button>
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid>
                </Grid>

            </form>

        </div>
    )
}

export default Addform;