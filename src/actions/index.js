import {
    SHOW_NOTIFICATION,
    EQUIPMENT_RECEIVED,
    EQUIPMENTS_RECEIVED,
    SHOW_MODAL,
    SHOW_LOADER,
    SELECTED_EQUIPMENT,
    NEW_EQUIPMENT_TRANSFER_REQUESTED,
    NEW_SUBSIDY_TRANSFER_REQUESTED,
    NEW_EQUIPMENT_TRANSFERRED,
    PROGRAMS_RECEIVED,
    COMPANIES_DASHBOARD_INFORMATION_RECEIVED,
    EQUIPMENT_DETAILS_RECEVIED,
    MEMBER_INFO_RECEIVED,
    SET_NOTIFICATION_NUMBER,
    SHOW_PROGRAM_CREATED_VIEW,
    TOTAL_CUSTOMERS,
    COMPANY_BALANCE_RECEIVED,
    UNITS_TRANSFERRED_RECEIVED,
    LAST_TRANSFERS_RECEIVED,
    NUMBER_OF_PROGRAMS_RECEIVED,
    GOVERNMENT_BALANCE_RECEIVED,
    SUBSIDIES_DELIVERED_RECEIVED,
    NUMBER_OF_EQUIPMENTS,
    GROUP_BALANCE_RECEIVED
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
                dispatch({
                    type: EQUIPMENT_DETAILS_RECEVIED,
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
                let equipmentId = values.selectedEquipment.equipmentId;
                let { subsidyAmount, units } = values;
                Obsidian.createProgramOnChain(ipfsHash, costPerUnit, subsidyAmount, units, equipmentId)
                    .then((response) => {
                        dispatch({
                            type: SHOW_PROGRAM_CREATED_VIEW,
                            data: true
                        });
                        dispatch({
                            type: SHOW_LOADER,
                            data: false
                        });

                        setTimeout(() => {
                            redirect();
                            dispatch({
                                type: SHOW_PROGRAM_CREATED_VIEW,
                                data: false
                            });
                        }, 1500);
                    }).catch((error) => {
                        //TODO: handle error
                    });
            })
            .catch((error) => {
                //TODO: error handling, testing deployment
            });
    }
}

export function getUnitsTransferred() {
    return (dispatch, getState, { Obsidian }) => {
        Obsidian.getUnitsTransferred().then((unitsTransferred) => {
            dispatch({
                type: UNITS_TRANSFERRED_RECEIVED,
                data: unitsTransferred
            })
        })
    }
}


export function getCompanyBalance() {
    return (dispatch, getState, { Obsidian }) => {
        Obsidian.getCompanyBalance().then((balance) => {
            dispatch({
                type: COMPANY_BALANCE_RECEIVED,
                data: balance
            })
        })
    }
}

export function getNumberOfCustomers() {
    return (dispatch, getState, { Obsidian }) => {
        Obsidian.getUnitsTransferred().then((unitsTransferred) => {
            let totalCustomers = unitsTransferred > 0 ? 2 : 0;//TODO: need to use real members or data structure to store members that have received an equipment      
            dispatch({
                type: TOTAL_CUSTOMERS,
                data: totalCustomers
            })
        });
    }
}

export function getTransfers() {
    return (dispatch, getState, { Obsidian }) => {
        Obsidian.getEquipmentsTransferred().then((numberOfEquipments) => {
            //get the equipment ids by index     
            let indexes = [];
            for (let i = 1; i <= numberOfEquipments; i++) {
                indexes.push(i);
            }
            let actions = indexes.map(Obsidian.getEquipmentTransferred);
            let results = Promise.all(actions);
            results.then(data => {
                let equipmentActions = data.map(getEquipmentInfo);
                let promises = Promise.all(equipmentActions);
                promises.then(data => {
                    dispatch({
                        type: LAST_TRANSFERS_RECEIVED,
                        data: data
                    });
                });
            });


        });
    }
}

export function getGovernmentBalance() {
    return (dispatch, getState, { Obsidian }) => {
        Obsidian.getBalance().then((balance) => {
            dispatch({
                type: GOVERNMENT_BALANCE_RECEIVED,
                data: balance
            })
        })
    }
}

export function getNumberOfPrograms() {
    return (dispatch, getState, { Obsidian }) => {
        Obsidian.getNumberOfPrograms().then((numberOfPrograms) => {
            dispatch({
                type: NUMBER_OF_PROGRAMS_RECEIVED,
                data: numberOfPrograms
            })
        })
    }
}

