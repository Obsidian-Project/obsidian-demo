import { combineReducers } from 'redux';
import NotificationReducer from './notificationReducer';
const rootReducer = combineReducers({
    notificationReducer: NotificationReducer
});


export default rootReducer;