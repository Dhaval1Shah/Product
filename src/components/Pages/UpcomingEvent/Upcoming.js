import React, { Component } from 'react';
import Header from '../../Layouts/Header'
import Footer from '../../Layouts/Footer';
import AuthApi from '../../Services/Authapi';
import TableComponent from '../../Layouts/TableComponent';
import Breadcrumb from '../../Layouts/Breadcrumb';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import swal from 'sweetalert';

class Upcoming extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upcoming: [],
            count: 0,
            pageStatus: false,
            tableTh: [
                { id: 'name', numeric: false, disablePadding: true, label: 'Name', sortable: true },
                { id: 'date', numeric: false, disablePadding: true, label: 'Date', sortable: true },
                { id: 'created_at', numeric: false, disablePadding: true, label: 'Created On', sortable: true },
                { id: 'actions', numeric: false, disablePadding: true, label: 'Actions', sortable: false }
            ]
        }
        this.eventData = this.eventData.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
    }

    componentWillMount() {
        if (this.props && this.props.authToken === false) {
            this.props.history.push('/login');
        }
        this.eventData();
    }

    componentWillReceiveProps(props) {
        if (props && props.authToken === false) {
            props.history.push('/login');
        }
    }

    eventData = async (e) => {
        let events = await AuthApi.getAllEvents();
        if (events && events.status === true) {
            this.setState({
                upcoming: events.data,
                count: events.data.length
            })
        }
    }

    async removeEvent(id) {
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: ["Cancel", "Yes"]
        }).then(async (confirm) => {
            if (confirm) {
                let currentEvent = await AuthApi.AlleventDelete(id);
                if (currentEvent && currentEvent.status === true) {
                    this.setState({
                        pageStatus: true
                    })
                    this.eventData();
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
                                        primaryPageName="Upcoming Events"
                                        primaryPageLink="/upcoming"
                                        isSecondaryPage={false}
                                        secondaryPageName="" />
                                </CardContent>
                            </Card>
                            <TableComponent
                                {...this.props}
                                tableTh={this.state.tableTh}
                                tableData={this.state.upcoming}
                                tableCount={this.state.count}
                                tablePagestatus={this.state.pageStatus}
                                colNameToShow={['name', 'date', 'created_at']}
                                openPopUp={false}
                                removeRow={this.removeEvent}
                                actionBtns={['update', 'delete']}
                                modelName={'Upcoming Event'}
                                addRoute={'/upcoming/add'}
                                updateRoute={'/upcoming/edit'}
                                openPopUpUpdate={false}
                            /></div>
                    } />
                <Footer {...this.props} />
            </div>
        )
    }
}
export default Upcoming;
// import React from 'react'

// const Upcoming = () => {
//     return (
//         <div>
//             hy
//         </div>
//     )
// }


// export default Upcoming;
