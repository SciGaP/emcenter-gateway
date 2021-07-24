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
            EmcService.ENDPOINTS.STORAGE,
            {
                "storage": {
                    "ssh_storage": {
                        "storageId": storageId,
                        "host_name":  hostName,
                        "port": port
                    }
                }
            }
        );
    }

    async fetchStorages() {
        return await this.emcService.axiosInstanceWithTokenAuthorization.post(
            `${EmcService.ENDPOINTS.STORAGE}/search`
        ).then(({data: {storages}}) => {
            return storages.map((
                {
                    sshStorage: {
                        storageId, hostName, port
                    }
                }
            ) => {
                return {storageId, hostName, port};
            });
        });
    }

}
