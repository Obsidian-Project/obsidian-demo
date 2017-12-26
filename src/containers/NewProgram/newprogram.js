import React from 'react';
import { Container, Header, Grid, Segment, Image, Form, Button, Dimmer, Loader, Divider, Input, Modal, Item, List } from 'semantic-ui-react';
import { CreateObsidianContractObj } from '../../utils/smartcontract.js';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import { connect, } from 'react-redux';
import { web3 } from '../../utils/connector.js';
import Equipments from '../Equipments';
import './newprogram.css';

const waitForMined = (txHash, response, pendingCB, successCB) => {
    if (response.blockNumber) {
        successCB()
    } else {
        pendingCB()
        pollingLoop(txHash, response, pendingCB, successCB)
    }
}

const pollingLoop = (txHash, response, pendingCB, successCB) => {
    setTimeout(function () {
        web3.eth.getTransaction(txHash, (error, response) => {
            if (error) { throw error }
            if (response === null) {
                response = { blockNumber: null }
            }
            waitForMined(txHash, response, pendingCB, successCB)
        })
    }, 1000);
}

const addProgram = (membersAddress, callback) => {
    //NEED TO MAP
    // ObsidianContract.addMember(membersAddress, {
    //     gas: 2000000,
    //     from: membersAddress[0]//quien la envia? Podria ser el login de uPort o un default address que yo puedo stipular
    // }, (error, txHash) => {
    //     if (error) { throw error }
    //     waitForMined(txHash, { blockNumber: null },
    //         function pendingCB() {
    //             // Signal to the user you're still waiting
    //             // for a block confirmation          
    //         },
    //         function successCB(data) {
    //             callback();
    //         }
    //     )
    // })
}

const EquipmentSelection = () => {
    return <h1>Program Selection</h1>;
}
class NewProgram extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false
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
    render() {
        return (
            <Segment>
                {this.state.loading && <Dimmer inverted active>
                    <Loader />
                </Dimmer>}

                <Grid columns={3}>

                    <Grid.Column width={6}>
                        <Header>Program Information</Header>
                        <Form>
                            <Form.Input label='Name' placeholder="Name of the program" />
                            <Form.TextArea label='Description' placeholder="Description about the program" />
                            <Form.Input label='Units' placeholder="How many units?" />
                            <Form.Input label='Percentage to subsidy per member' placeholder="The amount to subsidy" />

                            <Modal
                                trigger={<Button className="big" color='grey' onClick={this.selectEquipment}>Select Equipment</Button>}
                                open={this.props.modalOpen}
                                onClose={this.handleClose}>
                                <Modal.Header>Select an Equipment</Modal.Header>
                                <Modal.Content>
                                    <Modal.Description>
                                        <Equipments />
                                    </Modal.Description>
                                </Modal.Content>
                            </Modal>

                        </Form>
                    </Grid.Column>
                    <Grid.Column width={1}>
                    </Grid.Column>
                    <Grid.Column width={9}>
                        {this.props.selectedEquipment && <div>
                        <Header>Equipment Selection</Header>
                            <Item.Group>
                                <Item>
                                    <Item.Image className="custom" size="large" src={this.props.selectedEquipment.imageUrl} />
                                    <Item.Content>
                                        <Item.Header as='h1'>{this.props.selectedEquipment.title}</Item.Header>
                                        <Item.Meta>Details</Item.Meta>
                                        <Item.Description>
                                            <List as="ol">
                                                {this.props.selectedEquipment.details.map && this.props.selectedEquipment.details.map((item, index) => {
                                                    return <List.Item key={index} as='li' value='-'>{item}</List.Item>
                                                })}
                                            </List>
                                        </Item.Description>
                                        <Item.Meta as='h3'>Recommendations</Item.Meta>
                                        <Item.Description>
                                            Recommended for groups of 4
                                        </Item.Description>
                                        <Item.Meta as='h3'>Expected land coverage</Item.Meta>
                                        <Item.Description>
                                            ~ 3000 hectares of land
                                        </Item.Description>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                            <Button className="big" color='green'
                                onClick={this.createProgram}>Create Program</Button></div>
                        }
                    </Grid.Column>
                </Grid>
            </Segment>
        )
    }
}

function mapStateProps(state) {
    return {
        selectedEquipment: state.equipmentsReducer.selectedEquipment,
        modalOpen: state.equipmentsReducer.modalOpen
    }
}

export default connect(mapStateProps, actions)(NewProgram);

