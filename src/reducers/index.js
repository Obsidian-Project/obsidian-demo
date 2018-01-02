import { combineReducers } from 'redux';
import NotificationReducer from './notificationReducer';
import EquipmentsReducer from './equipmentsReducer';
import DashboardReducer from './dashboardReducer';
import CompanyDashboardReducer from './companyDashboardReducer';

const rootReducer = combineReducers({
    notificationReducer: NotificationReducer,
    equipmentsReducer: EquipmentsReducer,
    dashboardReducer: DashboardReducer,
    companyDashboardReducer: CompanyDashboardReducer
});


export default rootReducer;