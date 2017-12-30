import {
    DASHBOARD_INFORMATION_RECEIVED,
    SHOW_LOADER   
} from '../actions/types';


const initialState = {
    dashboardInfo: {
        numberOfPrograms: 0,
        subsidiesDeliverd: 0,
        units: 0
    },  
    showLoader: false
};

export default function (state = initialState, action) {
    switch (action.type) {      
        case SHOW_LOADER:
            return { ...state, ...{ showLoader: action.data } };  
        case DASHBOARD_INFORMATION_RECEIVED:
            return { ...state, ...{ dashboardInfo: action.data } };          
        default:
            return state;
    }
}
