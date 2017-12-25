import React from 'react';
import Layout from '../Layout';
import GovernmentLogo from './government-logo-full.png';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './governmentslayout.css';

const Sidebar = ({ activeItem, onMenuClickItem }) => (
    <Menu className="sidebar-menu" vertical>
        <Menu.Item><Link to="/">Home</Link></Menu.Item>
        <Menu.Item><Link to="/programs">Programs</Link></Menu.Item>
    </Menu>
)

class GovernmentsLayout extends React.Component {
    constructor() {
        super();
    }

    render(){
        return (
            <Layout logo={GovernmentLogo} sidebar={Sidebar} baseUrl="governments">
                {this.props.children}                
            </Layout>
        )
    }
}

export default GovernmentsLayout;