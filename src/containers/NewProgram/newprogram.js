import React from 'react';
import { Container, Header, Grid, Segment, Image, Form, Button, Dimmer, Loader, Divider, Input } from 'semantic-ui-react';
import { CreateObsidianContractObj } from '../../utils/smartcontract.js';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import { connect, } from 'react-redux';
import { web3 } from '../../utils/connector.js';
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

    render(){
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
                            <Button className="big" color='gray'
                                    onClick={this.selectEquipment}>Select Equipment</Button>  
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={1}>
                    </Grid.Column>
                    <Grid.Column width={9}>
                            <Header>Equipment Selection</Header>                           
                            <div className="equipment-selection-area">
                               <EquipmentSelection/>
                            </div>
                            <Button className="big" color='green'
                                    onClick={this.createProgram}>Create Program</Button>   
                        </Grid.Column>
                </Grid>
            </Segment>
        )
    }
}

export default NewProgram;

