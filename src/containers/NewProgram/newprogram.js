import React from 'react';
import { Container, Header, Grid, Segment, Image, Form, Button, Dimmer, Loader, Divider, Input, Modal, Item, List } from 'semantic-ui-react';
import { CreateObsidianContractObj } from '../../utils/smartcontract.js';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import { connect, } from 'react-redux';
import { web3, uport } from '../../utils/connector.js';
import Equipments from '../Equipments';
import './newprogram.css';
const MNID = require('mnid');

Number.prototype.format = function(n, x) {
    if(this == 0){
        return;
    }
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

const programType = [
  {
    text: 'Subsidy',
    value: 'subsidy'
  },
  {
    text: 'Other',
    value: 'other'
  }
]

class NewProgram extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            description: "",
            units: "",
            subsidyAmount: "",
            fromAdress: "",
            programType: "subsidy",
            pricePerUnit: 1200,
            landCoverage: 300
        }
    }

    handleOpen = (e) => {
        this.props.openModal();
    }

    handleClose = (e) => {
        this.props.closeModal();
    }
    selectEquipment = () => {
        this.props.openModal();
    }

    createProgram = (values) => {
       const { history } = this.props;
       let selectedEquipment = this.props.selectedEquipment;
        let valuesToSend = {
            name: this.state.name,
            units: Number(this.state.units),
            subsidyAmount: Number(this.state.subsidyAmount),
            description: this.state.description,
            selectedEquipment: selectedEquipment
        }
        this.props.createProgram(valuesToSend, () => {
            history.push("/governments");
        });
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    onDescriptionChange = (event) => {
        this.setState({ description: event.target.value });
    }
    onUnitsChange = (event) => {
        this.setState({ units: event.target.value });
    }

    onSubsidyAmountChange = (event) => {
        this.setState({ subsidyAmount: event.target.value });
    }
    onProgramTypeChange = (event, data) => {
        this.setState({ programType: data.value });
    }   

    getTotalToPay(){
        let units = this.state.units;
        let subsidyAmount = this.state.subsidyAmount;
        if(!units || !this.props.selectedEquipment)
            return;
        let { price } = this.props.selectedEquipment;
        if(subsidyAmount)
            return (subsidyAmount * units).format();
        return (units * price).format();
    }
    componentWillMount(){
        this.props.resetSelectedEquipment();
    }
    render() {        
        return (
          <div>
            {this.props.showLoader && <Dimmer inverted active>
                <Loader>
                <Header>Program is being created</Header>
              </Loader>
            </Dimmer>}
            {!this.props.showProgramCreatedView &&
            <Grid>                        
              <Grid.Row>
                <Grid.Column><Header as="h1">New Program</Header>  </Grid.Column>
              </Grid.Row>
              <Grid.Column width={6}>

                <Segment>
                  <Header as ="h3">Program Information</Header>
                  <Form>
                    <Form.Input label='Name' placeholder="Name of the program" onChange={this.onNameChange} value={this.state.name} />
                    <Form.TextArea label='Description' placeholder="Description about the program" onChange={this.onDescriptionChange} value={this.state.description} />
                    <Form.Select label='Type' options={programType} value={this.state.programType} onChange={this.onProgramTypeChange} />
                   
                     <Modal
                      trigger={<Form.Button fluid color='grey' onClick={this.selectEquipment}>Select Equipment</Form.Button>}
                      open={this.props.modalOpen}
                      onClose={this.handleClose}>
                      <Modal.Header>Select an Equipment</Modal.Header>
                      <Modal.Content>
                        <Modal.Description>
                          <Equipments />
                            </Modal.Description>
                      </Modal.Content>
                    </Modal>
                    {this.props.selectedEquipment &&
                    <div>                        
                    <Form.Input label='Units' placeholder="How many units?" onChange={this.onUnitsChange} value={this.state.units} />
                    <Form.Input label='Amount to subsidy per unit' placeholder="The amount to subsidy" onChange={this.onSubsidyAmountChange} value={this.state.subsidyAmount} />                                       
                    </div>
                    }
                  </Form>
                </Segment>
              </Grid.Column>

              <Grid.Column width={10}>
                {this.props.selectedEquipment &&
                <Segment>
                  <Header as ="h3">Equipment Selection</Header>
                  <Image src={this.props.selectedEquipment.imageUrl} />
                  <Header as='h3'>{this.props.selectedEquipment.title}</Header>
                  <Grid>
                    <Grid.Column width={8}>
                      <Header as="h4">Details</Header>
                        <List as="ol">
                          {this.props.selectedEquipment.details.map && this.props.selectedEquipment.details.map((item, index) => {
                            return <List.Item key={index} as='li' value='-'>{item}</List.Item>
                            })}
                        </List>
                        <Header as='h4'>Expected land coverage</Header>
                         <p> ~ { (this.state.units * this.props.selectedEquipment.landCoverage).format() || this.props.selectedEquipment.landCoverage } hectares of land </p>
                      </Grid.Column>

                      <Grid.Column width={8}>

                        <Header as='h4'>Cost per unit</Header>
                        <p className="price-per-unit">$ {this.props.selectedEquipment.price}</p>
                        <Header as='h4'>Total cost</Header>
                        <p className="price-per-unit">{this.state.units && <span>$</span>}{ this.getTotalToPay() || "--"}</p>
                      </Grid.Column>
                    </Grid>

                  <Button
                    fluid
                    className="NewProgramBtn"
                    color='green'
                    onClick={this.createProgram}>
                    Create Program
                  </Button>
                </Segment>
                }
              </Grid.Column>  </Grid>
             }
              {this.props.showProgramCreatedView &&
               <Grid> 
              <Grid.Column width={16} className="program-created">
                  <Segment>
                      <h1>The program has being created successfully</h1>
                  </Segment>
              </Grid.Column>    </Grid>
              }
        
          </div>
        )
    }
}

function mapStateProps(state) {
    return {
        selectedEquipment: state.equipmentsReducer.selectedEquipment,
        modalOpen: state.equipmentsReducer.modalOpen,
        showLoader: state.equipmentsReducer.showLoader,
        equipment: state.equipmentsReducer.equipment,
        showProgramCreatedView: state.equipmentsReducer.showProgramCreatedView
    }
}

NewProgram = withRouter(NewProgram);

export default connect(mapStateProps, actions)(NewProgram);
