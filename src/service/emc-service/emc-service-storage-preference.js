import EmcService from "@/service/emc-service/index";

export default class EmcStoragePreference {

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

    async createSSHStoragePreference({storagePreferenceId, userName, credentialToken, storageId, hostName, port}) {
        await this.emcService.axiosInstanceWithTokenAuthorization.post(
            EmcService.ENDPOINTS.STORAGE_PREFERENCE,
            {
                "storagePreference": {
                    "sshStoragePreference": {
                        "storagePreferenceId": storagePreferenceId,
                        "authType": "ssh",
                        "userName": userName,
                        "credentialToken": credentialToken,
                        "storage": {
                            "storageId": storageId,
                            "hostName": hostName,
                            "port": port
                        }
                    }
                }
            }
        );
    }

    async createSdaStoragePreference({storagePreferenceId, sdaPath, userName, credentialToken, storageId, hostName, port}) {
        await this.emcService.axiosInstanceWithTokenAuthorization.post(
            EmcService.ENDPOINTS.STORAGE_PREFERENCE,
            {
                "storagePreference": {
                    "sdaStoragePreference": {
                        "storagePreferenceId": storagePreferenceId,
                        "sdaPath": sdaPath,
                        "proxyUserName": userName,
                        "proxyCredential": credentialToken,
                        "storage": {
                            "storageId": storageId,
                            "hostName": hostName,
                            "port": port
                        }
                    }
                }
            }
        );
    }

    async fetchStoragePreferences() {
        return await this.emcService.axiosInstanceWithTokenAuthorization.post(
            `${EmcService.ENDPOINTS.STORAGE_PREFERENCE}/searchPreference`
        ).then(({data: {storagesPreference}}) => {
            return storagesPreference.map((
                {
                    sshStoragePreference: {
                        storagePreferenceId, authType, userName, credentialToken, storage: {storageId, hostName, port}
                    }
                }
            ) => {
                return {storagePreferenceId, authType, userName, credentialToken, storageId, hostName, port};
            });
        });
    }

    async deleteStoragePreference({storagePreferenceId}) {
        console.log("service: "+ storagePreferenceId);
        return await this.emcService.axiosInstanceWithTokenAuthorization.delete(
            EmcService.ENDPOINTS.STORAGE_PREFERENCE,
            { 
                data: { 
                    "storagePreferenceId": storagePreferenceId 
                }
            }
        );
    }

}
