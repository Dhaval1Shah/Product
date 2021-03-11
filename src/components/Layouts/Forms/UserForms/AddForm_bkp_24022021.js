import React, { useState, useEffect } from 'react';
import { Formik, Form } from "formik";
import * as yup from 'yup';
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

const validationSchema = yup.object({
    firstName: yup
        .string('Enter your firstName')
        .required('FirstName is required'),
    lastName: yup
        .string('Enter your lastName')
        .required('LastName is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    dob: yup
        .date('Enter your dob')
        .required('dob is required').nullable(),
    qualification: yup
        .string('Enter your qualification')
        .required('qualification is required'),
    last_organization: yup
        .string('Enter your last_organization')
        .required('last_organization is required'),
    password: yup
        .string('Enter your password')
        .required('password is required'),
    roleName: yup
        .string('Enter your roleName')
        .required('roleName is required'),
});

const iniuser = {
    firstName: null,
    lastName: null,
    email: null,
    gender: null,
    dob: null,
    photo: null,
    imageName: null,
    qualification: null,
    last_organization: null,
    password: null,
    roleName: null,
    role: false
}

const iniuservalid = {
    firstName: null,
    lastName: null,
    email: null,
    gender: null,
    dob: null,
    photo: null,
    imageName: null,
    qualification: null,
    last_organization: null,
    password: null,
    roleName: null,
    role: false
    
}


const Addform = (props) => {
    const classes = props;
    const [user, setUser] = React.useState(iniuservalid);
    //const [uploadedImgName, setuploadedImgName] = React.useState(iniuser);
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
        const regex = /^[a-zA-Z]+$/;
        const emailRegx = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
        const dobRegx = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
        const passRegx = /^[#\w@_-]{8,20}$/;
       
    //   const roleRegx = {
    //     ...values,
    //     roleName: values.roleName.map(t => t.value),
    //   };

        if (!values.firstName) {
          errors.firstName = "Cannot be blank";
        } else if (!regex.test(values.firstName)) {
          errors.firstName = "Invalid firstName format";
        }

        if(!values.lastName) {
            errors.lastName = "Cannot be blank";
        } else if (!regex.test(values.lastName)) {
            errors.lastName = "Invalid lastName format";
        }

        if(!values.email) {
            errors.email = "Cannot be  blank";
        } else if(!emailRegx.test(values.email)) {
            errors.email = "Invalid email format"
        }

        if(!values.dob) {
            errors.dob = "Cannot be  blank";
        } else if(!dobRegx.test(values.dob)) {
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

      useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
          submitForm();
        }
      }, [formErrors]);

    // const roleData = async () => {
    //     const role = await AuthApi.getRole();
    //     //console.log(role);
    //     setTimeout(() => {
    //             setRoles({
    //                 roleArray: role.data
    //             },[]); 

    //     console.log(roles);return false;

    //         // if (Object.keys(roles.roleArray).length > 0) {
    //         //     Object.keys(roles.roleArray).forEach((key) => {
    //         //         roleOptions.push(<MenuItem value={roles.roleArray[key].name}>{roles.roleArray[key].name}</MenuItem>)
    //         //     })
    //         // }
    //         // else {
    //         //     roleOptions.push(<MenuItem value=""><em>Select Role</em></MenuItem>);
    //         // }
    //         // // console.log(roleOptions)
    //         // console.log(roles.roleArray);
    //     }, 2000);



    // }
    //  React.useEffect(() => roleData(), []);

    // async function RoleData() {
    //     let rolee = await AuthApi.getRole();
    //     // console.log(rolee); 
    //     if (rolee && rolee.status === true) {
    //         setRoles({ roleArray: rolee.data });
    //     }
    //     // console.log(roles)
    //     if (Object.keys(roles.roleArray).length > 0) {
    //         Object.keys(roles.roleArray).forEach((key) => {
    //             roleOptions.push(<MenuItem value={roles.roleArray[key].name}>{roles.roleArray[key].name}</MenuItem>)
    //         })
    //     }
    //     else {
    //         roleOptions.push(<MenuItem value=""><em>Select Role</em></MenuItem>);
    //     }


    // }
    // React.useEffect(() => RoleData(), []);


    async function RoleData() {
        let role = await AuthApi.getRole();
        //    console.log(rolee); 
        if (role && role.status === true) {
            if (Object.keys(role.data).length > 0) {
                Object.keys(role.data).forEach((key) => {
                    roleOptions.push(<MenuItem value={role.data[key].name}>{role.data[key].name}</MenuItem>)
                })
            }
            else {
                roleOptions.push(<MenuItem value=""><em>Select Role</em></MenuItem>);
            }

            //    setRoles({ roleArray: role.data });
        }
        // console.log(roleOptions);



    }
    React.useEffect(() => RoleData(), []);


    // React.useEffect(() => roleData(), []);
    //   roleData();
    // const formik = useFormik({
    //     initialValues: {
    //         email: '',
    //         lastName: '',
    //         firstName: '',
    //         gender: '',
    //         dob: null,
    //         photo: null,
    //         qualification: '',
    //         last_organization: '',
    //         password: '',
    //         roleName: '',
    //     },
    //     validationSchema: validationSchema,
    //     onSubmit: async (values) => {
    //         console.log(values)
    //     },
    // });

    //  const addRole = async (e) => {
    //     let roleName = [];
    //     roleName.push(e.target.value)
    //     setUser({
    //         ...user, 
    //         roleName: e.target.value 
    //     })
    // }




    const imgUpload = async (e) => {
        const postData = new FormData();
        postData.append('file', e.target.files[0]);
        let updaImg = await AuthApi.updateImg(postData);
        if (updaImg && updaImg.status === true) {
            // const { name, value } = updaImg.data.image_url;
            // setFormValues({ ...formValues, [name]: value });

            setFormValues({   
                ...formValues,             
                photo: updaImg.data.image_url,
                imageName: updaImg.data.image_name
            })
            // setuploadedImgName({

            // })
            //    console.log(iniuser)
        }
        console.log(formValues)
    }

    const removeImg = async (e) => {
        let imageLink = formValues.photo;
        imageLink = imageLink.substr(imageLink.indexOf('/', 7) + 1)
        // console.log(imageLink)
        let remImg = await AuthApi.deleteImg(imageLink);
        // console.log(remImg)
        if (remImg && remImg.status === true) {
            setFormValues({
                ...formValues,
                photo: null,
                imageName: null
            })

        } else {

        }

    }

    // const updateChange = async (e) => {
    //     setUser({
    //         ...user,
    //         [e.target.name]: e.target.value
    //     })
    //     console.log(user)
    // }

    const handleSubmit = async (e) => {
        // let roleName = [];
        // roleName.push(e.target.value)
        e.preventDefault()      
        setFormErrors(validate(formValues));
        setIsSubmitting(true);
        // setUser({
        //     // firstName: e.target.value    
        //     firstName: e.target.firstName.value,
        //     lastName: e.target.lastName.value,
        //     email: e.target.email.value,
        //     gender: e.target.gender.value,
        //     dob: e.target.dob.value,
        //     photo: e.target.photo.value,
        //     qualification: e.target.qualification.value,
        //     last_organization: e.target.last_organization.value,
        //     password: e.target.password.value,
        //     roleName: e.target.roleName.value,

        // })


       
        //  console.log(formValues);
        //  return false;

        //console.log(roleName);

        // console.log(user);
        await createUser();

    }


    const createUser = async () => {
        //    console.log(create)
        //   return false;
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
            {/* <Formik
                initialValues={{
                    email: '',
                    lastName: '',
                    firstName: '',
                    gender: '',
                    dob: null,
                    photo: null,
                    qualification: '',
                    last_organization: '',
                    password: '',
                    roleName: '',
                    role: false

                }}
                validationSchema={validationSchema}

            > */}
                {/* {({ errors, handleChange, touched }) => ( */}
                    <form className={classes.form} onSubmit={handleSubmit} >
                        <Grid container className={classes.root} spacing={5}>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    id="firstName"
                                    name="firstName"
                                    label="FirstName"
                                    variant="outlined"
                                    value={formValues.firstName}
                                    onChange={handleChange1}
                                    className={formErrors.firstName && "input-error"}
                                // value={formik.values.firstName}
                                // //onChange={formik.handleChange}
                                // //onChange={formik.handleChange === false ?  (e) => {updateChange(e)} : true}
                                // onChange={(e) => console.log("test")} 
                                // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                // helperText={formik.touched.firstName && formik.errors.firstName}
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
                                    value={formValues.lastName}
                                    onChange={handleChange1}
                                    className={formErrors.lastName && "input-error"}
                                // value={formik.values.lastName}
                                // onChange={formik.handleChange}
                                // error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                // helperText={formik.touched.lastName && formik.errors.lastName}
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
                                     value={formValues.email}
                                    onChange={handleChange1}
                                    className={formErrors.email && "input-error"}
                                // value={formik.values.email}
                                // onChange={formik.handleChange}
                                // error={formik.touched.email && Boolean(formik.errors.email)}
                                // helperText={formik.touched.email && formik.errors.email}
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
                                    <RadioGroup aria-label="gender" name="gender" defaultValue="female" onChange={handleChange1} fullWidth>
                                        <Grid container className={classes.root} spacing={2}>
                                            <Grid textAlign="left" item xs={6}><FormControlLabel value="female" control={<Radio />} label="Female" /></Grid>
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
                                    value={formValues.dob}
                                    onChange={handleChange1}
                                    className={formErrors.dob && "input-error"}
                                    // value={formik.values.dob}
                                    // onChange={formik.handleChange}
                                    // error={formik.touched.dob && Boolean(formik.errors.dob)}
                                    // helperText={formik.touched.dob && formik.errors.dob}
                                    // onChange={(e) => {updateChange(e) }}
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
                                value={formValues.qualification}
                                onChange={handleChange1}
                                className={formErrors.dob && "input-error"}
                            // value={formik.values.qualification}
                            // onChange={formik.handleChange}
                            // error={formik.touched.qualification && Boolean(formik.errors.qualification)}
                            // helperText={formik.touched.qualification && formik.errors.qualification}
                            // onChange={(e) => { updateChange(e) }}
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
                                value={formValues.last_organization}
                                onChange={handleChange1}
                                className={formErrors.last_organization && "input-error"}
                            // value={formik.values.last_organization}
                            // onChange={formik.handleChange}
                            // error={formik.touched.last_organization && Boolean(formik.errors.last_organization)}
                            // helperText={formik.touched.last_organization && formik.errors.last_organization}
                            // onChange={(e) => { updateChange(e) }}
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
                                value={formValues.password}
                                onChange={handleChange1}
                                className={formErrors.password && "input-error"}
                            // value={formik.values.password}
                            // onChange={formik.handleChange}
                            // error={formik.touched.password && Boolean(formik.errors.password)}
                            // helperText={formik.touched.password && formik.errors.password}
                            // onChange={(e) => { updateChange(e) }}
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
                                        value={formValues.roleName}
                                        onChange={handleChange1}
                                        className={formErrors.roleName && "input-error"}
                                       
                                    // value={formik.values.roleName}
                                    // onChange={formik.handleChange}
                                    // error={formik.touched.roleName && Boolean(formik.errors.roleName)}
                                    // helperText={formik.touched.roleName && formik.errors.roleName}
                                    //  onChange={handleChange === true ? (e) => {addRole(e)} : false}
                                    >
                                        {roleOptions}
                                      
                                    </Select>
                                    {formErrors.roleName && (
            <span className="error">{formErrors.roleName}</span>
          )}
                                </FormControl>
                               
                            </Grid>
                            <Grid item xs={4} true></Grid>
                            <Grid item xs={4} true></Grid>
                        </Grid>
                        <Grid container className={classes.root} spacing={3}>
                            <Grid item xs={4} style={{ display: 'flex' }}>
                                <Button type="submit">Save</Button>
                                <Button type="button" onClick={(e) => { e.preventDefault(); props.history.push('/users') }}>Cancel</Button>
                            </Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}></Grid>
                        </Grid>

                    </form>
                {/* // )} */}
            {/* </Formik> */}
        </div>
    )
}

export default Addform;