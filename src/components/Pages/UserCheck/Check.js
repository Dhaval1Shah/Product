import React, { Component } from 'react';
import Header from '../../Layouts/Header'
import Footer from '../../Layouts/Footer';
import AuthApi from '../../Services/Authapi';
import TableComponent from '../../Layouts/TableComponent';
import Breadcrumb from '../../Layouts/Breadcrumb';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import swal from 'sweetalert';

class Check extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getData: [],
            count: 0,
            pageStatus: false,
            isApproved: 0,
            tableTh: [
                { id: 'date', numeric: false, disablePadding: true, label: 'Date', sortable: true },
                { id: 'intime', numeric: false, disablePadding: true, label: 'In Time', sortable: true },
                { id: 'outtime', numeric: false, disablePadding: true, label: 'Out Time', sortable: true },
                { id: 'duration', numeric: false, disablePadding: true, label: 'Durations', sortable: true },
                { id: 'actions', numeric: false, disablePadding: true, label: 'Actions', sortable: false }
            ]
        }
        this.getUserData = this.getUserData.bind(this);
        // this.removeUser = this.removeUser.bind(this);
    }

    componentWillMount() {
        if (this.props && this.props.authToken === false) {
            this.props.history.push('/login');
        }
        this.getUserData();
    }

    componentWillReceiveProps(props) {
        if (props && props.authToken === false) {
            props.history.push('/login');
        }
    }







    getUserData = async (e) => {
        let userData = await AuthApi.chekUserData();
        if (userData && userData.status === true) {
            this.setState({
                getData: userData.data,
                count: userData.data.length
            })
        }
    }

    accept = async (id) => {
        await AuthApi.approveTime("1", id);

    }

    async decline(id) {
        await AuthApi.approveTime("2", id);

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
                                        primaryPageName="Check User"
                                        primaryPageLink="/check"
                                        isSecondaryPage={false}
                                        secondaryPageName="" />
                                </CardContent>
                            </Card>
                            <TableComponent
                                {...this.props}
                                tableTh={this.state.tableTh}
                                tableData={this.state.getData}
                                tableCount={this.state.count}
                                tablePagestatus={this.state.pageStatus}
                                colNameToShow={['date', 'in_time', 'out_time', 'duration']}
                                openPopUp={false}
                                acceptRow={this.accept}
                                rejectRow={this.decline}
                                actionBtns={['approve', 'reject']}
                                modelName={'Check'}
                                // updateRoute={'/users/edit'}
                                openPopUpUpdate={false}
                            /></div>
                    } />
                <Footer {...this.props} />
            </div>
        )
    }
}
export default Check;