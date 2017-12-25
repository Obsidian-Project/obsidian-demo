import React from 'react';
import Layout from '../Layout';
import Logo from './sugarmill-logo.png';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './sugarmillslayout.css';

const Sidebar = ({ activeItem, onMenuClickItem }) => (
    <Menu className="sidebar-menu" vertical>
        <Menu.Item><Link to="/">Home</Link></Menu.Item>
        <Menu.Item><Link to="/programs">Programs</Link></Menu.Item>
    </Menu>
)

class SugarMillsLayout extends React.Component {
    constructor() {
        super();
    }

    render(){
        return (
            <Layout logo={Logo} sidebar={Sidebar} baseUrl="sugarmills">
                {this.props.children}                
            </Layout>
        )
    }
}

export default SugarMillsLayout;