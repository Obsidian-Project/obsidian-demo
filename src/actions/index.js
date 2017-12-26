//import axios from './axios';

import {
    SHOW_NOTIFICATION,
} from './types';

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