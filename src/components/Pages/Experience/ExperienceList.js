import { Component } from 'react';
import Header from '../../Layouts/Header'
import Footer from '../../Layouts/Footer';
import Breadcrumb from '../../Layouts/Breadcrumb';
import AuthApi from '../../Services/Authapi';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TableComponent from '../../Layouts/TableComponent';
import swal from 'sweetalert';

class ExperienceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            experience: [],
            count: 0,
            pageStatus: false,
            tableTh: [
                { id: 'minExpYear', numeric: false, disablePadding: true, label: 'Minimum Expyear', sortable: true },
                { id: 'maxExpYear', numeric: false, disablePadding: true, label: 'Max Expyear', sortable: true },
                { id: 'created_at', numeric: false, disablePadding: true, label: 'Created On', sortable: true },
                { id: 'actions', numeric: false, disablePadding: true, label: 'Actions', sortable: false }
            ]
        }
        this.EexpData = this.EexpData.bind(this);
        this.removeExp = this.removeExp.bind(this);
    }

    componentWillMount() {
        if (this.props && this.props.authToken === false) {
            this.props.history.push('/login');
        }
        this.EexpData();
    }

    componentWillReceiveProps(props) {
        if (props && props.authToken === false) {
            props.history.push('/login');
        }
    }

    EexpData = async (e) => {
        let exp = await AuthApi.getExperience();



        if (exp && exp.status === true) {
            this.setState({
                experience: exp.data,
                count: exp.data.length
            })

        }
    }


    async removeExp(id) {
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: ["Cancel", "Yes"]
        }).then(async (confirm) => {
            if (confirm) {
                let currentExperience = await AuthApi.deleteExperience(id);
                if (currentExperience && currentExperience.status === true) {
                    this.setState({
                        pageStatus: true
                    })
                    this.EexpData();
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
                                        primaryPageName="Experience"
                                        primaryPageLink="/experience"
                                        isSecondaryPage={false}
                                        secondaryPageName="" />
                                </CardContent>
                            </Card>
                            <TableComponent
                                {...this.props}
                                tableTh={this.state.tableTh}
                                tableData={this.state.experience}
                                tableCount={this.state.count}
                                tablePagestatus={this.state.pageStatus}
                                colNameToShow={['minExpYear', 'maxExpYear', 'created_at']}
                                openPopUp={false}
                                removeRow={this.removeExp}
                                actionBtns={['update', 'delete']}
                                modelName={'Experience'}
                                addRoute={'/experience/add'}
                                updateRoute={'/experience/edit'}
                                openPopUpUpdate={false}
                            />
                        </div>
                    } />
                <Footer {...this.props} />


            </div >
        )
    }
}

export default ExperienceList;
