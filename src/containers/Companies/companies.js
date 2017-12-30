import React from 'react';
import CompaniesLayout from '../../layouts/CompaniesLayout';
import './companies.css';
import * as actions from '../../actions';
import { connect, } from 'react-redux';
import GovernmentDashboard from '../../components/GovernmentDashboard'

class Companies extends React.Component {
    constructor() {
        super();
    }

    componentWillMount(){
        //add event listener for event
        //show alert
        this.props.addListenerForNewRequests();
        //el action escucha y si hay algo, dispacha una action
        //aqui yo solo recibo el numero para actualizar el badge
    }
    render(){
        return (
        <CompaniesLayout title={this.props.title}>
            {this.props.children}
        </CompaniesLayout>
        )
    }
}

function mapStateProps(state) {
    return {
        numberOfNotifications: state.notificationReducer.companyNotificationsNumber
    }
}

export default connect(mapStateProps,actions)(Companies);
