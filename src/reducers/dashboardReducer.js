import {
    DASHBOARD_INFORMATION_RECEIVED,
    SHOW_LOADER,
    PROGRAMS_RECEIVED   
} from '../actions/types';


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
            action.data.pieChartValues = pieValues;
            action.data.mechanizedAreaPieChartValues = mechanizedArea;
            return { ...state, ...{ dashboardInfo: action.data } };          
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
        { value: 0, key: 2, color: '#7fdad6' },
        { value: 100, key: 3, color: '#00908a' }
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
