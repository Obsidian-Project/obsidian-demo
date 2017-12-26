import React from 'react';
import { Container, Header, Grid, Segment, Image, Form, Button } from 'semantic-ui-react';
import { uport, web3 } from '../../utils/connector.js';
import './newmember.css';
const MNID = require('mnid');

class Members extends React.Component {

    constructor(){
        super();
        this.state = {
            name: undefined,
            nationalId: undefined,
            imageUrl: undefined,
            disableButton: true,
            isVerified: false,
            loading: false,
            userAddress: undefined                                    
        }
    }
    //Process in here
    //when I start, I launch uport and the user is signed in, I verify identity and the status change to verified
    //then I can capture acreage and land location
    //I click register, store address, location and acreage in smart contract and I'm done !!
    onNationalIdChange = (event) => {
        this.setState({ nationalId: event.target.value });
    }
    
    componentWillMount(){      
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

            //si no, entonces, poner vista para que sea atesteado, de lo contrario, vista para capturar datos
            //tambien tengo que checar en Obsidian contract si ha sido registrado antes
            let addressPayload = MNID.decode(credentials.address);
            let subject = addressPayload.address;
        });
    }

    attestUser = () => {        
        this.setState({
            loading: true
        }, () => {
            uport.attestCredentials({
                sub: this.state.userAddress,
                claim: {
                    "NationalIdVerified": this.state.nationalId
                },
                exp: new Date().getTime() + 365 * 24 * 60 * 60 * 1000, // 365 days from now
            }).then(res => {
                console.log(this.state.name);
               debugger;
               //see what res has

            }).then(tx => {
                //todo check tx 
                debugger;
              })
              .catch(err => {
                debugger;
                console.log(err)
              })
        })
    }

    render() {
        return (
            <Segment>
                
                    <Grid columns={2}>
                        <Grid.Column width={8}>
                        <Header>Personal Information</Header>
                            <Image centered src={this.state.imageUrl || 'http://via.placeholder.com/300x300'} size='medium' circular />
                            <Form>
                                <Form.Input label='Name' placeholder={this.state.name || "Name"} readOnly />
                                <Form.Input label='National Id' placeholder='National Id' value={this.state.nationalId} onChange={this.onNationalIdChange} />
                                <Button disabled={this.state.disableButton} className="big" color='green' onClick={this.attestUser}>Verify</Button>
                            </Form>
                        </Grid.Column>
                        {this.state.isVerified &&
                            <Grid.Column width={8}>
                            <Header>Land Information</Header>
                                <Image centered src={this.state.imageUrl || 'http://via.placeholder.com/300x300'} size='small' circular />
                                <Form>
                                    <Form.Input label='Name' placeholder={this.state.name || "Name"} readOnly />
                                    <Form.Input label='National Id' placeholder='National Id' value={this.state.nationalId} onChange={this.nationalIChange} />
                                    <Button disabled={this.state.disableButton} className="big" color='green' onClick={this.attestUser}>Verify</Button>
                                </Form>
                            </Grid.Column>
                        }
                    </Grid>
            </Segment>
        )
    }

}

export default Members;

//user properties

//name
//national id
//status