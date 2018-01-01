import {
    EQUIPMENTS_RECEIVED,
    EQUIPMENT_RECEIVED,
    SELECTED_EQUIPMENT,
    SHOW_MODAL,
    SHOW_LOADER,
    EQUIPMENT_DETAILS_RECEVIED   
} from '../actions/types';


const initialState = {
    equipments: [],
    equipment: undefined,
    selectedEquipment: undefined,
    modalOpen: false,
    showLoader: false,
    equipmentDetails: undefined,   
};

export default function (state = initialState, action) {
    switch (action.type) {      
        case SHOW_LOADER:           
            return { ...state, ...{ showLoader: action.data } };  
        case SELECTED_EQUIPMENT:
            return { ...state, ...{ selectedEquipment: action.data } };    
        case EQUIPMENTS_RECEIVED:
            return { ...state, ...{ equipments: action.data } };       
        case EQUIPMENT_RECEIVED:         
            return { ...state, ...{ equipment: action.data } };  
        case EQUIPMENT_DETAILS_RECEVIED:          
            return { ...state, ...{ equipmentDetails: action.data } };          
        case SHOW_MODAL:
            return { ...state, ...{ modalOpen: action.data } };  
        default:
            return state;
    }
}
