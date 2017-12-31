import axios from 'axios';

import {
    SHOW_NOTIFICATION,
    EQUIPMENT_RECEIVED,
    EQUIPMENTS_RECEIVED,
    SHOW_MODAL,
    SHOW_LOADER,
    SELECTED_EQUIPMENT,
    NEW_EQUIPMENT_REQUESTED,
    NEW_EQUIPMENT_TRANSFERRED,
    DASHBOARD_INFORMATION_RECEIVED,
    PROGRAMS_RECEIVED,
    COMPANIES_DASHBOARD_INFORMATION_RECEIVED
} from './types';

import Web3 from 'web3';
import { CreateObsidianContractObj } from '../utils/smartcontract.js';

const ETHEREUM_PROVIDER = "http://52.178.92.72:8545";

const DEMO_ADDRESS = "0x6884ff0de92e3328173ab12b722c0f2d727b1677";

const web3Instance = new Web3(new Web3.providers.HttpProvider(ETHEREUM_PROVIDER));

let ROOT_URL = "http://obsidian-api.azurewebsites.net";

if (process.env.NODE_ENV == "production") {
    ROOT_URL = "http://obsidian-api.azurewebsites.net";
}

const ObsidianContract = CreateObsidianContractObj(web3Instance);
const TRACTORS_URL = `${ROOT_URL}/equipments/tractors`;
const PROGRAM_URL = `${ROOT_URL}/program`;
const GET_PROGRAMS_URL = `${ROOT_URL}/programs`;
const DASHBOARD_INFORMATION_URL = `${ROOT_URL}/programInfo`;

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
                dispatch({
                    type: SELECTED_EQUIPMENT,
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

export function createProgram(values, redirect) {
    return (dispatch) => {
        dispatch({
            type: SHOW_LOADER,
            data: true
        });
        let fromAddress = DEMO_ADDRESS;
        axios.post(PROGRAM_URL, values)
            .then(response => {
                let ipfsHash = response.data;
                debugger;
                let costPerUnit = values.selectedEquipment.price;
                let { subsidyAmount, units } = values;
                //ipfsHash, costPerUnit, subsidyAmount, units
                createProgramOnChain(ipfsHash, costPerUnit, subsidyAmount, units, fromAddress)
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

export function addListenerForNewRequests() {
    return (dispatch) => {
        let myEvent = ObsidianContract.newEquipmentRequested({}, 'latest');
        myEvent.watch(function (error, event) {
            if (!error) {
                dispatch({
                    type: NEW_EQUIPMENT_REQUESTED
                })
            }
        });
    }
}

export function getInformationForCompaniesDashboard() {   
    return (dispatch) => {
        dispatch({
            type: SHOW_LOADER,
            data: true
        });
       
        //Para sacar el total earnings, get all programs
        //iterate and filter all the ones that are delivered    
        let result = {};
        axios.get(GET_PROGRAMS_URL)
            .then(response => {                
                debugger;
              
                let programs = response.data;
                let numberOfPrograms = programs.length;
                let unitsTransferred = programs.filter((item) => {
                    return item.delivered == true;
                });

                let balance = 0;
                for(let i = 0; i < unitsTransferred.length; i++){
                    balance += unitsTransferred[i].costPerUnit;
                }             
                result.totalEarnings = balance;
                result.unitsTransferred = unitsTransferred.length;
                result.numberOfPrograms = numberOfPrograms;
                
                result.customers = numberOfPrograms * 2;//for couples now for demo        
                let transfers = unitsTransferred.map((item) => {
                    return {
                        model: item.selectedEquipment.model,
                        type: "Tractor",
                        costPerUnit: item.costPerUnit
                    }
                })
                result.transfers = transfers;
                dispatch({
                    type: COMPANIES_DASHBOARD_INFORMATION_RECEIVED,
                    data: result
                });      
                dispatch({
                    type: SHOW_LOADER,
                    data: false
                });
            }).catch((error) => {
                //TODO
            });
    }
}
export function getInformationForGovernmentDashboard() {   
    return (dispatch) => {
        dispatch({
            type: SHOW_LOADER,
            data: true
        });
        let result;
        axios.get(DASHBOARD_INFORMATION_URL)
            .then(response => {
                result = response.data;
                getMyBalance().then((balance) => {
                    result.balance = balance;
                    dispatch({
                        type: DASHBOARD_INFORMATION_RECEIVED,
                        data: result
                    });
                    dispatch(getProgramInformation());
                    dispatch({
                        type: SHOW_LOADER,
                        data: false
                    });
                });
            }).catch((error) => {
                //TODO
            });
      
    }
}

export function addListenerForNewTransfers() {//for governments
    return (dispatch) => {
        let myEvent = ObsidianContract.newEquipmentTransferred({}, 'latest');
        myEvent.watch(function (error, event) {
            if (!error) {
                dispatch({
                    type: NEW_EQUIPMENT_TRANSFERRED//tengo que reaccionar, obtener data, entonces
                    //dispatcho otra action
                })
            }
        });
    }
}

const getMyBalance = () => {
    return new Promise((resolve, reject) => {       
        let address = DEMO_ADDRESS;
        ObsidianContract.balances(address, (error, result) => {
            resolve(result.toNumber());
        })
    });

}
const getProgramInformation = () => {
    debugger;
    return (dispatch) => {
        axios.get(GET_PROGRAMS_URL)
            .then((response) => {
                debugger;
               dispatch({
                   type:PROGRAMS_RECEIVED,
                   data: response.data
               });
            }).catch((error) => {
                //TODO: catch error
            })
    }   
}

const createProgramOnChain = (ipfsHash, costPerUnit, subsidyAmount, units, fromAddress) => {
    return new Promise((resolve, reject) => {
        ObsidianContract.addProgram(ipfsHash, costPerUnit, subsidyAmount, units, {
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
        web3Instance.eth.getTransaction(txHash, (error, response) => {
            if (error) { throw error }
            if (response === null) {
                response = { blockNumber: null }
            }
            waitForMined(txHash, response, pendingCB, successCB)
        })
    }, 1000);
}
