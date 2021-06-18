import React, { useState, useEffect } from 'react';
import Header from '../../Layouts/Header';
import Footer from '../../Layouts/Footer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Breadcrumb from '../../Layouts/Breadcrumb';
import Typography from '@material-ui/core/Typography';
import { colors, TextField } from '@material-ui/core';
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
import GridList from '@material-ui/core/GridList';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';





const iniEvent = {
    eventName: "",
    eventdate: "",

}


const AddEvent = (props) => {
    const classes = props;

    const [eventValues, setEventsValues] = useState(iniEvent);
    const [selectedImages, setSelectedImages] = useState([]);
    const [stringImages, setStringImages] = useState({ images: [] });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        if (props && props.authToken === false) {
            props.history.push('/login');
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventsValues({ ...eventValues, [name]: value });
        // console.log(eventValues);
    };




    const imageHandleChange = (e) => {
        const files = e.target.files
        const stringFiles = [];
        if (e.target.files) {
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    stringFiles.push(reader.result.replace("data:", "").replace(/^.+,/, ""));
                };
                reader.readAsDataURL(files[i]);
            }

            const fileArray1 = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
            setSelectedImages((prevImages) => prevImages.concat(fileArray1))
            setStringImages({ ...stringImages, images: stringFiles });

            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file)
            )
        }
    }




    const renderPhotos = (source) => {
        return source.map((photo, index) => {
            return <div key={Math.random()} style={{ float: "left" }}>
                <img src={photo} key={photo} alt="User profile image" style={{ padding: "20px" }} width="200px" height="200px" />
                <Button style={{ marginTop: "-20rem" }} onClick={(e) => { removeImage(index) }}>x</Button>
            </div>
        })
    }

    const removeImage = (e) => {
        const stringImages1 = stringImages.images
        const selectedImages1 = selectedImages
        stringImages1.splice(e, 1)
        selectedImages1.splice(e, 1)


        setSelectedImages((prevImages) => prevImages = selectedImages1)
        setStringImages({ ...stringImages, images: stringImages1 });
    }






    const validate = (values) => {
        let errors = {};
        const regex = /^[a-zA-Z]/;
        const dateR = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;



        if (!values.eventName) {
            errors.eventName = "Cannot be blank";
        } else if (!regex.test(values.eventName)) {
            errors.eventName = "Invalid ticketMesasge format";
        }

        if (!values.eventdate) {
            errors.eventdate = "Cannot be  blank";
        } else if (!dateR.test(values.eventdate)) {
            errors.eventdate = "Invalid dob format"
        }



        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormErrors(validate(eventValues));
        setIsSubmitting(true);
    }

    useEffect(async () => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            await event();
        }
    }, [formErrors])




    const event = async () => {
        console.log(stringImages)
        let create1 = await AuthApi.createEvent(eventValues, stringImages.images);
        console.log(create1)
        if (create1 && create1.status === true) {
            props.history.push('/event');
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
                                    primaryPageName="Event"
                                    primaryPageLink="/event"
                                    isSecondaryPage={true}
                                    secondaryPageName="Add" />
                            </CardContent>
                        </Card>
                        <Grid container className={classes.root} spacing={2}>
                            <Grid item xs={12}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <Typography variant="h2">Add Event</Typography>
                                        <form className={classes.form} onSubmit={handleSubmit} >
                                            <Grid container className={classes.root} spacing={5}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        fullWidth
                                                        id="EventName"
                                                        name="eventName"
                                                        label="Event-Name"
                                                        variant="outlined"
                                                        error={formErrors.eventName && true}
                                                        value={eventValues.eventName}
                                                        onChange={handleChange}
                                                        className={formErrors.eventName && "input-error"}

                                                    />
                                                    {formErrors.eventName && (
                                                        <span className="error">{formErrors.eventName}</span>
                                                    )}
                                                </Grid>


                                                <Grid item xs={6}>
                                                    <TextField
                                                        fullWidth
                                                        id="date"
                                                        variant="outlined"
                                                        label="Event-Date"
                                                        name="eventdate"
                                                        type="date"
                                                        error={formErrors.eventdate && true}
                                                        value={eventValues.eventdate}
                                                        onChange={handleChange}
                                                        className={formErrors.eventdate && "input-error"}
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                    {formErrors.eventdate && (
                                                        <span className="error">{formErrors.eventdate}</span>
                                                    )}
                                                </Grid>


                                            </Grid>

                                            <Grid container className={classes.root} spacing={5}>
                                                <Grid item xs={4}></Grid>
                                                <Grid item xs={4}></Grid>
                                                <Grid item xs={4}></Grid>
                                            </Grid>

                                            <Grid container className={classes.root} spacing={5} >
                                                <Grid item xs={12} style={{ display: 'flex' }} >

                                                    <div>
                                                        <input
                                                            accept="image/*"
                                                            // className={classes.input}
                                                            id="contained-button-file"
                                                            multiple
                                                            type="file"
                                                            onChange={(e) => { imageHandleChange(e) }}
                                                            style={{ display: 'none' }}
                                                        />
                                                        <label htmlFor="contained-button-file">
                                                            <Button style={{ float: "left" }} variant="contained" color="primary" component="span" > Upload Event Picture </Button>
                                                        </label>
                                                    </div>
                                                </Grid>



                                            </Grid>

                                            <Grid container className={classes.root} spacing={5} >
                                                <Grid item xs={12}>
                                                    <div style={{ float: "left" }}>
                                                        <Card className={classes.root}>
                                                            <Grid item xs={12}>
                                                                {renderPhotos(selectedImages)}
                                                            </Grid>
                                                        </Card>
                                                    </div>
                                                </Grid>
                                            </Grid>

                                            <Grid container className={classes.root} spacing={3}>
                                                <Grid item xs={4} style={{ display: 'flex' }}>
                                                    <Button type="submit" variant="contained" color="primary">Save</Button>
                                                    <Button type="button" style={{ marginTop: "10px" }} onClick={(e) => { e.preventDefault(); props.history.push('/event') }}>Cancel</Button>
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

export default AddEvent;



