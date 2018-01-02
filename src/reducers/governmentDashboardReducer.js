import {   
    SHOW_LOADER,
    PROGRAMS_RECEIVED,
    GOVERNMENT_BALANCE_RECEIVED,
    NUMBER_OF_PROGRAMS_RECEIVED,
    SUBSIDIES_DELIVERED_RECEIVED   
} from '../actions/types';

import update from 'immutability-helper';

const initialState = {    
    subsidiesDeliverd: 0,
    units: 0,         
    numberOfPrograms: 0,
    balance: 0,
    showLoader: false,
    equipmentTypes: [],
    programsInfo: undefined,
    landCoverage: []  
};

export default function (state = initialState, action) {
    switch (action.type) {     
        case NUMBER_OF_PROGRAMS_RECEIVED:
            let equipmentTypes = getPieChartValues(action.data.numberOfPrograms);            
            const newData = update(state, {
                numberOfPrograms: {$set : action.data },
                equipmentTypes:  {$set : equipmentTypes }
            });
             return update(state, { $set: newData });
        case GOVERNMENT_BALANCE_RECEIVED:
            return update(state, { balance : {$set : action.data }}); 
        case PROGRAMS_RECEIVED:               
            return { ...state, ...{ programsInfo: action.data } };  
        case SHOW_LOADER:
            return { ...state, ...{ showLoader: action.data } };  
        case SUBSIDIES_DELIVERED_RECEIVED:           
            let mechanizedArea = getTotalLandCoverage(action.data);
            const newState = update(state, {
                landCoverage: { $set : mechanizedArea },
                subsidiesDeliverd: { $set: action.data }               
            });
            return update(state, { $set: newState });
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
