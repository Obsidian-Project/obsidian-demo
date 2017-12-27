import React from 'react';
import Layout from '../Layout';
import CompanyLogo from './john-deere-logo.png';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './companieslayout.css';

class CompaniesLayout extends React.Component {
    constructor() {
        super();
    }

    render(){
        return (
            <Layout
              pageTitle="Companies"
              pageIcon = "briefcase"
              logo={CompanyLogo}
              baseUrl="companies">
                {this.props.children}
            </Layout>
        )
    }
}

export default CompaniesLayout;
