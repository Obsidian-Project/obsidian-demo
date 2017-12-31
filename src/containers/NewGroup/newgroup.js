import React from 'react';
import { Container, Header, Grid, Segment, Image, Form, Button, Dimmer, Loader, Divider, Input } from 'semantic-ui-react';
import { uport, web3 } from '../../utils/connector.js';
import './newgroup.css';

//import { CreateObsidianContractObj } from '../../utils/smartcontract.js';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import { connect, } from 'react-redux';

const MNID = require('mnid');
//const ObsidianContract = CreateObsidianContractObj(web3);

// const waitForMined = (txHash, response, pendingCB, successCB) => {
//     if (response.blockNumber) {
//         successCB()
//     } else {
//         pendingCB()
//         pollingLoop(txHash, response, pendingCB, successCB)
//     }
// }

// const pollingLoop = (txHash, response, pendingCB, successCB) => {
//     setTimeout(function () {
//         web3.eth.getTransaction(txHash, (error, response) => {
//             if (error) { throw error }
//             if (response === null) {
//                 response = { blockNumber: null }
//             }
//             waitForMined(txHash, response, pendingCB, successCB)
//         })
//     }, 1000);
// }

// const addGroup = (membersAddress, callback) => {
//     ObsidianContract.addMember(membersAddress, {
//         gas: 2000000,
//         from: membersAddress[0]//quien la envia? Podria ser el login de uPort o un default address que yo puedo stipular
//     }, (error, txHash) => {
//         if (error) { throw error }
//         waitForMined(txHash, { blockNumber: null },
//             function pendingCB() {
//                 // Signal to the user you're still waiting
//                 // for a block confirmation
//             },
//             function successCB(data) {
//                 callback();
//             }
//         )
//     })
// }

const GroupMember = (props) =>{
  return  <Grid.Column width={5}>
    <Segment>
      <Header as="h2">Personal Information</Header>
      <Image centered src= 'http://www.rmddesign.com/wp-content/uploads/avatar-1.png' size='small' circular />
      <Form>
        <Form.Input label='Name' placeholder="Name" readOnly />
        <Form.Input
          label='National Id' placeholder='National Id'
        />
        <Button fluid color='green'>
        Verify
        </Button>
      </Form>
    </Segment>
  </Grid.Column>
}

class NewGroup extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.requestCredentials();
    }

    requestCredentials = () => {
        uport.requestCredentials({
            requested: ['name', 'phone', 'country', 'avatar'],
            verified: ["NationalIdVerified"],
            notifications: true
        })
            .then((credentials) => {
                let nationalId = credentials.verified.length > 0 ? credentials.verified[0].claim.NationalIdVerified : undefined;
                let hasValidatedHisNationalId = nationalId !== undefined;
                let isVerified = false;
                let hideLandForm = true;
                if (hasValidatedHisNationalId) {
                    isVerified = true;
                    hideLandForm = false;
                }
                if (isVerified) {
                    let addressPayload = MNID.decode(credentials.address);
                    let userAddress = addressPayload.address;
                    //maybe show the size of land

                    // getMemberInfo(userAddress, (state) => {
                    //     this.setState({
                    //         name: credentials.name,
                    //         imageUrl: credentials.avatar.uri,
                    //         userAddress: credentials.address,
                    //         disableButton: false,
                    //         isVerified: isVerified,
                    //         loggedWithUport: true,
                    //         hideLandForm: hideLandForm,
                    //         nationalId: nationalId,
                    //         latitude: state ? state.latitude : this.state.latitude,
                    //         longitude: state ? state.longitude : this.state.longitude,
                    //         sizeOfLand: state ? state.sizeOfLand : this.state.sizeOfLand,
                    //         userRegistered: state ? true : false
                    //     })
                    // });
                } else {
                    this.setState({
                        name: credentials.name,
                        imageUrl: credentials.avatar.uri,
                        userAddress: credentials.address,
                        disableButton: false,
                        isVerified: isVerified,
                        loggedWithUport: true,
                        hideLandForm: hideLandForm,
                        nationalId: nationalId
                    })
                }
            });
    }

    registerUser = () => {

    }

    render() {
        return (
          <div className="NewGroupSection">
            <Header as="h1">New Group</Header>  
            <Grid columns={15}>
              <GroupMember/>
              <GroupMember/>
              <GroupMember/>
            </Grid>
          </div>
        )
    }
}

export default connect(null, actions)(withRouter(NewGroup));
