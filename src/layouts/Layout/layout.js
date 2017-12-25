import React from 'react';
import './layout.css';
import { Link, withRouter } from 'react-router-dom';
import { Container, Grid, Segment, Image, Menu, Icon, Dropdown, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types'; // ES6

const HeaderFixed = (props) => {
    return <div>
        <Menu icon borderless fluid className="top-nav" size="huge">
        <Menu.Item>
            <Link to={`/${props.baseUrl}`}>
                <Image src={props.logo}></Image>
            </Link>
        </Menu.Item>
        <Menu.Item><Link to="/">Home</Link></Menu.Item>
        <Menu.Item><Link to="/programs">Programs</Link></Menu.Item>

        <Menu.Menu position='right'>
            <Dropdown item icon="add">
                <Dropdown.Menu>
                    <Dropdown.Item><Link to={`/${props.baseUrl}/newMember`}>New Member</Link></Dropdown.Item>
                    <Dropdown.Item><Link to={`/${props.baseUrl}/newGroup`}>New Group</Link></Dropdown.Item>
                    <Dropdown.Item><Link to={`/${props.baseUrl}/newProgram`}>New Program</Link></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

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
        <Menu fluid borderless attached className="secondary-top-nav">
            <Menu.Item>                           
                    <Header as="h1">{props.title}</Header>            
            </Menu.Item>
        </Menu>
    </div>
};

class Layout extends React.Component {
    render() {
        return (
            <Container fluid className={`main-container ${this.props.baseUrl}`}>
                <Grid divided='vertically' columns={1}>
                    <Grid.Row>
                        <Grid.Column width={16} className="main-content">
                            <HeaderFixed baseUrl={this.props.baseUrl} title={this.props.title} logo={this.props.logo} />
                            {this.props.children}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

Layout.propTypes = {
    logo: PropTypes.any.isRequired,
    sidebar: PropTypes.any.isRequired,
    baseUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}

Layout.defaultProps = {
    title: "Dashboard"
}

export default Layout;