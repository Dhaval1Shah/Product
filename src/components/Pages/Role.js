import React, { Component } from 'react';
import Header from '../Layouts/Header'
import Footer from '../Layouts/Footer';
import Container from '@material-ui/core/Container';
import AuthApi from '../Services/Authapi';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';
import TableComponent from '../Layouts/TableComponent';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import Breadcrumb from '../Layouts/Breadcrumb';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DropdownComponent from '../Layouts/DropdownComponent';
import PageLoader from '../Layouts/PageLoader';

class Role extends Component {
  constructor(props) {
    super(props)
    this.state = {
      role: false,
      setopen: false,
      roleName: false,
      permission: false,
      isPopup: false,
      checkbox: [],
      tableTh: [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name', sortable: true },
        { id: 'created_at', numeric: false, disablePadding: true, label: 'Created On', sortable: true },
        { id: 'actions', numeric: false, disablePadding: true, label: 'Actions', sortable: false }
      ]
    }
    this.roleData = this.roleData.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updatChange = this.updatChange.bind(this);
    this.saveData = this.saveData.bind(this);
    this.removeRole = this.removeRole.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);
    this.handleClickOpenUpdateRole = this.handleClickOpenUpdateRole.bind(this);
    this.updateRoleee = this.updateRoleee.bind(this);
  }
  componentWillMount() {
    if (this.props && this.props.authToken === false) {
      this.props.history.push('/login');
    }
    this.roleData();
  }

  componentWillReceiveProps(props) {
    if (props && props.authToken === false) {
      props.history.push('/login');
    }
  }

  roleData = async (e) => {
    let role = await AuthApi.getRole();
    this.setState({
      role: role.data
    })
  }

  async handleClickOpen(row = false) {
    let permission = await AuthApi.getPermission();
    this.setState({
      permission: permission.data,
    })
    this.setState({
      setopen: true,
      isPopup: true,
      roleName: row.name,
    })
  };

  async updateRoleee(id) {
    let upte = await AuthApi.updateRole(this.state.roleName, this.state.checkBox, id);
    if (upte && upte.status === true) {
      this.setState({ setopen: false }, function () {
        this.roleData();
      })
    }
  }

  async handleClickOpenUpdateRole(row = false) {
    let permission = await AuthApi.getPermission();
    this.setState({
      permission: permission.data,
    })
    if (Object.keys(row.permissions).length > 0) {
      let permissions = [];
      Object.keys(row.permissions).forEach((key) => {
        permissions.push(row.permissions[key].name)
      })
      this.setState({ rolePermission: permissions })
    }
    await this.setState({
      setopen: true,
      isPopup: false,
      roleName: row.name,
      roleId: row.id
    })
  }

  handleClose() {
    this.setState({
      setopen: false,
      rolePermission: []
    })
  };

  async saveData() {
    if (this.state.isPopup) {
      let currentRole = await AuthApi.createRole(this.state.roleName, this.state.checkBox);
      if (currentRole && currentRole.status === true) {
        this.setState({ setopen: false }, function () {
          this.roleData();
        });
      } else {
        // axios popup result  
      }
    } else {
      this.updateRoleee(this.state.roleId)
    }
  }

  async removeRole(id) {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: ["Cancel", "Yes"]
    }).then(async (confirm) => {
      if (confirm) {
        let currentRole = await AuthApi.deleteRole(id);
        if (currentRole && currentRole.status === true) {
          this.roleData();
        } else {
        }
      }
    });
  }

  updatChange(e) {
    this.setState({ roleName: e.target.value })
  }

  updateCheckbox(value) {
    this.setState({ checkBox: value })
  }

  render() {
    const classes = this.props;
    return (
      <div>
        <Header
          {...this.props}
          authUser={this.props.authUser}
          setAutUser={this.props.setAutUser}
          component={
            <div>
              <Card className={classes.root} style={{ marginBottom: '3%' }}>
                <CardContent>
                  <Breadcrumb
                    {...this.props}
                    primaryPageName="Roles"
                    primaryPageLink="/role"
                    isSecondaryPage={false}
                    secondaryPageName="" />
                </CardContent>
              </Card>
              <TableComponent
                {...this.props}
                tableTh={this.state.tableTh}
                tableData={this.state.role}
                colNameToShow={['name', 'created_at']}
                openPopUp={this.handleClickOpen}
                openPopUpUpdate={this.handleClickOpenUpdateRole}
                removeRow={this.removeRole}
                actionBtns={['update', 'delete']}
                modelName={'Role'}
              /></div>
          } />
        <Footer />
        <PopUp
          isPopup={this.state.isPopup}
          {...this.props}
          handleClose={this.handleClose}
          setopen={this.state.setopen}
          roleName={this.state.roleName}
          saveData={this.saveData}
          updatChange={this.updatChange}
          permission={this.state.permission}
          inputHandleChange={this.inputHandleChange}
          checkbox={this.state.checkbox}
          updateCheckbox={this.updateCheckbox}
          updateRoleee={this.updateRoleee}
          rolePermission={this.state.rolePermission}
        />
      </div>
    )
  }
}

export default Role;

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: false,
      value: true,
      loading: true
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.props.updateCheckbox(value);
  }

  componentDidReceiveProps() {
    if (typeof this.props.rolePermission !== 'undefined' && Object.keys(this.props.rolePermission).length > 0) {
      this.setState({ loading: false })
    }
  }

  componentWillReceiveProps(props) {
    if (typeof props.rolePermission !== 'undefined' && Object.keys(props.rolePermission).length > 0) {
      this.setState({ loading: false })
    }
  }

  render() {
    return (
      <div>
        <Dialog open={this.props.setopen}>
          <DialogTitle>{(this.props.isPopup) ? "Add Role" : " Update Role"}</DialogTitle>
          {/* {
            this.state.loading === true
              ?
              <PageLoader />
              : */}
              <div><DialogContent>
                <DialogContentText>
                  <TextField autoFocus name="name" label="Name" type="text" value={(this.props.roleName && this.props.roleName !== false) ? this.props.roleName : null} onChange={(e) => { this.props.updatChange(e) }} />
                </DialogContentText>
              </DialogContent>

                <DialogContent>
                  <DropdownComponent inputValue={this.props.rolePermission} inputOptions={this.props.permission} inputName="Permission" inputTypeMultiple={true} handleChange={this.handleChange} />
                </DialogContent></div>
          {/* } */}
          <DialogActions>
            <Button color="primary" onClick={(e) => { this.props.saveData() }} >
              Save
            </Button>
            <Button onClick={(e) => { this.props.handleClose() }} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}