import React from 'react';
import CompaniesLayout from '../../layouts/CompaniesLayout';
import './companies.css';
import * as actions from '../../actions';
import { connect, } from 'react-redux';
import GovernmentDashboard from '../../components/GovernmentDashboard'

class CompaniesDashboard extends React.Component {
    constructor() {
        super();
    }

    render(){
        return (
        <CompaniesLayout title={this.props.title}>
            {this.props.children}
            {/* <img
              className="johnDeerelogo" src="http://www.deere.com/en_US/media/corporate_images/citizenship/john_deere_inspire/long_green.jpg" alt=""/> */}
            <GovernmentDashboard/>
        </CompaniesLayout>
        )
    }
}

export default CompaniesDashboard;
