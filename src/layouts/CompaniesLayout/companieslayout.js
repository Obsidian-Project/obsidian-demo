import React from 'react';
import Layout from '../Layout';
import CompanyLogo from './john-deere-logo.png';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './companieslayout.css';

const Sidebar = ({ activeItem, onMenuClickItem }) => (
    <Menu className="sidebar-menu" vertical>
        <Menu.Item><Link to="/">Home</Link></Menu.Item>
        <Menu.Item><Link to="/programs">Programs</Link></Menu.Item>
    </Menu>
)

class CompaniesLayout extends React.Component {
    constructor() {
        super();
    }

    render(){
        return (
            <Layout logo={CompanyLogo} sidebar={Sidebar} baseUrl="companies">
                {this.props.children}                
            </Layout>
        )
    }
}

export default CompaniesLayout;