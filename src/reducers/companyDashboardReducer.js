import {
    SHOW_LOADER,
    PROGRAMS_RECEIVED,
    COMPANIES_DASHBOARD_INFORMATION_RECEIVED,
    LAST_TRANSFERS_RECEIVED,
    COMPANY_BALANCE_RECEIVED,
    TOTAL_CUSTOMERS,
    UNITS_TRANSFERRED_RECEIVED

} from '../actions/types';

import update from 'immutability-helper';

const initialState = {
    unitsTransferred: 0,
    customers: 0,
    totalEarnings: 0,
    transfers: [{
        model: "1",
        category: "Tractor",
        price: 123
    }],
    distributionPerType: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case COMPANIES_DASHBOARD_INFORMATION_RECEIVED:
            let distributionPerType = getPieChartValues(action.data.length);
            return update(state, { distributionPerType: { $set: distributionPerType } });
        case LAST_TRANSFERS_RECEIVED:
            return { ...state, ...{ transfers: action.data } };
        case TOTAL_CUSTOMERS:
            return { ...state, ...{ customers: action.data } };
        case UNITS_TRANSFERRED_RECEIVED:
            return { ...state, ...{ unitsTransferred: action.data } };
        case COMPANY_BALANCE_RECEIVED:
            return { ...state, ...{ totalEarnings: action.data } };
        case SHOW_LOADER:
            return { ...state, ...{ showLoader: action.data } };

        default:
            return state;
    }
}

const getPieChartValues = (numberOfPrograms) => {
    if (numberOfPrograms == 0)
        return [];
    let frequencyOfTractors = 0;
    let frequencyOfHarvesters = 0;
    let frequencyOfHighPrecisionEquipment = 0;
    //TODO: For demo only tractors
    let pieChartValues =
        [
            { value: 0, key: 1, color: '#00b5ad' },
            { value: 0, key: 2, color: '#bec038' },
            { value: 100, key: 3, color: '#21ba45' }
        ];
    return pieChartValues;
}