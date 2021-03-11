import React, { Component } from 'react';
import Header from '../Layouts/Header'
import Footer from '../Layouts/Footer';
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
import Breadcrumb from '../Layouts/Breadcrumb';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class Permission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: [],
      setopen: false,
      permissionName: false,
      isPopup: false,
      tableTh: [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name', sortable: true },
        { id: 'created_at', numeric: false, disablePadding: true, label: 'Created On', sortable: true },
        { id: 'actions', numeric: false, disablePadding: true, label: 'Actions', sortable: false }
      ]
    }
    this.permissionData = this.permissionData.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updatChange = this.updatChange.bind(this);
    this.saveData = this.saveData.bind(this);
    this.removePermission = this.removePermission.bind(this);
    this.updatePermission = this.updatePermission.bind(this);
    this.handleClickOpenUpdate = this.handleClickOpenUpdate.bind(this);
  }

  componentWillMount() {
    if (this.props && this.props.authToken === false) {
      this.props.history.push('/login');
    }
    this.permissionData();
  }

  componentWillReceiveProps(props) {
    if (props && props.authToken === false) {
      props.history.push('/login');
    }
  }


  permissionData = async (e) => {
    let permission = await AuthApi.getPermission();
    if (permission && permission.status === true) {
      this.setState({
        permission: permission.data
      })
    }
  }

  updatePermission = async (id) => {
    let stat = await AuthApi.updatePermission(this.state.permissionName, id);
    if (stat && stat.status === true) {
      this.setState({ setopen: false }, function () {
        this.permissionData();
      });
    }
  }

  handleClickOpen(row = false) {
    this.setState({
      setopen: true,
      isPopup: true,
      permissionName: row.name,

    })
  };

  handleClickOpenUpdate(row = false) {
    this.setState({
      setopen: true,
      isPopup: false,
      permissionName: row.name,
      permissionId: row.id,
    })
  };

  handleClose() {
    this.setState({
      setopen: false
    })
  };

  async saveData() {
    if (this.state.isPopup) {
      let currentPermission = await AuthApi.createPermission(this.state.permissionName);
      if (currentPermission && currentPermission.status === true) {
        this.setState({ setopen: false }, function () {
          this.permissionData();
        });
      } else {
        // axios popup result  
      }
    } else {
      this.updatePermission(this.state.permissionId)
    }
  }

  async removePermission(id) {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: ["Cancel", "Yes"]
    }).then(async (confirm) => {
      if (confirm) {
        let currentPermission = await AuthApi.deletePermission(id);
        if (currentPermission && currentPermission.status === true) {
          this.permissionData();
        } else {
        }
      }
    });
  }

  updatChange(e) {
    this.setState({ permissionName: e.target.value })
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
                    primaryPageName="Permissions"
                    primaryPageLink="/permission"
                    isSecondaryPage={false}
                    secondaryPageName="" />
                </CardContent>
              </Card>
              <TableComponent
                {...this.props}
                tableTh={this.state.tableTh}
                tableData={this.state.permission}
                colNameToShow={['name', 'created_at']}
                openPopUp={this.handleClickOpen}
                openPopUpUpdate={this.handleClickOpenUpdate}
                removeRow={this.removePermission}
                actionBtns={['update', 'delete']}
                modelName={'Permission'}
              /></div>
          } />
        <Footer />
        <PopUp
          isPopup={this.state.isPopup}
          {...this.props}
          handleClose={this.handleClose}
          setopen={this.state.setopen} permissionName={this.state.permissionName} saveData={this.saveData} updatChange={this.updatChange} updatePermission={this.updatePermission} />
      </div>
    )
  }
}
export default Permission;

class PopUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Dialog open={this.props.setopen}>
          <DialogTitle>{(this.props.isPopup) ? "Add Permission" : " Update Permission"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <TextField autoFocus name="name" label="Name" type="text" value={(this.props.permissionName && this.props.permissionName !== false) ? this.props.permissionName : null} onChange={(e) => { this.props.updatChange(e) }} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={(e) => { this.props.saveData() }} > Save </Button>
            <Button onClick={(e) => { this.props.handleClose() }} color="primary"> Close </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}