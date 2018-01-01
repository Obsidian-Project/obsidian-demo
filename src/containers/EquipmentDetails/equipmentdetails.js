import React from 'react';
import Equipments from '../Equipments';
import styles from './equipmentdetails.css';
import { Container, Header, Grid, Segment, Image, Form, Button, Dimmer, Loader, Divider, Input, Modal, Item, List } from 'semantic-ui-react';
import * as actions from '../../actions';
import { connect, } from 'react-redux';
import { withRouter } from 'react-router-dom';

class EquipmentDetails extends React.Component {
  constructor() {
    super();
  }
  componentWillMount() {
    this.props.resetNotificationsNumber();
    if (this.props.match.params.equipmentId) {
      this.props.getProgram(this.props.match.params.equipmentId);
    }
  }
  transferEquipment = () => {
    const { history } = this.props; 
    let equipmentIdNumber = Number(this.props.equipmentDetails.programId);
    this.props.makeTransfer(equipmentIdNumber, () => {
      history.push("/companies");
    });
  }
  render() {
    return (
      <span>
        {this.props.showLoader && <Dimmer inverted active>
          <Loader>
            <Header>Transfering</Header>
          </Loader>
        </Dimmer>}
        
        
        <Segment>
          <Grid>
            <Grid.Column width={8}>
              {this.props.equipmentDetails && <img className="equipmentdetailsImg" src={this.props.equipmentDetails.imageUrl} alt="equipment details" />}

            </Grid.Column>
            {this.props.equipmentDetails &&
              <Grid.Column width={8}>
                <Header as="h2" className="equipmentdetailsHeader">{`${this.props.equipmentDetails.category} ${this.props.equipmentDetails.model}`}</Header>
                <span>{this.props.equipmentDetails.category}</span>
                <List as="ul">
                  {this.props.equipmentDetails.details.map((item, index) => {
                    return <List.Item key={index} as="li">
                      {item}
                    </List.Item>
                  })}
                </List>
                <p className="equipmentdetailsp">
                  {this.props.equipmentDetails.description}
                </p>
                <Button fluid color="green" onClick={this.transferEquipment}>Transfer</Button>
              </Grid.Column>
            }
          </Grid>
        </Segment>
      </span>
    )
  }
}

function mapStateToProps(state) {
  return {
    equipmentDetails: state.equipmentsReducer.equipmentDetails,
    showLoader: state.equipmentsReducer.showLoader
  }
}

EquipmentDetails = withRouter(EquipmentDetails);

export default connect(mapStateToProps, actions)(EquipmentDetails);
