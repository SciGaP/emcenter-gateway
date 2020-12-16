import CustosService from "../service";
import config from "../../config";

export const custosService = new CustosService({
    clientId: config.value('clientId'),
    clientSecret: config.value('clientSec'),
    redirectURI: config.value('redirectURI'),
    baseURL: "https://custos.scigap.org/apiserver/"
});
