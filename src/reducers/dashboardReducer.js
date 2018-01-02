import {
    DASHBOARD_INFORMATION_RECEIVED,
    SHOW_LOADER,
    PROGRAMS_RECEIVED   
} from '../actions/types';

import update from 'immutability-helper';

const initialState = {
    dashboardInfo: {
        numberOfPrograms: 0,
        subsidiesDeliverd: 0,
        units: 0,
        pieChartValues: [],
        mechanizedAreaPieChartValues: []
    },  
    showLoader: false,
    programsInfo: undefined  
};

export default function (state = initialState, action) {
    switch (action.type) {         
        case PROGRAMS_RECEIVED:               
            return { ...state, ...{ programsInfo: action.data } };  
        case SHOW_LOADER:
            return { ...state, ...{ showLoader: action.data } };  
        case DASHBOARD_INFORMATION_RECEIVED:
            let pieValues = getPieChartValues(action.data.numberOfPrograms);
            let mechanizedArea = getTotalLandCoverage(action.data.subsidiesDeliverd);
            const newState = update(action.data, {
                $merge: { pieChartValues: pieValues, mechanizedArea: mechanizedArea }
            });
            return update(state, { dashboardInfo: { $set: newState  }});
        default:
            return state;
    }
}

const getPieChartValues = (numberOfPrograms) => {
    if(numberOfPrograms == 0)
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

const getTotalLandCoverage = (subsidiesDeliverd) => {
    let totalLandMexico = 80897;
    let pieChartValues =
    [
        { value: 40, key: 1, color: '#00b5ad' },
        { value: 60, key: 2, color: '#7fdad6' },
    ];
    return pieChartValues;
}
