import React from 'react';
import './layout.css';
import { Link, withRouter } from 'react-router-dom';
import { Label, Container, Grid, Segment, Image, Menu, Icon, Dropdown, Header, Message, Modal, Button, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types'; // ES6
import NotificationComponent from "../../components/notificationComponent";
import * as actions from '../../actions';
import { connect, } from 'react-redux';

const HeaderFixed = (props) => {
    return <div className="NavBar">
      <Menu inverted color ={props.color} icon borderless fluid  size="huge">
        <Menu.Item>
          <Link to={`/${props.baseUrl}`}>
            <h2><Icon name={props.pageIcon}/> {props.pageTitle}</h2>
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

          <Popup
            trigger={
              <Menu.Item as ="a" name='alarm'>
                <Icon name='alarm' />
                 {props.companyNotificationsNumber > 0 && props.companyNotificationsNumber < 2 && <Label color='red' circular floating>{props.companyNotificationsNumber}</Label>}
              </Menu.Item>
            }
            content={
              <Button color='green'>
                <Link className="equipmentdetailsLink" to={`/${props.baseUrl}/equipmentdetails/${props.programId}`} >
                  New request for equipment
                </Link>
              </Button>
            }
            hoverable
            position='top right'
          />


          <Menu.Item name='user'>
            <Icon name='user' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
};

class Layout extends React.Component {
    componentWillMount(){
        //hot fix for the bad design of the hierarchy and the need of higher order components
        const { match, location } = this.props;
        if(location.pathname.indexOf("newMember") > -1){
            this.setState({
                title: "Register New Member"
            })
        } else if (location.pathname.indexOf("newGroup") > -1){
            this.setState({
                title: "Register New Group"
            })
        } else if (location.pathname.indexOf("newProgram") > -1){
            this.setState({
                title: "Create New Program"
            })
        } else{
            this.setState({
                title: "Dashboard"
            })
        }
    }
    render() {
        return (
          <Container
            fluid
            className={`main-container ${this.props.baseUrl}`}>
              <Grid>
                  <Grid.Row>
                      <Grid.Column width={16} className="main-content">
                          <HeaderFixed
                            companyNotificationsNumber={this.props.companyNotificationsNumber}
                            baseUrl={this.props.baseUrl} title={this.state.title}
                            logo={this.props.logo}
                            pageTitle={this.props.pageTitle}
                            pageIcon={this.props.pageIcon}
                            color={this.props.color}
                            programId={this.props.programId}
                           />
                          <Container className="inner-content">
                            {this.props.children}
                          </Container>
                      </Grid.Column>
                  </Grid.Row>
              </Grid>
            </Container>
        )
    }
}

Layout.propTypes = {
    // logo: PropTypes.any.isRequired,
    baseUrl: PropTypes.string.isRequired
}

function mapStateProps(state) {
  return {     
      companyNotificationsNumber: state.notificationReducer.notificationInfo.notificationNumber,
      programId: Number(state.notificationReducer.notificationInfo.programId)
  }
}

Layout = withRouter(Layout);

export default connect(mapStateProps, actions)(Layout);

