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
      tickets: [],
      count:0,
      tableTh: [
        { id: 'user_name', numeric: false, disablePadding: true, label: 'Name', sortable: true },
        { id: 'leaveType', numeric: false, disablePadding: true, label: 'LeaveType', sortable: true },
        { id: 'date_range', numeric: false, disablePadding: true, label: 'Date Range', sortable: true },
        { id: 'created_at', numeric: false, disablePadding: true, label: 'Created On', sortable: true },
        { id: 'actions', numeric: false, disablePadding: true, label: 'Actions', sortable: false }
      ]
    }
      this.ticketsData = this.ticketsData.bind(this);
    //  this.removeLeaves = this.removeLeaves.bind(this);
  }

  componentWillMount() {
    if (this.props && this.props.authToken === false) {
      this.props.history.push('/login');
    }
    this.ticketsData();
  }

  componentWillReceiveProps(props) {
    if (props && props.authToken === false) {
      props.history.push('/login');
    }
  }

 

    ticketsData = async (e) => {
      let tickets = await AuthApi.getTickets();
      // console.log(tickets.data);
    


      if(tickets && tickets.status === true) {
        const newarr = []
        const ticketsData = tickets.data
        ticketsData.forEach((element,key) => {
          const tempData = {
            'id': element.id,
            'name':element.has_user.name,
            'leaveType':element.leaveType, 
            'date_range':element.date_range, 
            'created_at': element.created_at
          }
          // console.log(key)
          //  console.log(tempName)
          //  tickets.data[key] = tempName; 
          // Array.prototype.push.apply(ticketsData[key], tempName)
          
          newarr.push(tempData)
        });
        

        this.setState({
          tickets : newarr,
          count: tickets.data.length,
        })
      }
     
    }


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
                tableData={this.state.tickets}
                tableCount={this.state.count}
                colNameToShow={[ 'name', 'leaveType', 'date_range', 'created_at']}
                openPopUp={false}
                removeRow={this.removeLeaves}
                actionBtns={['update']}
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