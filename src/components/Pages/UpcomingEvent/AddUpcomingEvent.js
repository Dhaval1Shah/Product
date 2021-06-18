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
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
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
    upcomingEventName: "",
    upcomingEventdate: "",
    description: "",
    image: null
}


const UpcomingEvent = (props) => {
    const classes = props;

    const [eventValues, setEventsValues] = useState(iniEvent);
    // const [selectedImages, setSelectedImages] = useState({ image: null });
    // const [stringImages, setStringImages] = useState({ images: [] });
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


        // console.log(selectedImages);
    };


    const uploadSingleFile = async (e) => {
        const postData = new FormData();
        postData.append('file', e.target.files[0]);
        // console.log(postData);
        let updaImg = await AuthApi.uploadEventImg(postData);
        // console.log(updaImg)
        if (updaImg && updaImg.status === true) {

            setEventsValues({
                ...eventValues,
                image: updaImg.data.image_url,
                // imageName: updaImg.data.image_name
            })

        }
    }


    const removeImg = async (e) => {
        let imageLink = eventValues.image;
        imageLink = imageLink.substr(imageLink.indexOf('/', 7) + 1)
        let remImg = await AuthApi.upcomingdeleteImg(imageLink);
        console.log(remImg)
        if (remImg && remImg.status === true) {
            setEventsValues({
                ...eventValues,
                image: null,
                // imageName: null
            })

        } else {

        }

    }


    // const removeImage = (e) => {
    //     const stringImages1 = stringImages.images
    //     const selectedImages1 = selectedImages
    //     stringImages1.splice(e, 1)
    //     selectedImages1.splice(e, 1)


    //     setSelectedImages((prevImages) => prevImages = selectedImages1)
    //     setStringImages({ ...stringImages, images: stringImages1 });
    // }

    function dateDiffInDays(startDate, endDate) {
        // round to the nearest whole number
        return Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
    }

    const dsp = dateDiffInDays(new Date(), new Date(eventValues.upcomingEventdate))


    const validate = (values) => {
        let errors = {};
        const regex = /^[a-zA-Z]/;
        const dateR = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;



        if (!values.upcomingEventName) {
            errors.upcomingEventName = "Cannot be blank";
        } else if (!regex.test(values.upcomingEventName)) {
            errors.upcomingEventName = "Invalid upcomingEventName format";
        }

        if (!values.upcomingEventdate) {
            errors.upcomingEventdate = "Cannot be  blank";
        } else if (!dateR.test(values.upcomingEventdate)) {
            errors.upcomingEventdate = "Invalid upcomingEventdate format"
        }
        else {


            if (dsp < 0) {
                errors.upcomingEventdate = "you can chooes only Current and future Date";

            }
        }


        if (!values.description) {
            errors.description = "Cannot be  blank";
        } else if (!regex.test(values.description)) {
            errors.description = "Invalid description format"
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
            await upcomingEvent();
        }
    }, [formErrors])




    const upcomingEvent = async () => {

        let create1 = await AuthApi.createUpcomingEvent(eventValues);
        // console.log(create1)
        if (create1 && create1.status === true) {
            props.history.push('/upcoming');
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
                                    primaryPageName="Upcoming Events"
                                    primaryPageLink="/upcoming"
                                    isSecondaryPage={true}
                                    secondaryPageName="Add" />
                            </CardContent>
                        </Card>
                        <Grid container className={classes.root} spacing={2}>
                            <Grid item xs={12}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <Typography variant="h2">Add UPcommingEvent</Typography>
                                        <form className={classes.form} onSubmit={handleSubmit} >
                                            <Grid container className={classes.root} spacing={5}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        fullWidth
                                                        id="upcomingEventName"
                                                        name="upcomingEventName"
                                                        label="UpcomingEvent-Name"
                                                        variant="outlined"
                                                        error={formErrors.upcomingEventName && true}
                                                        value={eventValues.upcomingEventName}
                                                        onChange={handleChange}
                                                        className={formErrors.upcomingEventName && "input-error"}

                                                    />
                                                    {formErrors.upcomingEventName && (
                                                        <span className="error">{formErrors.upcomingEventName}</span>
                                                    )}
                                                </Grid>


                                                <Grid item xs={6}>
                                                    <TextField
                                                        fullWidth
                                                        id="date"
                                                        variant="outlined"
                                                        label="Upcoming-Event-Date"
                                                        name="upcomingEventdate"
                                                        type="date"
                                                        error={formErrors.upcomingEventdate && true}
                                                        value={eventValues.upcomingEventdate}
                                                        onChange={handleChange}
                                                        className={formErrors.upcomingEventdate && "input-error"}
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                    {formErrors.upcomingEventdate && (
                                                        <span className="error">{formErrors.upcomingEventdate}</span>
                                                    )}
                                                </Grid>


                                            </Grid>

                                            <Grid container className={classes.root} spacing={5}>
                                                <Grid item xs={4}></Grid>
                                                <Grid item xs={4}></Grid>
                                                <Grid item xs={4}></Grid>
                                            </Grid>

                                            <Grid container className={classes.root} spacing={5} >
                                                <Grid item xs={6}>
                                                    <TextareaAutosize
                                                        style={{ float: 'left', width: "670px" }}
                                                        aria-label="empty textarea"
                                                        placeholder="Add Details"
                                                        name="description"
                                                        error={formErrors.description && true}
                                                        className={formErrors.description && "input-error"}
                                                        rowsMin={3}
                                                        className={classes.textField}
                                                        value={eventValues.description}
                                                        onChange={handleChange}
                                                    />
                                                    {formErrors.description && (
                                                        <span className="error">{formErrors.description}</span>
                                                    )}
                                                </Grid>
                                                <Grid item xs={6} style={{ display: 'flex' }} >

                                                    {
                                                        (eventValues.image === null) ?
                                                            <div>
                                                                <input
                                                                    accept="image/*"
                                                                    className={classes.input}
                                                                    name="photo"
                                                                    id="contained-button-file"
                                                                    type="file"
                                                                    onChange={(e) => uploadSingleFile(e)}
                                                                    style={{ display: 'none' }}
                                                                />
                                                                <label htmlFor="contained-button-file">
                                                                    <Button variant="contained" color="primary" component="span" > Upload Event Picture </Button>
                                                                </label>
                                                            </div>
                                                            :
                                                            <div>
                                                                <Card className={classes.root}>
                                                                    <CardContent style={{ width: "550px" }}>
                                                                        <Grid container className={classes.root} spacing={5}>
                                                                            <Grid item xs={6}>
                                                                                <img src={eventValues.image} alt="Event image" width="100%" height="100%" />
                                                                            </Grid>
                                                                            <input
                                                                                className={classes.input}
                                                                                name="photo"
                                                                                id="photo"
                                                                                type="hidden"
                                                                                value={eventValues.image ? eventValues.image : ""}
                                                                            />
                                                                            <Grid item xs={6}>
                                                                                <Button style={{ marginTop: "70px" }}
                                                                                    onClick={(e) => removeImg(e)}
                                                                                >
                                                                                    <FontAwesomeIconComponent classes="fa fa-trash" colorName="primary" fontSize={"small"} /></Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </CardContent>
                                                                </Card>
                                                            </div>
                                                    }
                                                </Grid>



                                            </Grid>

                                            {/* <Grid container className={classes.root} spacing={5} >
                                                <Grid item xs={6}>
                                                    <div style={{ float: "left" }}>
                                                        <Card className={classes.root}>
                                                            <Grid item xs={12}>
                                                                <div>
                                                                    <img src={eventValues.image} alt="Event image" width="100" height="100" />
                                                                </div>
                                                            </Grid>
                                                        </Card>
                                                    </div>
                                                </Grid>
                                            </Grid> */}



                                            <Grid container className={classes.root} spacing={3}>
                                                <Grid item xs={4} style={{ display: 'flex' }}>
                                                    <Button type="submit" variant="contained" color="primary">Save</Button>
                                                    <Button type="button" style={{ marginTop: "10px" }} onClick={(e) => { e.preventDefault(); props.history.push('/upcoming') }}>Cancel</Button>
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

export default UpcomingEvent;



