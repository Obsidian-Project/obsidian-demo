import { combineReducers } from 'redux';
import NotificationReducer from './notificationReducer';
import EquipmentsReducer from './equipmentsReducer';
const rootReducer = combineReducers({
    notificationReducer: NotificationReducer,
    equipmentsReducer: EquipmentsReducer
});


export default rootReducer;