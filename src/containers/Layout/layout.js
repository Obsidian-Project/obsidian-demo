import React from 'react';
import './layout.css';
import { Link } from 'react-router-dom';
import { Container, Grid, Segment, Image, Menu, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CompanyLogo from './john-deere-logo.png';

const Sidebar = ({ activeItem, onMenuClickItem }) => (
    <Menu className="sidebar-menu" vertical>
        <Menu.Item><Link to="/">Home</Link></Menu.Item>
        <Menu.Item><Link to="/programs">Programs</Link></Menu.Item>
    </Menu>
)

const HeaderFixed = () => (
    <Menu icon borderless fluid className="top-nav" size="huge">
        <Menu.Menu position='right'>
            <Menu.Item name='search'>
                <Icon name='search' />
            </Menu.Item>

            <Menu.Item name='alarm'>
                <Icon name='alarm' />
            </Menu.Item>

            <Menu.Item name='user'>
                <Icon name='user' />
            </Menu.Item>
        </Menu.Menu>
    </Menu>
)

class Layout extends React.Component {
    render() {
        return (
            <Container fluid className="main-container">
                <Grid divided='vertically' columns={2}>
                    <Grid.Row>
                        <Grid.Column width={3} className="sidebar">
                            <Image src={CompanyLogo}></Image>
                            <Sidebar />
                        </Grid.Column>
                        <Grid.Column width={13} className="main-content">
                            <HeaderFixed />
                            {this.props.children}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default Layout;