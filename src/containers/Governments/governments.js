import React from 'react';
import GovernmentsLayout from '../../layouts/GovernmentsLayout';
import styles from './governments.css';
import * as actions from '../../actions';
import { connect, } from 'react-redux';

class Governments extends React.Component {
    constructor() {
        super();
    }

    componentWillMount(){
        this.props.getInformationForGovernmentDashboard();
    }
    render(){
        return (
            <GovernmentsLayout>
                {this.props.children}
            </GovernmentsLayout>
        )
    }
}

function mapStateProps(state) {
    return {
        selectedEquipment: state.equipmentsReducer.selectedEquipment,
        modalOpen: state.equipmentsReducer.modalOpen,
        showLoader: state.equipmentsReducer.showLoader,
        equipment: state.equipmentsReducer.equipment
    }
}

export default connect(mapStateProps, actions)(Governments);
