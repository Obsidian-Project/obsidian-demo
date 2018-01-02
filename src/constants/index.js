
let ROOT_URL = "http://obsidian-api.azurewebsites.net";

if (process.env.NODE_ENV == "production") {
    ROOT_URL = "http://obsidian-api.azurewebsites.net";
}

export const TRACTORS_URL = `${ROOT_URL}/equipments/tractors`;
export const PROGRAM_URL = `${ROOT_URL}/program`;
export const GET_PROGRAMS_URL = `${ROOT_URL}/programs`;
export const DASHBOARD_INFORMATION_URL = `${ROOT_URL}/programInfo`;
export const SMART_CONTRACT_INFO_URL = `${ROOT_URL}/smartcontract`;
export const ACCOUNT_INFO_URL = `${ROOT_URL}/accountInfo?isweb=true`;