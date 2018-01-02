import {
    SHOW_NOTIFICATION,
    NEW_EQUIPMENT_REQUESTED,
    SET_NOTIFICATION_NUMBER,
    NEW_EQUIPMENT_TRANSFER_REQUESTED,
    NEW_SUBSIDY_TRANSFER_REQUESTED
} from '../actions/types';

import update from 'immutability-helper';

const initialState = {
    message: "",
    animateIn: false,
    governmentNotificatiosNumber: 0,
    programId: undefined,
    equipmentId: undefined,
    numberOfNotifications: 0
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_NOTIFICATION_NUMBER:
            return { ...state, ...{ numberOfNotifications: action.data } };
        case NEW_SUBSIDY_TRANSFER_REQUESTED:
            const newState = update(state, {
                programId: { $set: action.data },
                equipmentId: { $set: undefined }
            });
            return update(state, { $set: newState });
        case NEW_EQUIPMENT_TRANSFER_REQUESTED:
            const newData = update(state, {
                equipmentId: { $set: action.data },
                programId: { $set: undefined }
            });
            return update(state, { $set: newData });
        case SHOW_NOTIFICATION:
            return { ...state, ...{ message: action.data, animateIn: action.data !== "" } };
        default:
            return state;
    }
}
