import React from 'react';
import CompaniesLayout from '../../layouts/CompaniesLayout';
import './companies.css';

class Companies extends React.Component {
    constructor() {
        super();
    }

    render(){
        return (
        <CompaniesLayout>
            {this.props.children}
            <h1>Hello</h1>
        </CompaniesLayout>
        )
    }
}

export default Companies;