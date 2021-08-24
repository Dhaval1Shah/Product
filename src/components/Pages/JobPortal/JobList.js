import React, { Component } from 'react';
import Header from '../../Layouts/Header'
import Footer from '../../Layouts/Footer';
import Breadcrumb from '../../Layouts/Breadcrumb';
import AuthApi from '../../Services/Authapi';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TableComponent from '../../Layouts/TableComponent';
import swal from 'sweetalert';

class JobList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: [],
            count: 0,
            pageStatus: false,
            tableTh: [
                { id: 'jobTitle', numeric: false, disablePadding: true, label: 'Jobtitle', sortable: true },
                { id: 'companyProfile', numeric: false, disablePadding: true, label: 'Company Profile', sortable: true },
                { id: 'created_at', numeric: false, disablePadding: true, label: 'Created On', sortable: true },
                { id: 'actions', numeric: false, disablePadding: true, label: 'Actions', sortable: false }
            ]
        }
        this.jobData = this.jobData.bind(this);
        this.removeJob = this.removeJob.bind(this);
    }

    componentWillMount() {
        if (this.props && this.props.authToken === false) {
            this.props.history.push('/login');
        }
        this.jobData();
    }

    componentWillReceiveProps(props) {
        if (props && props.authToken === false) {
            props.history.push('/login');
        }
    }

    jobData = async (e) => {
        let jobs = await AuthApi.getAllJob();

        // if (jobs && jobs.status === true) {
        this.setState({
            job: jobs.data,
            count: jobs.data.length
        })

        // }
    }


    async removeJob(id) {
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: ["Cancel", "Yes"]
        }).then(async (confirm) => {
            if (confirm) {
                let currentEvent = await AuthApi.deletejob(id);
                if (currentEvent && currentEvent.status === true) {
                    this.setState({
                        pageStatus: true
                    })
                    this.jobData();
                    setTimeout(
                        () => this.setState({ pageStatus: false }),
                        500
                    );
                } else {
                }
            }
        });
    }

    // deletejob

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
                                        primaryPageName="Job-Portal"
                                        primaryPageLink="/job"
                                        isSecondaryPage={false}
                                        secondaryPageName="" />
                                </CardContent>
                            </Card>
                            <TableComponent
                                {...this.props}
                                tableTh={this.state.tableTh}
                                tableData={this.state.job}
                                tableCount={this.state.count}
                                tablePagestatus={this.state.pageStatus}
                                colNameToShow={['jobTitle', 'companyProfile', 'created_at']}
                                openPopUp={false}
                                removeRow={this.removeJob}
                                actionBtns={['update', 'delete']}
                                modelName={'Job-Portal'}
                                addRoute={'/job/add'}
                                updateRoute={'/job/edit'}
                                openPopUpUpdate={false}
                            />
                        </div>
                    } />
                <Footer {...this.props} />


            </div >
        )
    }

}


export default JobList;
