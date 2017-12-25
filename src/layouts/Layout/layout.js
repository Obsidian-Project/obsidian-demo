import React from 'react';
import './layout.css';
import { Link, withRouter } from 'react-router-dom';
import { Container, Grid, Segment, Image, Menu, Icon, Dropdown} from 'semantic-ui-react';
import PropTypes from 'prop-types'; // ES6

const HeaderFixed = (props) => {   
    return <Menu icon borderless fluid className="top-nav" size="huge">
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
};

class Layout extends React.Component {
    render() {
        return (
            <Container fluid className="main-container">
                <Grid divided='vertically' columns={2}>
                    <Grid.Row>
                        <Grid.Column width={3} className="sidebar">
                            <Image src={this.props.logo}></Image>
                            <this.props.sidebar />
                        </Grid.Column>
                        <Grid.Column width={13} className="main-content">
                            <HeaderFixed baseUrl={this.props.baseUrl} />
                            {this.props.children}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

Layout.propTypes  = {
    logo: PropTypes.any.isRequired,
    sidebar: PropTypes.any.isRequired,
    baseUrl: PropTypes.string.isRequired
}

export default Layout;