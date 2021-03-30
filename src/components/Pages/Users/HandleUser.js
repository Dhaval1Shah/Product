import React, { Component } from 'react';
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
import AddForm from '../../Layouts/Forms/UserForms/AddForm';


class HandleUser extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         users: {
    //             firstName: null,
    //             lastName: null,
    //             email: null,
    //             gender: null,
    //             dob: null,
    //             photo: null,
    //             qualification: null,
    //             last_organization: null,
    //             password: null,
    //             roleName: null,
    //         },
    //         role: false,
    //     }
    // //     this.handleSubmit = this.handleSubmit.bind(this);
    // //     this.updateChange = this.updateChange.bind(this);
    // //     this.imgUpload = this.imgUpload.bind(this);
    // //     this.removeImg = this.removeImg.bind(this);
    // //     this.createUser = this.createUser.bind(this);
    // //    this.roleData_class = this.roleData_class.bind(this);
    // //     this.addRole = this.addRole.bind(this);
    // //    this.roleData_class();
    // }

    componentWillMount() {
        if (this.props && this.props.authToken === false) {
          this.props.history.push('/login');
        }
       
      }
    
      componentWillReceiveProps(props) {
        if (props && props.authToken === false) {
          props.history.push('/login');
        }
      }


    // async handleSubmit(e) {
    //     await this.createUser();

    // }

    // addRole(e) {
    //     let roleName = [];
    //     roleName.push(e.target.value)
    //     this.setState({
    //         users: { ...this.state.users, roleName: e.target.value }
    //     })
    // }

    // updateChange(e) {
    //     this.setState({
    //         users: { ...this.state.users, [e.target.name]: e.target.value }
    //     })

    // }


    // roleData_class = async () => {
    //     let role = await AuthApi.getRole();
    //     this.setState({
    //         role: role.data
    //     })
    //     console.log(this.state.role)
    // }

    // async imgUpload(e) {
    //     const postData = new FormData();
    //     postData.append('file', e.target.files[0]);
    //     let updateImg = await AuthApi.updateImg(postData);
    //     if (updateImg && updateImg.status === true) {
    //         this.setState({
    //             users: { ...this.state.users, photo: updateImg.data.image_url }
    //         })
    //         this.setState({ uploadedImgName: updateImg.data.image_name })
    //     }
    // }

    // async removeImg(e) {
    //     let imageLink = this.state.users.photo;
    //     imageLink = imageLink.substr(imageLink.indexOf('/', 7) + 1)
    //     let remImg = await AuthApi.deleteImg(imageLink);
    //     if (remImg && remImg.status === true) {
    //         this.setState({
    //             users: { ...this.state.users, photo: null }
    //         })
    //         this.setState({ uploadedImgName: null })
    //     } else {

    //     }

    // }

    // async createUser() {
    //     let create = await Authapi.createUser(this.state.users)
    //     if (create && create.status === true) {
    //         this.props.history.push('/users');
    //     } else {
    //         swal({
    //             title: "OOPS!",
    //             icon: "fail",
    //             message: "Something went wrong, Please try later!"
    //         })
    //     }
    // }

