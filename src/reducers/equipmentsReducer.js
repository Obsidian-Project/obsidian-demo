import {
    EQUIPMENTS_RECEIVED,
    EQUIPMENT_RECEIVED,
    SELECTED_EQUIPMENT,
    SHOW_MODAL,
    SHOW_LOADER,
    EQUIPMENT_DETAILS_RECEVIED,
    SHOW_PROGRAM_CREATED_VIEW,
    NUMBER_OF_EQUIPMENTS,
    GROUP_BALANCE_RECEIVED   
} from '../actions/types';


const initialState = {
    equipments: [],
    equipment: undefined,
    selectedEquipment: undefined,
    modalOpen: false,
    showLoader: false,
    equipmentDetails: undefined,
    showProgramCreatedView: false,
    numberOfEquipmentsPerGroup: undefined,
    groupBalance: undefined   
};

export default function (state = initialState, action) {
    switch (action.type) {      
        case SHOW_PROGRAM_CREATED_VIEW:
            return { ...state, ...{ showProgramCreatedView: action.data } };  
        case SHOW_LOADER:           
            return { ...state, ...{ showLoader: action.data } };  
        case SELECTED_EQUIPMENT:
            return { ...state, ...{ selectedEquipment: action.data } };    
        case EQUIPMENTS_RECEIVED:
            return { ...state, ...{ equipments: action.data } };       
        case EQUIPMENT_RECEIVED:         
            return { ...state, ...{ equipment: action.data } };  
        case NUMBER_OF_EQUIPMENTS:
            return { ...state, ...{ numberOfEquipmentsPerGroup: action.data } };  
        case GROUP_BALANCE_RECEIVED:
            return { ...state, ...{ groupBalance: action.data } };  
        case EQUIPMENT_DETAILS_RECEVIED:          
            return { ...state, ...{ equipmentDetails: action.data } };          
        case SHOW_MODAL:
            return { ...state, ...{ modalOpen: action.data } };  
        default:
            return state;
    }
}
