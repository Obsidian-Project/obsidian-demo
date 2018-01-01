import {
    SHOW_NOTIFICATION,
    NEW_EQUIPMENT_REQUESTED,
    SET_NOTIFICATION_NUMBER
} from '../actions/types';


const initialState = {
    message: "",
    animateIn: false,
    governmentNotificatiosNumber: 0,
    programId: 0,
    numberOfNotifications: 0    
};

export default function (state = initialState, action) {
    switch (action.type) {     
        case SET_NOTIFICATION_NUMBER:
            return { ...state, ...{ numberOfNotifications: action.data }};
        case NEW_EQUIPMENT_REQUESTED:
            return { ...state, ...{ programId: action.data }};
        case SHOW_NOTIFICATION:
            return { ...state, ...{ message: action.data, animateIn: action.data !== "" } };        
        default:
            return state;
    }
}
