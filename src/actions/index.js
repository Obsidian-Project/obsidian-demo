import axios from 'axios';

import {
    SHOW_NOTIFICATION,
    EQUIPMENT_RECEIVED,
    EQUIPMENTS_RECEIVED,
    SHOW_MODAL,
    SHOW_LOADER
} from './types';
import { web3 } from '../utils/connector.js';
import { CreateObsidianContractObj } from '../utils/smartcontract.js';

let ROOT_URL = "http://obsidian-api.azurewebsites.net";//"http://localhost:3000";

if (process.env.NODE_ENV == "production") {
    ROOT_URL = "http://obsidian-api.azurewebsites.net";
}

const ObsidianContract = CreateObsidianContractObj(web3);
const TRACTORS_URL = `${ROOT_URL}/equipments/tractors`;
const PROGRAM_URL = `${ROOT_URL}/program`;
const NOTIFY_URL = `${ROOT_URL}/notify`;

export function displayNotification(message) {
    return (dispatch) => {
        dispatch({
            type: SHOW_NOTIFICATION,
            data: message
        });
        if (message !== "") {
            setTimeout(() => dispatch(displayNotification("")), 3000);
        }
    }
}

export function getEquipment(id) {
    return (dispatch) => {
        axios.get(`${TRACTORS_URL}/${id}`)
            .then(response => {
                //return 404 in case is not found please ! 
                let item = response.data[0];
                let title = `${item.category} ${item.model}`;
                let imageUrl = item.images[2] || "http://via.placeholder.com/350x150";
                dispatch({
                    type: EQUIPMENT_RECEIVED,
                    data: { ...item, ...{ title }, ...{ imageUrl } }
                });
            })
            .catch((error) => {
                //TODO: Error handling
            })
    }
}

export function getEquipments() {
    return (dispatch) => {
        axios.get(`${TRACTORS_URL}`)
            .then(response => {
                dispatch({
                    type: EQUIPMENTS_RECEIVED,
                    data: response.data
                });
            })
            .catch((error) => {
                //TODO: Error handling
            })
    }
}

export function equipmentSelected(id) {
    return (dispatch) => {
        dispatch(getEquipment(id));
        dispatch(closeModal());
    }
}

export function openModal() {
    return (dispatch) => {
        dispatch({
            type: SHOW_MODAL,
            data: true
        })
    }
}

export function closeModal() {
    return (dispatch) => {
        dispatch({
            type: SHOW_MODAL,
            data: false
        })
    }
}

export function createProgram(values, uportAddress, redirect) {
    return (dispatch) => {      
        dispatch({
            type: SHOW_LOADER,
            data: true
        });
        let fromAddress = uportAddress || "0xd47ce1fc88c92633ca8801f6ae8d77afa8136a79";
        axios.post(PROGRAM_URL, values)
            .then(response => {
                let ipfsHash = response.data;
                createProgramOnChain(ipfsHash, fromAddress)
                    .then((response) => {
                        //show notification message   
                        //dispatch(displayNotification("Program created")); 
                        dispatch({
                            type: SHOW_LOADER,
                            data: false
                        });
                        setTimeout(() => {                
                            redirect();
                        }, 3000);                              
                    }).catch((error) => {

                    });
            })
            .catch((error) => {
                //TODO: error handling, testing deployment
            });
    }
}

const createProgramOnChain = (ipfsHash, fromAddress) => {
    return new Promise((resolve, reject) => {
        ObsidianContract.addProgram(ipfsHash, {
            gas: 2000000,
            from: fromAddress
        }, (error, txHash) => {
            if (error) { throw error }
            waitForMined(txHash, { blockNumber: null },
                function pendingCB() {
                    // Signal to the user you're still waiting
                    // for a block confirmation
                },
                function successCB(data) {
                    resolve();//don't need to pass nothing
                }
            )
        })
    })
}

const waitForMined = (txHash, response, pendingCB, successCB) => {
    if (response.blockNumber) {
        successCB();
    } else {
        pendingCB()
        pollingLoop(txHash, response, pendingCB, successCB)
    }
}

const pollingLoop = (txHash, response, pendingCB, successCB) => {
    setTimeout(function () {
        web3.eth.getTransaction(txHash, (error, response) => {
            if (error) { throw error }
            if (response === null) {
                response = { blockNumber: null }
            }
            waitForMined(txHash, response, pendingCB, successCB)
        })
    }, 1000);
}
