import { combineReducers } from 'redux';
import NotificationReducer from './notificationReducer';
import EquipmentsReducer from './equipmentsReducer';
import GovernmentDashboardReducer from './governmentDashboardReducer';
import CompanyDashboardReducer from './companyDashboardReducer';

const rootReducer = combineReducers({
    notificationReducer: NotificationReducer,
    equipmentsReducer: EquipmentsReducer,
    companyDashboardReducer: CompanyDashboardReducer,
    governmentDashboardReducer: GovernmentDashboardReducer
});


export default rootReducer;