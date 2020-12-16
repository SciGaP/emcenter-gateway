import CustosService from "./index";

export default class CustosUsers {
    /**
     * @type {CustosService}
     */
    _custosService = null;

    constructor(custosService) {
        this._custosService = custosService;
    }

    get custosService() {
        return this._custosService;
    }

    registerUser({username, firstName, lastName, password, email}) {
        return this.custosService.axiosInstanceWithClientAuthorization.post(
            `${CustosService.ENDPOINTS.USERS}/user`,
            {
                'client_id': this.custosService.clientId,
                'username': username,
                'first_name': firstName,
                'last_name': lastName,
                'password': password,
                'temporary_password': false,
                'email': email
            }
        );
    }

    enableUser({username}) {
        return this.custosService.axiosInstanceWithClientAuthorization.post(
            `${CustosService.ENDPOINTS.USERS}/user/activation`,
            {
                'username': username
            }
        );
    }

    disableUser({username}) {
        return this.custosService.axiosInstanceWithClientAuthorization.post(
            `${CustosService.ENDPOINTS.USERS}/user/deactivation`,
            {
                'username': username
            }
        );
    }

    checkUsernameValidity({username}) {
        return this.custosService.axiosInstanceWithClientAuthorization.get(
            `${CustosService.ENDPOINTS.USERS}/user/availability`,
            {
                params: {'username': username}
            }
        );
    }

    findUsers({offset, limit, username}) {
        return this.custosService.axiosInstanceWithClientAuthorization.get(
            `${CustosService.ENDPOINTS.USERS}/users`,
            {
                params: {offset: offset, limit: limit, client_id: this.custosService.clientId, 'user.id': username}
            }
        );
    }

    /**
     * @typedef {Object} UserAttribute
     * @param {string} key
     * @param {string[]} values
     */

    /**
     * Add User Attributes
     * @param {UserAttribute[]} attributes
     * @param {string[]} usernames
     * @return {Promise<AxiosResponse<any>>}
     */
    addUserAttribute({attributes, usernames}) {
        return this.custosService.axiosInstanceWithTokenAuthorization.post(
            `${CustosService.ENDPOINTS.USERS}/attributes`,
            {
                attributes: attributes,
                users: usernames
            }
        );
    }

    /**
     * Delete User Attributes
     * @param {UserAttribute[]} attributes
     * @param {string[]} usernames
     * @return {Promise<AxiosResponse<any>>}
     */
    deleteUserAttributes({attributes, usernames}) {
        return this.custosService.axiosInstanceWithTokenAuthorization.delete(
            `${CustosService.ENDPOINTS.USERS}/attributes`,
            {
                data: {
                    attributes: attributes,
                    users: usernames
                }
            }
        );
    }


    /**
     * Add Roles to User
     * @param {string[]} roles
     * @param {string[]} usernames
     * @param {boolean} isClientLevel
     * @return {Promise<AxiosResponse<any>>}
     */
    addRolesToUser({roles, usernames, isClientLevel}) {
        return this.custosService.axiosInstanceWithTokenAuthorization.post(
            `${CustosService.ENDPOINTS.USERS}/users/roles`,
            {
                roles: roles,
                usernames: usernames,
                client_level: isClientLevel
            }
        );
    }

    /**
     * Delete Roles From User
     * @param {string[]} clientRoles
     * @param {string} username
     * @return {Promise<AxiosResponse<any>>}
     */
    deleteRolesFromUser({clientRoles, username}) {
        return this.custosService.axiosInstanceWithTokenAuthorization.delete(
            `${CustosService.ENDPOINTS.USERS}/users/roles`,
            {
                data: {
                    client_roles: clientRoles,
                    username: username
                }
            }
        );
    }

    updateProfile({userName, firstName, lastName, email}) {
        return this.custosService.axiosInstanceWithClientAuthorization.put(
            `${CustosService.ENDPOINTS.USERS}/user/profile`,
            {
                username: userName,
                first_name: firstName,
                last_name: lastName,
                email: email
            }
        );
    }

    getTenantLevelRoles() {
        return this.getRoles({isClientLevel: false});
    }

    getClientLevelRoles() {
        return this.getRoles({isClientLevel: true});
    }

    getRoles({isClientLevel = false}) {
        return this.custosService.axiosInstanceWithClientAuthorization.get(
            `${CustosService.ENDPOINTS.USERS}/roles`,
            {
                params: {client_level: isClientLevel}
            }
        );
    }
}
