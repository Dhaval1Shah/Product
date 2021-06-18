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
import ls from "local-storage";


const iniEvent = {
    upcomingEventName: "",
    upcomingEventdate: "",
    description: "",
    image: null,
    event_Id: 0,
}


const EditTicket = (props) => {
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

        if (!values.description) {
            errors.description = "Cannot be  blank";
        } else if (!regex.test(values.description)) {
            errors.description = "Invalid description format"
        }




        return errors;
    };

    const getEventData = async () => {
        let Id = props.history.location.pathname.split('/')[props.history.location.pathname.split('/').length - 1];

        let upcomingEvent = await AuthApi.singleUpcomingEvent(Id);

        let event_Id = Id

        let upcomingEventName = (upcomingEvent.status === true && upcomingEvent.data && upcomingEvent.data.name && (upcomingEvent.data.name !== null || upcomingEvent.data.name !== false)) ? upcomingEvent.data.name : null;
        let upcomingEventdate = (upcomingEvent.status === true && upcomingEvent.data && upcomingEvent.data.date) ? upcomingEvent.data.date : null;
        let description = (upcomingEvent.status === true && upcomingEvent.data && upcomingEvent.data.description) ? upcomingEvent.data.description : null;
        let image = (upcomingEvent.status === true && upcomingEvent.data && upcomingEvent.data.image) ? upcomingEvent.data.image : null;



        setEventsValues({
            upcomingEventName: upcomingEventName,
            upcomingEventdate: upcomingEventdate,
            description: description,
            image: image,
            event_Id: event_Id,


        });




    }
    useEffect(
        () =>
            setTimeout(
                () => getEventData(),
                500), []);



    const uploadSingleFile = async (e) => {
        const postData = new FormData();
        postData.append('file', e.target.files[0]);

        let updaImg = await AuthApi.uploadEventImg(postData);

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
        console.log(imageLink)
        let remImg = await AuthApi.upcomingdeleteImg(imageLink);

        if (remImg && remImg.status === true) {
            // setEventsValues({
            //     // ...setEditValues,
            //     image: null,

            // })
            getEventData()

        } else {

        }
        // setEditValues({
        //     photo: null,
        //     uploadedImgName: null
        // })

    }






    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormErrors(validate(eventValues));
        setIsSubmitting(true);

    }

    useEffect(async () => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            await editUpComingEvent();
        }
    }, [formErrors]);




    const editUpComingEvent = async (id) => {
        let status = await AuthApi.updateUpcomingEvent(eventValues, eventValues.event_Id);

        if (status && status.status === true) {
            props.history.push('/upcoming');
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
                                    secondaryPageName="edit" />
                            </CardContent>
                        </Card>
                        <Grid container className={classes.root} spacing={2}>
                            <Grid item xs={12}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <Typography variant="h2">Edit Upcoming Event</Typography>
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
                                                        value={(eventValues && eventValues.upcomingEventName !== null) ? eventValues.upcomingEventName : null}
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
                                                        value={(eventValues && eventValues.upcomingEventdate !== null) ? eventValues.upcomingEventdate : null}
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
                                                        value={(eventValues && eventValues.description !== null) ? eventValues.description : null}
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



                                            <Grid container className={classes.root} spacing={3}>
                                                <Grid item xs={4} style={{ display: 'flex' }}>
                                                    <Button type="submit" style={{ marginTop: "10px" }} variant="contained" color="primary">Edit</Button>
                                                    <Button type="button" style={{ marginTop: "10px" }} onClick={(e) => { e.preventDefault(); props.history.push('/upcoming') }}>Cancel</Button>
                                                </Grid>
                                                <Grid item xs={4}></Grid>
                                                <Grid item xs={4}></Grid>
                                            </Grid>
                                        </form>

                                    </CardContent>
                                </Card>
                            </Grid >
                            <Grid item xs={6}></Grid>
                        </Grid >
                    </div >
                } />
            < Footer />
        </div >
    )
}

export default EditTicket;