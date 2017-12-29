import {
    EQUIPMENTS_RECEIVED,
    EQUIPMENT_RECEIVED,
    SELECTED_EQUIPMENT,
    SHOW_MODAL,
    SHOW_LOADER   
} from '../actions/types';


const initialState = {
    equipments: [],
    equipment: undefined,
    selectedEquipment: undefined,
    modalOpen: false,
    showLoader: false
    //In case I need more modal can move to a reducer for that
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
            return { ...state, ...{ selectedEquipment: action.data } };  
        case SHOW_MODAL:
            return { ...state, ...{ modalOpen: action.data } };  
        default:
            return state;
    }
}
