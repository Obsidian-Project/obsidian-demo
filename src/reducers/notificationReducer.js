import {
    SHOW_NOTIFICATION   
} from '../actions/types';


const initialState = {
    message: "",
    animateIn: false
};

export default function (state = initialState, action) {
    switch (action.type) {      
        case SHOW_NOTIFICATION:
            return { ...state, ...{ message: action.data, animateIn: action.data !== "" } };        
        default:
            return state;
    }
}
