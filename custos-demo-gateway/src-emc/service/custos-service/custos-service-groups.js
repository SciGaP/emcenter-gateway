import CustosService from "./index";

export default class CustosGroups {
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

    /**
     * Create Groups
     * @param {string} name
     * @param {string} description
     * @param {number} ownerId
     * @param {string[]} realm_roles
     * @param {string[]} client_roles
     * @param {string[]} attributes
     * @param {string[]} sub_groups
     * @return {Promise<AxiosResponse<any>>}
     */
    createGroup({name, description, ownerId, realm_roles, client_roles, attributes, sub_groups}) {
        return this.custosService.axiosInstanceWithClientAuthorization.post(
            `${CustosService.ENDPOINTS.GROUPS}/group`,
            {group: {name, description, ownerId, realm_roles, client_roles, attributes, sub_groups}}
        ).then(({data}) => data);
    }

    /**
     * Update Group
     * @param {number} groupId
     * @param {string} name
     * @param {string} description
     * @param {number} ownerId
     * @param {string[]} realm_roles
     * @param {string[]} client_roles
     * @param {string[]} attributes
     * @param {string[]} sub_groups
     * @return {Promise<AxiosResponse<any>>}
     */
    updateGroup({groupId, name, description, ownerId, realm_roles, client_roles, attributes, sub_groups}) {
        return this.custosService.axiosInstanceWithClientAuthorization.put(
            `${CustosService.ENDPOINTS.GROUPS}/group/${groupId}`,
            {groupId, name, description, ownerId, realm_roles, client_roles, attributes, sub_groups}
        );
    }

    /**
     * Delete Group
     * @param {number} groupId
     * @return {Promise<AxiosResponse<any>>}
     */
    deleteGroup({groupId}) {
        return this.custosService.axiosInstanceWithClientAuthorization.delete(
            `${CustosService.ENDPOINTS.GROUPS}/group/${groupId}`
        );
    }

    /**
     * Find Group
     * @param {number} groupId
     * @return {Promise<AxiosResponse<any>>}
     */
    findGroup({groupId}) {
        return this.custosService.axiosInstanceWithClientAuthorization.get(
            `${CustosService.ENDPOINTS.GROUPS}/group`,
            {
                params: {
                    "group.id": groupId
                }
            }
        ).then(({data}) => data);
    }

    /**
     * GET All Groups
     * @return {Promise<AxiosResponse<any>>}
     */
    getAllGroups() {
        return this.custosService.axiosInstanceWithClientAuthorization.get(
            `${CustosService.ENDPOINTS.GROUPS}/groups`
        );
    }

    /**
     * Add User to Group
     * @param {number} groupId
     * @param {string} username
     * @param {string} membershipType
     * @return {Promise<AxiosResponse<any>>}
     */
    addUserToGroup({groupId, username, membershipType}) {
        return this.custosService.axiosInstanceWithClientAuthorization.post(
            `${CustosService.ENDPOINTS.GROUPS}/user/group/membership`,
            {
                group_id: groupId,
                username: username,
                membership_type: membershipType
            }
        );
    }

    /**
     * Remove User From Group
     * @param {number} groupId
     * @param {string} username
     * @return {Promise<AxiosResponse<any>>}
     */
    removeUserFromGroup({groupId, username}) {
        return this.custosService.axiosInstanceWithClientAuthorization.delete(
            `${CustosService.ENDPOINTS.GROUPS}/user/group/membership`,
            {
                data: {
                    group_id: groupId,
                    username: username
                }
            }
        );
    }

    /**
     * Change Group Membership
     * @param {number} groupId
     * @param {string} username
     * @param {string} membershipType
     * @return {Promise<AxiosResponse<any>>}
     */
    changeGroupMembership({groupId, username, membershipType}) {
        return this.custosService.axiosInstanceWithClientAuthorization.put(
            `${CustosService.ENDPOINTS.GROUPS}/user/group/membership`,
            {
                group_id: groupId,
                username: username,
                type: membershipType
            }
        );
    }

    /**
     * Add Child Group
     * @param {number} childGroupId
     * @param {number} parentGroupId
     * @return {Promise<AxiosResponse<any>>}
     */
    addChildGroup(childGroupId, parentGroupId) {
        return this.custosService.axiosInstanceWithClientAuthorization.post(
            `${CustosService.ENDPOINTS.GROUPS}/group/membership`,
            {
                child_id: childGroupId,
                parent_id: parentGroupId
            }
        );
    }

    /**
     * Remove Child Group
     * @param {number} childGroupId
     * @param {number} parentGroupId
     * @return {Promise<AxiosResponse<any>>}
     */
    removeChildGroup({childGroupId, parentGroupId}) {
        return this.custosService.axiosInstanceWithClientAuthorization.delete(
            `${CustosService.ENDPOINTS.GROUPS}/group/membership`,
            {
                data: {
                    child_id: childGroupId,
                    parent_id: parentGroupId
                }
            }
        );
    }

    /**
     * Get All Child Users
     * @param {number} groupId
     * @return {Promise<AxiosResponse<any>>}
     */
    getAllChildUsers({groupId}) {
        return this.custosService.axiosInstanceWithClientAuthorization.get(
            `${CustosService.ENDPOINTS.GROUPS}/user/group/memberships/child`,
            {
                params: {"group.id": groupId}
            }
        );
    }

    /**
     * Get All Child Groups
     * @param {number} groupId
     * @return {Promise<AxiosResponse<any>>}
     */
    getAllChildGroups({groupId}) {
        return this.custosService.axiosInstanceWithClientAuthorization.get(
            `${CustosService.ENDPOINTS.GROUPS}/groups/memberships/child`,
            {
                params: {"group.id": groupId}
            }
        );
    }

    /**
     * Get All Groups of User
     * @param {string} username
     * @return {Promise<AxiosResponse<any>>}
     */
    getAllGroupsOfUser({username}) {
        return this.custosService.axiosInstanceWithClientAuthorization.get(
            `${CustosService.ENDPOINTS.GROUPS}/user/group/memberships`,
            {
                params: {"profile.username": username}
            }
        );
    }

    /**
     * Get All Parent Groups of Group
     * @param {number} groupId
     * @return {Promise<AxiosResponse<any>>}
     */
    getAllParentGroupsOfGroup({groupId}) {
        return this.custosService.axiosInstanceWithClientAuthorization.get(
            `${CustosService.ENDPOINTS.GROUPS}/groups/memberships`,
            {
                params: {"group.id": groupId}
            }
        );
    }

    /**
     * Has Access
     * @param {number} groupId
     * @param {string} username
     * @param {string} membershipType
     * @return {Promise<AxiosResponse<any>>}
     */
    hasAccess({groupId, username, membershipType}) {
        return this.custosService.axiosInstanceWithClientAuthorization.get(
            `${CustosService.ENDPOINTS.GROUPS}/user/group/access`,
            {
                params: {
                    "group.id": groupId,
                    "username": username,
                    "type": membershipType
                }
            }
        );
    }
}
