import React, { Component } from 'react';
import Header from '../../Layouts/Header'
import Footer from '../../Layouts/Footer';
import AuthApi from '../../Services/Authapi';
import TableComponent from '../../Layouts/TableComponent';
import Breadcrumb from '../../Layouts/Breadcrumb';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import swal from 'sweetalert';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      count: 0,
      pageStatus: false,
      tableTh: [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name', sortable: true },
        { id: 'email', numeric: false, disablePadding: true, label: 'Email', sortable: true },
        { id: 'created_at', numeric: false, disablePadding: true, label: 'Created On', sortable: true },
        { id: 'actions', numeric: false, disablePadding: true, label: 'Actions', sortable: false }
      ]
    }
    this.userData = this.userData.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }

  componentWillMount() {
    if (this.props && this.props.authToken === false) {
      this.props.history.push('/login');
    }
    this.userData();
  }

  componentWillReceiveProps(props) {
    if (props && props.authToken === false) {
      props.history.push('/login');
    }
  }

  userData = async (e) => {
    let users = await AuthApi.getData();
    if (users && users.status === true) {
      this.setState({
        users: users.data,
        count: users.data.length
      })
    }
  }

  async removeUser(id) {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: ["Cancel", "Yes"]
    }).then(async (confirm) => {
      if (confirm) {
        let currentUser = await AuthApi.userDelete(id);
        if (currentUser && currentUser.status === true) {
          this.setState({
            pageStatus: true
          })
          this.userData();
          setTimeout(
            () => this.setState({ pageStatus: false }),
            500
          );
        } else {
        }
      }
    });
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
                    primaryPageName="Users"
                    primaryPageLink="/users"
                    isSecondaryPage={false}
                    secondaryPageName="" />
                </CardContent>
              </Card>
              <TableComponent
                {...this.props}
                tableTh={this.state.tableTh}
                tableData={this.state.users}
                tableCount={this.state.count}
                tablePagestatus={this.state.pageStatus}
                colNameToShow={['name', 'email', 'created_at']}
                openPopUp={false}
                removeRow={this.removeUser}
                actionBtns={['update', 'delete']}
                modelName={'User'}
                addRoute={'/users/add'}
                updateRoute={'/users/edit'}
                openPopUpUpdate={false}
              /></div>
          } />
        <Footer {...this.props} />
      </div>
    )
  }
}
export default User;