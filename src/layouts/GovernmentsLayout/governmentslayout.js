import React from 'react';
import Layout from '../Layout';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './governmentslayout.css';

class GovernmentsLayout extends React.Component {
    constructor() {
        super();
    }

    render(){
        return (
            <Layout
              pageTitle="Governments"
              pageIcon = "building outline"
              baseUrl="governments"
              color="teal"
              title={this.props.title}>
                {this.props.children}
            </Layout>
        )
    }
}

export default GovernmentsLayout;
