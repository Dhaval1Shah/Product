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
import FontAwesomeIconComponent from '../../Layouts/FontAwesomeIconComponent';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import EditForm from '../../Layouts/Forms/UserForms/EditForm';


class HandleUser1 extends Component {
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
    //             roleName: null,
    //         },
    //         uploadedImgName: "",
    //         user: false,
    //         userId: 0,
    //         role: []
    //     }
    //     // this.handleSubmit = this.handleSubmit.bind(this);
    //     // this.roleData = this.roleData.bind(this);
    //     // this.updateChange = this.updateChange.bind(this);
    //     // this.addRole = this.addRole.bind(this);
    //     // this.editUser = this.editUser.bind(this);
    //     // this.roleData();
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


    // componentWillMount() {
    //     let userId = this.props.history.location.pathname.split('/')[this.props.history.location.pathname.split('/').length - 1];
    //     this.setState({ userId: userId }, async function () {
    //         let user = await AuthApi.singleUser(this.state.userId);           
    //         let editUser = this.state.users;
    //         editUser.firstName = (user.status === true && user.data && user.data.firstName && (user.data.firstName !== null || user.data.firstName !== false)) ? user.data.firstName : null;
    //         editUser.lastName = (user.status === true && user.data && user.data.lastName) ? user.data.lastName : null;
    //         editUser.email = (user.status === true && user.data && user.data.email) ? user.data.email : null;
    //         editUser.gender = (user.status === true && user.data && user.data.gender) ? user.data.gender : null;
    //         editUser.dob = (user.status === true && user.data && user.data.dob) ? user.data.dob : null;
    //         editUser.photo = (user.status === true && user.data && user.data.photo) ? user.data.photo : null;
    //         editUser.qualification = (user.status === true && user.data && user.data.qualification) ? user.data.qualification : null;
    //         editUser.last_organization = (user.status === true && user.data && user.data.last_organization) ? user.data.last_organization : null;
    //         let userRole = (user.status === true && user.data && user.data.roles && Object.keys(user.data.roles).length > 0) ? user.data.roles : [];
    //         editUser.roleName = (Object.keys(userRole).length > 0) ? userRole[0].name : null;
    //         let imageName = editUser.photo.substr(editUser.photo.lastIndexOf('/') + 1);
    //         this.setState({ uploadedImgName: imageName })
    //         this.setState({
    //             users: editUser
    //         })
    //     })
    // }

    // async handleSubmit(e) {
    //     await this.editUser(this.state.users, this.state.userId)
    // }

    // async removeImg(e) {
    //     this.setState({
    //         users: { ...this.state.users, photo: null }
    //     })
    //     this.setState({ uploadedImgName: null })
    // }

    // addRole(e) {
    //     let user = this.state.users;
    //     user.roleName = e.target.value;
    //     this.setState({
    //         users: user
    //     })
    // }

    // updateChange(e) {
    //     this.setState({
    //         users: { ...this.state.users, [e.target.name]: e.target.value }
    //     })
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

    // async editUser(id) {
    //     let status = await AuthApi.updateUser(this.state.users, this.state.userId);
    //     console.log(status);
    //     if (status && status.status === true) {
    //         this.props.history.push('/users');
    //     }
    // }

    // async roleData() {
    //     let role = await AuthApi.getRole();
    //     this.setState({
    //         role: role.data
    //     })
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
                                        secondaryPageName="Edit" />
                                </CardContent>
                            </Card>
                            <Grid container className={classes.root} spacing={2}>
                                <Grid item xs={12}>
                                    <Card className={classes.root}>
                                        <CardContent>
                                            <Typography variant="h2">Edit User</Typography>
                                            <EditForm  {...this.props}/>
                                            {/* <form className={classes.root} noValidate autoComplete="off">
                                                <Grid container className={classes.root} spacing={5}>
                                                    <Grid item xs={4}><TextField fullWidth id="outlined-basic" name="firstName" label="First name" value={(this.state.users && this.state.users.firstName !== null) ? this.state.users.firstName : null} variant="outlined" focused={(this.state.users && this.state.users.firstName !== null) ? true : false} onChange={(e) => { this.updateChange(e) }} /></Grid>
                                                    <Grid item xs={4}><TextField fullWidth id="outlined-basic" name="lastName" label="Last name" value={(this.state.users && this.state.users.lastName !== null) ? this.state.users.lastName : null} variant="outlined" focused={(this.state.users && this.state.users.lastName !== null) ? true : false} onChange={(e) => { this.updateChange(e) }} /></Grid>
                                                    <Grid item xs={4}><TextField fullWidth id="outlined-basic" name="email" label="Email-address" value={(this.state.users && this.state.users.email !== null) ? this.state.users.email : null} variant="outlined" focused={(this.state.users && this.state.users.email !== null) ? true : false} onChange={(e) => { this.updateChange(e) }} /></Grid>
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
                                                            <RadioGroup aria-label="gender" name="gender" value={this.state.users.gender} focused={(this.state.users && this.state.users.email !== null) ? true : false} onChange={(e) => { this.updateChange(e) }} fullWidth>
                                                                <Grid container className={classes.root} spacing={2}>
                                                                    <Grid textAlign="left" item xs={6}><FormControlLabel value="Female" control={<Radio />} label="Female" /></Grid>
                                                                    <Grid item xs={6}><FormControlLabel value="Male" control={<Radio />} label="Male" /></Grid>
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
                                                            value={(this.state.users && this.state.users.dob !== null) ? this.state.users.dob : null}
                                                            focused={(this.state.users && this.state.users.dob !== null) ? true : false}
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
                                                    <Grid item xs={4}><TextField fullWidth id="outlined-basic" name="qualification" label="Qualification" variant="outlined" value={(this.state.users && this.state.users.qualification !== null) ? this.state.users.qualification : null}
                                                        focused={(this.state.users && this.state.users.qualification !== null) ? true : false} onChange={(e) => { this.updateChange(e) }} /></Grid>
                                                    <Grid item xs={4}><TextField fullWidth id="outlined-basic" name="last_organization" label="Last Organization" variant="outlined" value={(this.state.users && this.state.users.last_organization !== null) ? this.state.users.last_organization : null}
                                                        focused={(this.state.users && this.state.users.last_organization !== null) ? true : false} onChange={(e) => { this.updateChange(e) }} /></Grid>
                                                    <Grid item xs={4}>
                                                        <FormControl variant="outlined" style={{ width: '100%' }}>
                                                            <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-outlined-label"
                                                                id="demo-simple-select-outlined"
                                                                label="Role"
                                                                onChange={(e) => { this.addRole(e) }}
                                                                value={(this.state.users && this.state.users.roleName && this.state.users.roleName !== null) ? this.state.users.roleName : null}
                                                                focused={(this.state.users && this.state.users.roleName && this.state.users.roleName !== null) ? true : false}
                                                            >{roleOptions}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                                <Grid container className={classes.root} spacing={3}>
                                                    <Grid item xs={4} style={{ display: 'flex' }}>
                                                        <LoadderButton btnType="button" btnText="Edit User" onClickFn={this.handleSubmit} />
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

export default HandleUser1;