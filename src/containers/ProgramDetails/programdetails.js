import React from 'react';
import Equipments from '../Equipments';
import styles from './programdetails.css';
import { Container, Header, Grid, Segment, Image, Form, Button, Dimmer, Loader, Divider, Input, Modal, Item, List } from 'semantic-ui-react';
import * as actions from '../../actions';
import { connect, } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EquipmentDetail from '../../components/EquipmentDetail';

class ProgramDetails extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.props.resetNotificationsNumber();
    if (this.props.match.params.programId) {
      this.props.getProgram(this.props.match.params.programId);
    }
  }

  transferEquipment = () => {
    const { history } = this.props;
    let programIdNumber = Number(this.props.equipmentDetails.programId);
    this.props.makeProgramTransfer(programIdNumber, () => {
      history.push("/companies");
    });
  }

  render() {
    return (
      <div className="equipment-detail-page">
        {this.props.showLoader && <Dimmer inverted active>
          <Loader>
            <Header>Transfering</Header>
          </Loader>
        </Dimmer>}

        <EquipmentDetail equipmentDetails={this.props.equipmentDetails} onTransfer={this.transferEquipment} />
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    equipmentDetails: state.equipmentsReducer.equipmentDetails,
    showLoader: state.equipmentsReducer.showLoader
  }
}

ProgramDetails = withRouter(ProgramDetails);

export default connect(mapStateToProps, actions)(ProgramDetails);
