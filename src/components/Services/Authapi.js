import config from "../../Config";
import axios from "axios";
import ls from "local-storage";
import moment from 'moment';

export default new (class AuthApi {
    setHeaders(type) {
        let authToken = (ls.get("authToken") && ls.get("authToken") !== null && ls.get("authToken") !== false) ? ls.get("authToken") : "";
        axios.defaults.headers[type]['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers[type]['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers[type]['Authorization'] = `Bearer ${authToken}`;

    }

    async inTime() {
        try {
            const url = config.apiurl + config.apis.userInTime;
            let postData = { inTime: moment().format("HH:mm:ss") }
            this.setHeaders('post');
            let data = await axios
                .post(url, postData)
                .then((res) => {
                    return res.data.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    async outTime() {
        try {
            const url = config.apiurl + config.apis.userOutTime;
            let postData = { outTime: moment().format("HH:mm:ss") }
            this.setHeaders('post');
            let data = await axios
                .post(url, postData)
                .then((res) => {
                    return res.data.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    async login(userData) {
        try {
            const url = config.apiurl + config.authApis.login;
            let data = await axios
                .post(url, userData)
                .then((res) => {
                    return res.data.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }
    async getData() {
        try {
            const url = config.apiurl + config.apis.userList;
            this.setHeaders('get');
            let data = await axios
                .get(url)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }

    async logout() {
        try {
            const url = config.apiurl + config.authApis.logout;
            this.setHeaders('post');
            let data = await axios
                .post(url)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }


    async checkAuth() {
        try {

            const url = config.apiurl + config.apis.authUser;
            this.setHeaders('get');
            let data = await axios
                .get(url)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }

    async getPermission() {
        try {
            const url = config.apiurl + config.apis.getPermission;
            this.setHeaders('get');
            let data = await axios
                .get(url)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }

    async createPermission(createPermission) {
        try {
            const url = config.apiurl + config.apis.createPermission;
            let postData = {
                'permissionName': createPermission
            }
            this.setHeaders('post');
            let data = await axios
                .post(url, postData)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }

    async updatePermission(createPermission, id) {
        try {
            const url = config.apiurl + config.apis.updatePermission + id;
            this.setHeaders('put');
            let postData = {
                'permissionName': createPermission
            }
            let data = await axios
                .put(url, postData)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }
    async deletePermission(id) {
        try {
            const url = config.apiurl + config.apis.deletePermission + id;
            this.setHeaders('delete');
            let data = await axios
                .delete(url)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }

    async getRole() {
        try {
            const url = config.apiurl + config.apis.getRole;
            this.setHeaders('get');
            let data = await axios
                .get(url)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }


    async createRole(createRole, permissions) {
        try {
            const url = config.apiurl + config.apis.createRole;
            let postData = {
                'roleName': createRole,
                'permissionName': permissions
            }
            this.setHeaders('post');
            let data = await axios
                .post(url, postData)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }

    async deleteRole(id) {
        try {
            const url = config.apiurl + config.apis.deleteRole + id;
            this.setHeaders('delete');
            let data = await axios
                .delete(url)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }

    async userDelete(id) {
        try {
            const url = config.apiurl + config.apis.deleteUser + id;
            this.setHeaders('delete');
            let data = await axios
                .delete(url)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }

    async updateRole(createRole, Checkbox, id) {
        try {
            const url = config.apiurl + config.apis.updateRole + id;
            this.setHeaders('put');
            let postData = {
                'roleName': createRole,
                'permissionName': Checkbox,
            }
            let data = await axios
                .put(url, postData)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }

    async updateImg(postData) {
        try {
            const url = config.apiurl + config.apis.updateImg;
            this.setHeaders('post', true);
            let data = await axios
                .post(url, postData)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }

    async deleteImg(image) {
        try {
            const url = config.apiurl + config.apis.deleteImg;
            this.setHeaders('post');
            let postData = {
                'file': image
            }
            let data = await axios
                .post(url, postData)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }

    async createUser(postData) {
        try {
            const url = config.apiurl + config.apis.createUser;
            this.setHeaders('post');
            let data = await axios
                .post(url, postData)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }

    async updateUser(user, id) {
        try {
            const url = config.apiurl + config.apis.editUser + id;
            this.setHeaders('put');
            let postData = {
                'firstName': user.firstName,
                'lastName': user.lastName,
                'email': user.email,
                'photo': user.photo,
                'gender': user.gender,
                'dob': user.dob,
                'qualification': user.qualification,
                'last_organization': user.last_organization,
                'roleName': user.roleName
            }
            let data = await axios
                .put(url, postData)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }


    async singleUser(id) {
        try {
            const url = config.apiurl + config.apis.singleUser + id;
            this.setHeaders('get');
            let data = await axios
                .get(url)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }

    async durTime() {
        try {

            const url = config.apiurl + config.apis.dureTime;
            this.setHeaders('get');
            let data = await axios
                .get(url)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }


    async createHoliday(postDatas) {
        try {
            const url = config.apiurl + config.apis.holidayLeave;
            let postData = {
                'leaveName': postDatas.leaveName,
                'dateRange': postDatas.dateRange,
                'noOfDays': postDatas.noOfDays,
            }
            this.setHeaders('post');
            let data = await axios
                .post(url, postData)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }

    async getLeaves() {
        try {
            const url = config.apiurl + config.apis.holidayLeave;
            this.setHeaders('get');
            let data = await axios
                .get(url)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }


    async leaveDelete(id) {
        try {
            const url = config.apiurl + config.apis.removeLeave + id;
            this.setHeaders('delete');
            let data = await axios
                .delete(url)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }


    async updateLeave(leave, id) {
        try {
            const url = config.apiurl + config.apis.eidtLeave + id;
            this.setHeaders('put');
            let postData = {
                'name': leave.leaveName,
                'dateRange': leave.dateRange,
                'noOfDays': leave.noOfDays,

            }
            let data = await axios
                .put(url, postData)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }




    async singleLeave(id) {
        try {
            const url = config.apiurl + config.apis.singleLeave + id;
            this.setHeaders('get');
            let data = await axios
                .get(url)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }


    async createTicket(postDatas) {
        try {
            const url = config.apiurl + config.apis.createTicket;
            let postData = {
                'leaveType': postDatas.leaveType,
                'ticketMesasge': postDatas.ticketMesasge,
                'dateRange': postDatas.dateRange,
                'noOfDays': postDatas.noOfDays,
            }
            this.setHeaders('post');
            let data = await axios
                .post(url, postData)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }


    async getTickets() {
        try {
            const url = config.apiurl + config.apis.createTicket;
            this.setHeaders('get');
            let data = await axios
                .get(url)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }


    async updateTicket(ticket, id) {
        try {
            const url = config.apiurl + config.apis.EditTicket + id;
            this.setHeaders('put');
            let postData = {
                'leaveStatus': ticket.leaveStatus,


            }
            let data = await axios
                .put(url, postData)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }


    async singleTicket(id) {
        try {
            const url = config.apiurl + config.apis.singleTicket + id;
            this.setHeaders('get');
            let data = await axios
                .get(url)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return false;
                });
            return data;
        } catch (error) {
            return false;
        }
    }


})();