export function getSubsidiesDelivered() {
    return (dispatch, getState, { Obsidian }) => {
        Obsidian.getSubsidiesDelivered().then((subsidiesDelivered) => {
            dispatch({
                type: SUBSIDIES_DELIVERED_RECEIVED,
                data: subsidiesDelivered
            })
        })
    }
}

export function getInformationForCompaniesDashboard() {
    return (dispatch, getState, { Obsidian }) => {

        let result = {};
        axios.get(GET_PROGRAMS_URL)
            .then(response => {
                let programs = response.data;
                let numberOfPrograms = programs.length;
                dispatch(getCompanyBalance());
                dispatch(getUnitsTransferred());
                dispatch(getNumberOfCustomers());
                dispatch(getTransfers());

                dispatch({
                    type: COMPANIES_DASHBOARD_INFORMATION_RECEIVED,
                    data: programs
                });
            }).catch((error) => {
                //TODO
                console.log(error);
            });
    }
}
export function getInformationForGovernmentDashboard() {
    return (dispatch, getState, { Obsidian }) => {
        dispatch(getGovernmentBalance());
        dispatch(getNumberOfPrograms());        
        dispatch(getSubsidiesDelivered());    
        dispatch(getProgramInformation())    
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
        dispatch(addListenerForEquipmentRequests());
        dispatch(addListenerForSubsidyRequests());
    }
}

export function resetSelectedEquipment() {
    return (dispatch) => {
        dispatch({
            type: SELECTED_EQUIPMENT,
            data: undefined
        })
    }

}

export function resetNotificationsNumber() {
    return (dispatch) => {
        dispatch({
            type: SET_NOTIFICATION_NUMBER,
            data: 0
        })
    }

}

export function addListenerForEquipmentRequests() {
    return (dispatch, getState, { ObsidianSmartContract }) => {
        let myEvent = ObsidianSmartContract.newEquipmentRequested('latest');
        myEvent.watch((error, event) => {          
            if (!error) {
                console.log("new equipment requested");
                //if (localStorage.getItem('newEquipmentRequested')) {         
                    dispatch({
                        type: SET_NOTIFICATION_NUMBER,
                        data: 1
                    })
                    dispatch({
                        type: NEW_EQUIPMENT_TRANSFER_REQUESTED,
                        data: event.args.equipmentId.toNumber()
                    })
                //}
                //localStorage.setItem('newEquipmentRequested', 'on');
            }
        });
    }
}

export function addListenerForSubsidyRequests() {
    return (dispatch, getState, { ObsidianSmartContract }) => {
        let myEvent = ObsidianSmartContract.newSubsidyRequested('latest');
        myEvent.watch((error, event) => {
            if (!error) {
                console.log("new subsidy requested");
                //if (localStorage.getItem('newSubsidyRequested')) {               
                    dispatch({
                        type: SET_NOTIFICATION_NUMBER,
                        data: 1
                    })
                    dispatch({
                        type: NEW_SUBSIDY_TRANSFER_REQUESTED,
                        data: event.args.programId.toNumber()
                    })
                //}
                //localStorage.setItem('newSubsidyRequested', 'on');
            }
        });
    }
}

export function getGroupBalance() {
    return (dispatch, getState, { ObsidianSmartContract, Obsidian }) => {
        ObsidianSmartContract.membersRegistered(1, (error, result) => {
            debugger;
            let address = result;
            Obsidian.getBalance(address).then((balance) => {
                dispatch({
                    type: GROUP_BALANCE_RECEIVED,
                    data: balance
                })
            });
        })
        //get members info 1, get address, then balance
        // dispatch({ 
        //     type: GROUP_BALANCE_RECEIVED,
        //     data: 
        // });
    }
}

export function getNumberOfEquipmentsPerGroup() {
    return (dispatch, getState, { Obsidian }) => {
        Obsidian.getUnitsTransferred().then((unitsTransferred) => {
            dispatch({
                type: NUMBER_OF_EQUIPMENTS,
                data: unitsTransferred
            })
        })
    }
}

export function makeEquipmentTransfer(equipmentId, redirect) {
    return (dispatch, getState, { Obsidian }) => {
        dispatch({
            type: SHOW_LOADER,
            data: true
        });
        Obsidian.makeEquipmentTransferOnChain(equipmentId).then((result) => {
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

export function makeProgramTransfer(programId, redirect) {
    return (dispatch, getState, { Obsidian }) => {
        dispatch({
            type: SHOW_LOADER,
            data: true
        });
        Obsidian.makeProgramTransferOnChain(programId).then((result) => {
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

const getEquipmentInfo = (equipmentId) => {
    return new Promise((resolve, reject) => {
        axios.get(`${TRACTORS_URL}/${equipmentId}`)
            .then(response => {
                resolve(response.data[0]);
            })
    })
}