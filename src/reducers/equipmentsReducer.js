import {
    EQUIPMENTS_RECEIVED,
    EQUIPMENT_RECEIVED   
} from '../actions/types';


const initialState = {
    equipments: [],
    selectedEquipment: {}
};

export default function (state = initialState, action) {
    switch (action.type) {      
        case EQUIPMENTS_RECEIVED:
            return { ...state, ...{ equipments: action.data } };       
        case EQUIPMENT_RECEIVED:
            return { ...state, ...{ equipment: action.data } };        
        default:
            return state;
    }
}
