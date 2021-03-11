import React, { Component } from 'react';
import Header from '../../Layouts/Header'
import Footer from '../../Layouts/Footer';
import AuthApi from '../../Services/Authapi';
import TableComponent from '../../Layouts/TableComponent';
import Breadcrumb from '../../Layouts/Breadcrumb';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import swal from 'sweetalert';

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaves: [],
      tableTh: [
        { id: 'name', numeric: false, disablePadding: true, label: 'Leave-Name', sortable: true },
        { id: 'no', numeric: false, disablePadding: true, label: 'No_of_days', sortable: true },
        { id: 'created_at', numeric: false, disablePadding: true, label: 'Created On', sortable: true },
        { id: 'actions', numeric: false, disablePadding: true, label: 'Actions', sortable: false }
      ]
    }
    //  this.leaveData = this.leaveData.bind(this);
    //  this.removeLeaves = this.removeLeaves.bind(this);
  }

  componentWillMount() {
    if (this.props && this.props.authToken === false) {
      this.props.history.push('/login');
    }
    //  this.leaveData();
  }

  componentWillReceiveProps(props) {
    if (props && props.authToken === false) {
      props.history.push('/login');
    }
  }

 

    // leaveData = async (e) => {
    //   let leaves = await AuthApi.getLeaves();
    //   // console.log(leaves);
    //   if(leaves && leaves.status === true) {
    //     this.setState({
    //       leaves : leaves.data
    //     })
    //   }
     
    // }


    // async removeLeaves(id){
    //   swal({
    //         title: "Are you sure?",
    //         icon: "warning",
    //         buttons: ["Cancel", "Yes"]
    //       }).then(async (confirm) => {
    //         if (confirm) {
    //           let currentLeave = await AuthApi.leaveDelete(id);
    //           if (currentLeave && currentLeave.status === true) {
    //             this.leaveData();
    //           } else {
    //           }
    //         }
    //       });
    // }



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
                    primaryPageName="LeavesTicket"
                    primaryPageLink="/tickets"
                    isSecondaryPage={false}
                    secondaryPageName="" />
                </CardContent>
              </Card>
              <TableComponent
                {...this.props}
                tableTh={this.state.tableTh}
                tableData={this.state.leaves}
                colNameToShow={['name', 'no_of_days', 'created_at']}
                openPopUp={false}
                removeRow={this.removeLeaves}
                actionBtns={['update', 'delete']}
                modelName={'LeavesTickets'}
                addRoute={'/tickets/add'}
                updateRoute={'/tickets/edit'}
                openPopUpUpdate={false}
              /></div>
          } />
        <Footer {...this.props} />
      </div>
    )
  }
}
export default Ticket;