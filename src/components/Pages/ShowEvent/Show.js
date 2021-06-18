import React, { useState, useEffect } from 'react';
import Header from '../../Layouts/Header';
import Footer from '../../Layouts/Footer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Breadcrumb from '../../Layouts/Breadcrumb';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Input from '@material-ui/core/Input'
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
import ls from "local-storage";
import Divider from '@material-ui/core/Divider';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'left',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    hr: {
        borderTop: "3px solid #1B6E95",
    }

}));

const iniEvent = {
    eventName: "",
    eventdate: "",
    event_Id: 0,
}




const Show = (props) => {
    const classes1 = useStyles();
    const classes = props;
    const [editValues, setEditValues] = useState(iniEvent);
    const [apiImages, setApiImages] = useState({ images: [] })
    // const [stringImages, setStringImages] = useState({ images: [] });



    const getEventData = async () => {
        let eventId = props.history.location.pathname.split('/')[props.history.location.pathname.split('/').length - 1];
        console.log(eventId)
        let event = await AuthApi.singleEvent(eventId);
        console.log(event)
        let event_Id = eventId

        let eventName = (event.status === true && event.data && event.data.name && (event.data.name !== null || event.data.name !== false)) ? event.data.name : null;
        let eventdate = (event.status === true && event.data && event.data.date) ? event.data.date : null;
        let images = (event.status === true && event.data && event.data.images) ? event.data.images : null;
        // console.log(images)
        let ds = JSON.parse(images)
        // console.log(ds);


        setEditValues({
            eventName: eventName,
            eventdate: eventdate,
            event_Id: event_Id,


        });


        setApiImages({
            images: ds
        })


    }
    useEffect(
        () =>
            setTimeout(
                () => getEventData(),
                500), []);


    // const renderApiPhotos = (source) => {
    //     return source.map((photo, index) => {
    //         // stringImages.images.push(selectedImages)
    //         return <div key={Math.random()} style={{ float: "left" }}>
    //             <img src={photo} key={photo} alt="User profile image" style={{ padding: "10px" }} width="150px" height="150px" />

    //         </div>
    //     })


    // }

    const renderApiPhotos = (source) => {
        return <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {source.map((photo, index) => (
                <GridListTile key={photo} cols={index.cols || 1} >
                    <img src={photo} alt="User profile image" width="250px" height="250px" />
                </GridListTile>
            ))}
        </GridList>


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
                                    secondaryPageName="View Event" />
                            </CardContent>
                        </Card>
                        <Grid container className={classes.root} spacing={2} >
                            <Grid item xs={6} >
                                <Card className={classes.root}>
                                    <CardContent>
                                        <Grid container className={classes1.controls} spacing={3}  >
                                            <Grid container item xs={12} spacing={3}>
                                                <Typography style={{ color: "#1B6E95" }} variant="h4"> View Event</Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container className={classes.root} spacing={5}>
                                            <Grid item xs={4}></Grid>
                                            <Grid item xs={4}></Grid>
                                            <Grid item xs={4}></Grid>
                                        </Grid>
                                        <Grid container className={classes1.controls} spacing={3}>
                                            <Grid item xs={4}>

                                                <Typography style={{ float: 'left' }} variant="h6">Event-Name  :</Typography>

                                            </Grid>
                                            <Grid item xs={6}>

                                                <Typography style={{ float: 'left' }} display="block">
                                                    {editValues.eventName}
                                                </Typography>

                                            </Grid>

                                        </Grid>
                                        <Grid container className={classes1.controls} spacing={3}>
                                            <Grid item xs={4}>
                                                <Typography style={{ float: 'left' }} variant="h6">Event-Date  :</Typography>
                                            </Grid>
                                            <Grid item xs={6}>

                                                <Typography style={{ float: 'left' }} display="block">{editValues.eventdate}</Typography>

                                            </Grid>

                                        </Grid>

                                        <Grid container className={classes1.controls} spacing={5} >
                                            <Grid item xs={4}>
                                                <Typography style={{ float: 'left' }} variant="h6">Event Iamges  :</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                {/* <div style={{ float: "left" }}> */}
                                                {/* <Card> */}
                                                {/* <GridList cellHeight={135} className={classes.gridList} cols={3}> */}
                                                {renderApiPhotos(apiImages.images)}
                                                {/* </GridList> */}

                                                {/* </Card> */}
                                                {/* </div> */}
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                    </div>
                } />
            <Footer />
        </div>
    )
}

export default Show;