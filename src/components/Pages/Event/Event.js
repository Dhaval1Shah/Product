import React, { Component } from 'react';
import Header from '../../Layouts/Header'
import Footer from '../../Layouts/Footer';
import AuthApi from '../../Services/Authapi';
import TableComponent from '../../Layouts/TableComponent';
import Breadcrumb from '../../Layouts/Breadcrumb';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert';
import ls from "local-storage";
import IconButton from '@material-ui/core/IconButton';
import FontAwesomeIconComponent from '../../Layouts/FontAwesomeIconComponent';

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: [],
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

    // componentWillReceiveProps(props) {
    //     if (props && props.authToken === false) {
    //         props.history.push('/login');
    //     }
    // }

    eventData = async (e) => {
        let get = new Date();
        let Select = get.getMonth() + 1;
        let year = get.getFullYear();
        let event = await AuthApi.getEvent(Select, year);


        if (event && event.status === true) {
            this.setState({
                event: event.data,
                count: event.data.length
            })
        }
    }

    handleMonthChange = async (e) => {
        let select = e.target.value;
        let get = new Date(select);
        let month = get.getMonth() + 1;
        let year = get.getFullYear();
        let event = await AuthApi.getEvent(month, year);


        if (event && event.status === true) {
            this.setState({
                event: event.data,
                count: event.data.length
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
                let currentEvent = await AuthApi.eventDelete(id);
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


    // ds() {
    //     return <div style={{ display: 'none' }}> </div>
    // }

    render() {
        const classes = this.props;
        var month = new Array();
        month[0] = "01";
        month[1] = "02";
        month[2] = "03";
        month[3] = "04";
        month[4] = "05";
        month[5] = "06";
        month[6] = "07";
        month[7] = "08";
        month[8] = "09";
        month[9] = "10";
        month[10] = "11";
        month[11] = "12";

        var d = new Date();
        var dateString = d.getFullYear() + '-' + (month[d.getMonth()])

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
                                        primaryPageName="Event"
                                        primaryPageLink="/event"
                                        isSecondaryPage={false}
                                        secondaryPageName="" />
                                </CardContent>
                            </Card>
                            <Grid container style={{ top: '20px', paddingBottom: '10px', float: 'left' }}>
                                <TextField
                                    id="datetime-local"
                                    label="Select Month/Year"
                                    views={["year", "month"]}
                                    variant="outlined"
                                    // format="yyyy/mm"                          
                                    defaultValue={dateString}
                                    type="Month"
                                    // openTo="month"
                                    // value={this.state.selectedDate}
                                    onChange={this.handleMonthChange}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{ min: "2020-01", max: dateString }}
                                />
                            </Grid>

                            <TableComponent
                                {...this.props}
                                tableTh={this.state.tableTh}
                                tableData={this.state.event}
                                tableCount={this.state.count}
                                tablePagestatus={this.state.pageStatus}
                                colNameToShow={['name', 'date', 'created_at']}
                                openPopUp={false}
                                removeRow={this.removeEvent}
                                actionBtns={ls('roles') === 'Super Admin' ? ['update', 'delete'] : ['show']}
                                modelName={'Event'}
                                addRoute={'/event/add'}
                                updateRoute={'/event/edit'}
                                openPopUpUpdate={false}
                            /></div>
                    } />
                <Footer {...this.props} />
            </div>
        )
    }
}
export default Event;