import React from 'react';
import GovernmentsLayout from '../../layouts/GovernmentsLayout';
import './governments.css';
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

export default connect(null, actions)(Governments);
