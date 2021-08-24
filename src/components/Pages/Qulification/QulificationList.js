import { Component } from 'react';
import Header from '../../Layouts/Header'
import Footer from '../../Layouts/Footer';
import Breadcrumb from '../../Layouts/Breadcrumb';
import AuthApi from '../../Services/Authapi';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TableComponent from '../../Layouts/TableComponent';
import swal from 'sweetalert';

class QulificationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qulification: [],
            count: 0,
            pageStatus: false,
            tableTh: [
                { id: 'qualification', numeric: false, disablePadding: true, label: 'Qulification', sortable: true },
                { id: 'created_at', numeric: false, disablePadding: true, label: 'Created On', sortable: true },
                { id: 'actions', numeric: false, disablePadding: true, label: 'Actions', sortable: false }
            ]
        }
        this.qulificationData = this.qulificationData.bind(this);
        this.removeQulification = this.removeQulification.bind(this);
    }

    componentWillMount() {
        if (this.props && this.props.authToken === false) {
            this.props.history.push('/login');
        }
        this.qulificationData();
    }

    componentWillReceiveProps(props) {
        if (props && props.authToken === false) {
            props.history.push('/login');
        }
    }

    qulificationData = async (e) => {
        let qulif = await AuthApi.getQulification();


        // if (jobs && jobs.status === true) {
        this.setState({
            qulification: qulif.data,
            count: qulif.data.length
        })

        // }
    }


    async removeQulification(id) {
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: ["Cancel", "Yes"]
        }).then(async (confirm) => {
            if (confirm) {
                let currentEvent = await AuthApi.deleteQulification(id);
                if (currentEvent && currentEvent.status === true) {
                    this.setState({
                        pageStatus: true
                    })
                    this.qulificationData();
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
                                        primaryPageName="Qulification"
                                        primaryPageLink="/qulification"
                                        isSecondaryPage={false}
                                        secondaryPageName="" />
                                </CardContent>
                            </Card>
                            <TableComponent
                                {...this.props}
                                tableTh={this.state.tableTh}
                                tableData={this.state.qulification}
                                tableCount={this.state.count}
                                tablePagestatus={this.state.pageStatus}
                                colNameToShow={['qualification', 'companyProfile', 'created_at']}
                                openPopUp={false}
                                removeRow={this.removeQulification}
                                actionBtns={['update', 'delete']}
                                modelName={'Qulification'}
                                addRoute={'/qulification/add'}
                                updateRoute={'/qulification/edit'}
                                openPopUpUpdate={false}
                            />
                        </div>
                    } />
                <Footer {...this.props} />


            </div >
        )
    }
}

export default QulificationList;
