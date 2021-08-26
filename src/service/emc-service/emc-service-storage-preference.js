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

    async createSSHStoragePreference({storagePreferenceId, username, credentialToken, storageId, hostName, port}) {
        await this.emcService.axiosInstanceWithTokenAuthorization.post(
            EmcService.ENDPOINTS.STORAGE_PREFERENCE,
            {
                "storagePreference": {
                    "sshStoragePreference": {
                        "storagePreferenceId": storagePreferenceId,
                        "authType": "ssh",
                        "username": username,
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

    async createSdaStoragePreference({storagePreferenceId, sdaPath, username, credentialToken, storageId, hostName, port}) {
        await this.emcService.axiosInstanceWithTokenAuthorization.post(
            EmcService.ENDPOINTS.STORAGE_PREFERENCE,
            {
                "storagePreference": {
                    "sdaStoragePreference": {
                        "storagePreferenceId": storagePreferenceId,
                        "sdaPath": sdaPath,
                        "proxyUserName": username,
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
                        storagePreferenceId, authType, username, credentialToken, storage: {storageId, hostName, port}
                    }
                }
            ) => {
                return {storagePreferenceId, authType, username, credentialToken, storageId, hostName, port};
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
