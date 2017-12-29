import axios from 'axios';

import {
    SHOW_NOTIFICATION,
    EQUIPMENT_RECEIVED,
    EQUIPMENTS_RECEIVED,
    SHOW_MODAL
} from './types';
import { web3 } from '../utils/connector.js';

let ROOT_URL = "http://localhost:3000";

if(process.env.NODE_ENV == "production"){
    ROOT_URL = "http://testcoandcoapi.azurewebsites.net";
}


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
       // debugger;
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

export function notifyClient(messagePayload){
    return (dispatch) => {
        axios.post(NOTIFY_URL, messagePayload)
        .then(response => {
            console.log("finished");
         })
         .catch((error) => {
             //TODO: error handling, testing deployment
         });
    }
}

export function createProgram(values, redirect) {
    return (dispatch) => {
        axios.post(PROGRAM_URL, values)
        .then(response => {
           //debugger;
           let ipfsHash = response.data;
           //dispatch(createProgramOnChain(ipfsHash));
           //SEND to Ethereum
           dispatch(notifyClient({ alert: "message"}));
           //CALL API Notify, pass programid? //o solo el hash? si paso solo el hash, el mobile debe de obtener el hash con el program id y llamar a la API con ese valor, maybe just pass the hash for testing
           //show notification message
           //notifyClient("message payload");//todo
           //var x = response.data;
           //dispatch(displayNotification("Program created")); 
        //    setTimeout(() => {                
        //         redirect();
        //    }, 3000);
        })
        .catch((error) => {
            //TODO: error handling, testing deployment
        });
    }
}

const createProgramOnChain = (ipfsHash) => {
    //send to Ethereum
}

const waitForMined = (txHash, response, pendingCB, successCB) => {
    if (response.blockNumber) {
        successCB()
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
