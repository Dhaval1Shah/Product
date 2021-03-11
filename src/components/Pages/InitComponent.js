import React, { Component } from 'react';
import PageLoader from '../Layouts/PageLoader';
import AuthApi from '../Services/Authapi';

class InitComponent extends Component {
    constructor(props) {
        super(props);
        this.getAuth();
    }

    async getAuth() {
        let checkLogin = await AuthApi.checkAuth();
        if (checkLogin && checkLogin.status !== false) {
            this.props.setAutUser({ authUser: checkLogin.user });
        } else {
            this.props.setAutUser({ authUser: false, authToken: false });
        }
    }

    componentWillMount() {
        let _this = this;
        if (_this.props && _this.props.authToken === false) {
            _this.props.history.push('/login');
        } else {
            _this.props.history.push('/dashboard');
        }
    }
    render() { return <PageLoader /> };
}
export default InitComponent;