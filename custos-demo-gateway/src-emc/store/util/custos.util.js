import axios from "axios";

export const identityMgtEndpoint = "/identity-management/v1.0.0";
export const userMgtEndpoint = "user-management/v1.0.0";

export const custosApiAxios = axios.create({
    baseURL: 'https://custos.scigap.org/apiserver/',
    withCredentials: false,
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
    }
});

export function getCustosApiAuthorizationHeader({clientId, clientSecret}) {
    return {
        'Authorization': `Bearer ${btoa(`${clientId}:${clientSecret}`)}`
    };
}
