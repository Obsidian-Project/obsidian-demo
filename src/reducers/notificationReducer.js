import {
    SHOW_NOTIFICATION,
    NEW_EQUIPMENT_REQUESTED 
} from '../actions/types';


const initialState = {
    message: "",
    animateIn: false,
    governmentNotificatiosNumber: 0,
    programId: 0,
    notificationInfo: {
        
    }
};

export default function (state = initialState, action) {
    switch (action.type) {     
        case NEW_EQUIPMENT_REQUESTED:
            return { ...state, ...{ notificationInfo: action.data }}; //TODO: hardcoded always 1 for demo
        case SHOW_NOTIFICATION:
            return { ...state, ...{ message: action.data, animateIn: action.data !== "" } };        
        default:
            return state;
    }
}
