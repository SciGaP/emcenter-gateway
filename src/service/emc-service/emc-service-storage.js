import EmcService from "@/service/emc-service/index";

export default class EmcStorage {

    /**
     * @type {EmcService}
     */
    _emcService = null;

    constructor(emcService) {
        this._emcService = emcService;
    }

    get emcService() {
        return this._emcService;
    }

    async createSSHStorage({storageId, hostName, port}) {
        await this.emcService.axiosInstanceWithTokenAuthorization.post(
            EmcService.ENDPOINTS.RESOURCE,
            {
                "storage": {
                    "sshStorage": {
                        "storageId": storageId,
                        "hostName":  hostName,
                        "port": port
                    }
                }
            }
        );
    }

}
