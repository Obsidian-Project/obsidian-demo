import { combineReducers } from 'redux';
import NotificationReducer from './notificationReducer';
import EquipmentsReducer from './equipmentsReducer';
import DashboardReducer from './dashboardReducer';

const rootReducer = combineReducers({
    notificationReducer: NotificationReducer,
    equipmentsReducer: EquipmentsReducer,
    dashboardReducer: DashboardReducer
});


export default rootReducer;