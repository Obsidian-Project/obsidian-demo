import {
    SHOW_NOTIFICATION,
    NEW_EQUIPMENT_REQUESTED 
} from '../actions/types';


const initialState = {
    message: "",
    animateIn: false,
    companyNotificationsNumber: 0,
    governmentNotificatiosNumber: 0
};

export default function (state = initialState, action) {
    switch (action.type) {     
        case NEW_EQUIPMENT_REQUESTED:
            return { ...state, ...{ companyNotificationsNumber: state.companyNotificationsNumber + 1 } }; //TODO: hardcoded always 1 for demo
        case SHOW_NOTIFICATION:
            return { ...state, ...{ message: action.data, animateIn: action.data !== "" } };        
        default:
            return state;
    }
}