    render() {
        const classes = this.props;
        // let roleOptions = [];
        // if (Object.keys(this.state.role).length > 0) {
        //     Object.keys(this.state.role).forEach((key) => {
        //         roleOptions.push(<MenuItem value={this.state.role[key].name}>{this.state.role[key].name}</MenuItem>)
        //     })
        // }
        // else {
        //     roleOptions.push(<MenuItem value=""><em>Select Role</em></MenuItem>);
        // }
        return (
            <div>
                <Header
                    {...this.props}
                    authUser={this.props.authUser}
                    component={
                        <div>
                            <Card className={classes.root} style={{ marginBottom: '3%' }}>
                                <CardContent>
                                    <Breadcrumb
                                        {...this.props}
                                        primaryPageName="Users"
                                        primaryPageLink="/users"
                                        isSecondaryPage={true}
                                        secondaryPageName="Add" />
                                </CardContent>
                            </Card>
                            <Grid container className={classes.root} spacing={2}>
                                <Grid item xs={12}>
                                    <Card className={classes.root}>
                                        <CardContent>
                                            <Typography variant="h2">Add User</Typography>
                                            <AddForm  {...this.props} />
                                            {/* <form className={classes.root} noValidate autoComplete="off">
                                                <Grid container className={classes.root} spacing={5}>
                                                    <Grid item xs={4}><TextField fullWidth id="outlined-basic" name="firstName" label="First name" variant="outlined" onChange={(e) => { this.updateChange(e) }} /></Grid>
                                                    <Grid item xs={4}><TextField fullWidth id="outlined-basic" name="lastName" label="Last name" variant="outlined" onChange={(e) => { this.updateChange(e) }} /></Grid>
                                                    <Grid item xs={4}><TextField fullWidth id="outlined-basic" name="email" label="Email-address" variant="outlined" onChange={(e) => { this.updateChange(e) }} /></Grid>
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
                                                            <RadioGroup aria-label="gender" name="gender" onChange={(e) => { this.updateChange(e) }} fullWidth>
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
                                                            label="Birthday"
                                                            name="dob"
                                                            type="date"
                                                            onChange={(e) => { this.updateChange(e) }}
                                                            defaultValue="2017-05-24"
                                                            className={classes.textField}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={4} style={{ display: 'flex' }}>
                                                        {
                                                            (this.state.users.photo === null) ?
                                                                <div>
                                                                    <input
                                                                        accept="image/*"
                                                                        className={classes.input}
                                                                        id="contained-button-file"
                                                                        type="file"
                                                                        onChange={(e) => this.imgUpload(e)}
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
                                                                                    <img src={this.state.users.photo} alt="User profile image" width="35" height="35" />
                                                                                </Grid>
                                                                                <Grid item xs={4}>
                                                                                    <Typography variant="subtitle1" gutterBottom>
                                                                                        {this.state.uploadedImgName}
                                                                                    </Typography>
                                                                                </Grid>
                                                                                <Grid item xs={4}>
                                                                                    <Button onClick={(e) => { this.removeImg(e) }}>
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
                                                    <Grid item xs={4}><TextField fullWidth id="outlined-basic" name="qualification" label="Qualification" variant="outlined" onChange={(e) => { this.updateChange(e) }} /></Grid>
                                                    <Grid item xs={4}><TextField fullWidth id="outlined-basic" name="last_organization" label="Last Organization" variant="outlined" onChange={(e) => { this.updateChange(e) }} /></Grid>
                                                    <Grid item xs={4}><TextField fullWidth id="outlined-basic" name="password" type="password" label="Password" variant="outlined" onChange={(e) => { this.updateChange(e) }} /></Grid>
                                                </Grid>
                                                <Grid container className={classes.root} spacing={5}>
                                                    <Grid item xs={4}>
                                                        <FormControl variant="outlined" style={{ width: '100%' }}>
                                                            <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-outlined-label"
                                                                id="demo-simple-select-outlined"
                                                                label="Role"
                                                                onChange={(e) => { this.addRole(e) }}
                                                            >{roleOptions}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={4} true></Grid>
                                                    <Grid item xs={4} true></Grid>
                                                </Grid>
                                                <Grid container className={classes.root} spacing={3}>
                                                    <Grid item xs={4} style={{ display: 'flex' }}>
                                                        <LoadderButton btnType="button" btnText="Save User" onClickFn={this.handleSubmit} />
                                                        <Button type="button" onClick={(e) => { e.preventDefault(); this.props.history.push('/users') }}>Cancel</Button>
                                                    </Grid>
                                                    <Grid item xs={4}></Grid>
                                                    <Grid item xs={4}></Grid>
                                                </Grid>
                                            </form> */}
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}></Grid>
                            </Grid>
                        </div>
                    } />
                <Footer />
            </div>
        );
    }
}

export default HandleUser;

