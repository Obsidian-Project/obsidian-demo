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
    COMPANIES_DASHBOARD_INFORMATION_RECEIVED,
    EQUIPMENT_DETAILS_RECEVIED,
    MEMBER_INFO_RECEIVED,
    SET_NOTIFICATION_NUMBER
} from './types';

import {
    TRACTORS_URL, PROGRAM_URL,
    GET_PROGRAMS_URL,
    DASHBOARD_INFORMATION_URL
} from '../constants';

import axios from 'axios';

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
    return (dispatch, getState, { Obsidian }) => {
        dispatch({
            type: SHOW_LOADER,
            data: true
        });
        axios.post(PROGRAM_URL, values)
            .then(response => {
                let ipfsHash = response.data;
                let costPerUnit = values.selectedEquipment.price;
                let { subsidyAmount, units } = values;
                //ipfsHash, costPerUnit, subsidyAmount, units
                debugger;
                Obsidian.createProgramOnChain(ipfsHash, costPerUnit, subsidyAmount, units)
                    .then((response) => {
                        debugger;
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
                        //TODO: handle error
                    });
            })
            .catch((error) => {
                //TODO: error handling, testing deployment
            });
    }
}


export function getInformationForCompaniesDashboard() {
    return (dispatch) => {
    

        //Para sacar el total earnings, get all programs
        //iterate and filter all the ones that are delivered    
        let result = {};
        axios.get(GET_PROGRAMS_URL)
            .then(response => {
                let programs = response.data;
                let numberOfPrograms = programs.length;
                let unitsTransferred = programs.filter((item) => {
                    return item.delivered == true;
                });

                let balance = 0;
                for (let i = 0; i < unitsTransferred.length; i++) {
                    balance += Number(unitsTransferred[i].costPerUnit);
                }
                result.totalEarnings = balance > 0 ? balance.format() : balance;
                result.unitsTransferred = unitsTransferred.length;
                result.numberOfPrograms = numberOfPrograms;

                result.customers = numberOfPrograms * 2;//for couples now for demo        
                let transfers = unitsTransferred.map((item) => {
                    return {
                        model: item.selectedEquipment.model,
                        type: "Tractor",
                        costPerUnit: item.costPerUnit
                    }
                });
                result.transfers = transfers;
                dispatch({
                    type: COMPANIES_DASHBOARD_INFORMATION_RECEIVED,
                    data: result
                });                
            }).catch((error) => {
                //TODO
                console.log(error);
            });
    }
}
export function getInformationForGovernmentDashboard() {
    return (dispatch, getState, { Obsidian }) => {      
        let result;
        debugger;
        axios.get(DASHBOARD_INFORMATION_URL)
            .then(response => {
                result = response.data;
                Obsidian.getBalance().then((balance) => {
                    result.balance = balance;
                    dispatch({
                        type: DASHBOARD_INFORMATION_RECEIVED,
                        data: result
                    });
                    dispatch(getProgramInformation());                   
                });
            }).catch((error) => {
                //TODO
                debugger;
            });

    }
}

export function getProgram(programId) {
    return (dispatch) => {
        axios.get(`${GET_PROGRAMS_URL}`)
            .then(response => {
                let result;
                let program = response.data.filter((item) => {
                    return item.programId == Number(programId);
                });
                if (program.length > 0) {
                    result = program[0].selectedEquipment;
                    result.programId = programId;
                }
                dispatch({
                    type: EQUIPMENT_DETAILS_RECEVIED,
                    data: result
                })

            }).catch((error) => {

            })
    }
}

export function setupEventListeners() {
    return (dispatch) => {
        dispatch(addListenerForNewRequests());
        dispatch(addListenerForNewTransfers());
    }
}

export function resetSelectedEquipment(){
    return (dispatch) => {
        dispatch({
            type: SELECTED_EQUIPMENT,
            data: undefined       
        })
    }
    
}

export function resetNotificationsNumber(){
    return (dispatch) => {
        dispatch({
            type: SET_NOTIFICATION_NUMBER,
            data: 0        
        })
    }
    
}
export function addListenerForNewRequests() {
    return (dispatch, getState, { ObsidianSmartContract }) => {
        debugger;
        let myEvent = ObsidianSmartContract.newEquipmentRequested('latest');
        myEvent.watch((error, event) => {
            debugger;
            if (!error) {
                console.log("new equipment requested");
                if (localStorage.getItem('newEquipmentRequested')) {
                    dispatch({
                        type: SET_NOTIFICATION_NUMBER,
                        data: 1
                    })
                    dispatch({
                        type: NEW_EQUIPMENT_REQUESTED,
                        data: event.args.programId.toNumber()
                    })
                }
                localStorage.setItem('newEquipmentRequested', 'on');
            }
        });
    }
}


export function addListenerForNewTransfers() {
    return (dispatch, getState, { ObsidianSmartContract }) => {
        let myEvent = ObsidianSmartContract.newEquipmentTransferred('latest');
        myEvent.watch((error, event) => {
            debugger;
            if (!error) {
                console.log("new equipment transferred");
                if (localStorage.getItem('newEquipmentTransferred')) {
                    dispatch({
                        type: NEW_EQUIPMENT_TRANSFERRED
                    });
                }
                localStorage.setItem('newEquipmentTransferred', 'on');
            }
            dispatch({
                type: NEW_EQUIPMENT_TRANSFERRED
            });
        });
    }
}

export function makeTransfer(programId, redirect) {
    return (dispatch, getState, { Obsidian }) => {
        dispatch({
            type: SHOW_LOADER,
            data: true
        });
        debugger;
        Obsidian.makeTransferOnChain(programId).then((result) => {
            dispatch({
                type: SHOW_LOADER,
                data: false
            });
            dispatch(getInformationForCompaniesDashboard());
            dispatch(getInformationForGovernmentDashboard());
            redirect();
        }).catch((error) => {
            //TODO: catch error
        })
    }
}

export function getMemberInformation(address, callback) {
    return (dispatch, getState, ObsidianSmartContract) => {
        ObsidianSmartContract.memberExist(address)
            .then(() => {
                ObsidianSmartContract.getMemberInfoBy(address)
                    .then((memberInfo) => {
                        dispatch({
                            type: MEMBER_INFO_RECEIVED,
                            data: memberInfo
                        })
                    })
            })
    }
}

const getProgramInformation = () => {
    return (dispatch) => {
        axios.get(GET_PROGRAMS_URL)
            .then((response) => {
                dispatch({
                    type: PROGRAMS_RECEIVED,
                    data: response.data
                });
            }).catch((error) => {
                //TODO: catch error
            })
    }
}

Number.prototype.format = function (n, x) {
    if (this == 0) {
        return;
    }
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};
