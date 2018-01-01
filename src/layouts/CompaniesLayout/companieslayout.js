import React from 'react';
import Layout from '../Layout';
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
              baseUrl="companies"
              showPrograms={false}
              showNotifications={true}
              color="green">
                {this.props.children}
            </Layout>
        )
    }
}

export default CompaniesLayout;
