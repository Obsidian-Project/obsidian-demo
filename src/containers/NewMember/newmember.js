import React from 'react';
import { Container, Header, Grid, Segment, Image, Form, Button, Dimmer, Loader, Divider, Input } from 'semantic-ui-react';
import { uport, web3 } from '../../utils/connector.js';
//import { waitForMined } from '../../utils';

import './newmember.css';
import GoogleMapReact from 'google-map-react';
import { CreateObsidianContractObj } from '../../utils/smartcontract.js';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import { connect, } from 'react-redux';

const MNID = require('mnid');
const K_WIDTH = 20;
const K_HEIGHT = 20;
const GOOGLE_API_KEY = "AIzaSyC--qp92_TXVu0XFzGe9yS67km_ZpV8yBM";
const ObsidianContract = CreateObsidianContractObj(web3);

const MyGreatPlace = ({ text }) => (
    <div style={greatPlaceStyle}>
    </div>
)

const CustomInput = (props) => (
    <Input
        onChange={props.onChange}
        label={{ basic: true, content: 'Hectares' }}
        labelPosition='right'
        value={props.value}
        placeholder='Size of land in hectares'
    />
)


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

const getMemberInfo = (address, callback) => {
    ObsidianContract.members(address, (error, result) => {
        if (!result) {
            callback();
            return;
        }
        ObsidianContract.membersInfo(address, (error, result) => {
            let latitude = result[0];
            let longitude = result[1];
            let sizeOfLand = result[2].toNumber();
            callback({ latitude, longitude, sizeOfLand });
        });

    });
}

const addMember = (memberAddress, latitude, longitude, sizeOfLand, callback) => {
    ObsidianContract.addMember(memberAddress, `${latitude.toFixed(4)}`, `${longitude.toFixed(4)}`, sizeOfLand, {
        gas: 2000000,
        from: memberAddress
    }, (error, txHash) => {
        if (error) { throw error }
        waitForMined(txHash, { blockNumber: null },
            function pendingCB() {
                // Signal to the user you're still waiting
                // for a block confirmation
            },
            function successCB(data) {
                callback();
            }
        )
    })
}

const greatPlaceStyle = {
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,

    border: '0 solid #f44336',
    borderRadius: K_HEIGHT,
    backgroundColor: '#21ba45',
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
};

class NewMember extends React.Component {
    static defaultProps = {
        center: { lat: 18.248916, lng: -96.133804 },
        zoom: 11
    };
    onMapClick = ({ x, y, lat, lng, event }) => {
        this.setState({
            longitude: lng,
            latitude: lat
        });
    }

    constructor() {
        super();
        this.state = {
            name: undefined,
            nationalId: undefined,
            imageUrl: undefined,
            isVerified: false,
            loading: false,
            userAddress: undefined,
            hideLandForm: true,
            loggedWithUport: false,
            latitude: 0,
            longitude: 0,
            userRegistered: false
        }
    }
    onNationalIdChange = (event) => {
        this.setState({ nationalId: event.target.value });
    }

    onSizeOfLandChange = (event) => {
        this.setState({ sizeOfLand: event.target.value });
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
                    getMemberInfo(userAddress, (state) => {
                        this.setState({
                            name: credentials.name,
                            imageUrl: credentials.avatar.uri,
                            userAddress: credentials.address,
                            disableButton: false,
                            isVerified: isVerified,
                            loggedWithUport: true,
                            hideLandForm: hideLandForm,
                            nationalId: nationalId,
                            latitude: state ? state.latitude : this.state.latitude,
                            longitude: state ? state.longitude : this.state.longitude,
                            sizeOfLand: state ? state.sizeOfLand : this.state.sizeOfLand,
                            userRegistered: state ? true : false
                        })
                    });
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
                this.setState({
                    loading: false,
                    isVerified: true,
                    hideLandForm: false
                });

            });
        })
    }

    registerUser = () => {
        const { history } = this.props;
        let userAddress;
        if (this.state.userAddress) { //this shouldn't crash because they need to be logged in, but for testing
            let addressPayload = MNID.decode(this.state.userAddress);
            userAddress = addressPayload.address;
        }
        let latitude = this.state.latitude;
        let longitude = this.state.longitude;

        let sizeOfLand = Number(this.state.sizeOfLand);
        console.log({
            latitude,
            longitude,
            userAddress,
            sizeOfLand
        });
        this.setState({
            loading: true
        }, () => {
            addMember(userAddress, latitude, longitude, sizeOfLand, () => {
                let isUpdate = this.state.userRegistered;
                this.setState({
                    loading: false,
                    userRegistered: true
                }, () => {
                    this.props.displayNotification(isUpdate ? "Changes saved successfully": "User has being registered correctly");
                });
            });
        })
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        return (
          <div className="NewMemberSection">
                {this.state.loading && <Dimmer inverted active>
                    <Loader />
                </Dimmer>}

                <Grid columns={16}>
                    <Grid.Column width={8}>
                      <Segment>
                        <Header as="h2">Personal Information</Header>
                        <Image centered src={this.state.imageUrl || 'http://via.placeholder.com/300x300'} size='medium' circular />
                        <Form>
                            <Form.Input label='Name' placeholder={this.state.name || "Name"} readOnly />
                            <Form.Input label='National Id' placeholder={this.state.nationalId || 'National Id'}
                                value={this.state.isVerified ? "" : this.state.nationalId || ""}
                                onChange={this.onNationalIdChange}
                                readOnly={this.state.isVerified} />
                            {!this.state.isVerified &&
                                <Button fluid disabled={!this.state.loggedWithUport} className="big" color='green'
                                    onClick={this.attestUser}>Verify</Button>
                            }
                        </Form>
                        </Segment>
                      </Grid.Column>


                    {/* {this.state.isVerified && */}
                        <Grid.Column width={8}>
                          <Segment>
                            <Header as="h2">Land Information</Header>
                            <Form>
                                <Form.Input label='Size' onChange={this.onSizeOfLandChange} value={this.state.sizeOfLand || ""} control={CustomInput}></Form.Input>
                                <Form.Field>
                                    <label>Location</label>
                                </Form.Field>
                            </Form>
                            <div className="map-area">
                                <GoogleMapReact
                                    defaultCenter={this.props.center}
                                    defaultZoom={this.props.zoom}
                                    bootstrapURLKeys={{
                                        key: GOOGLE_API_KEY,
                                        language: 'en'
                                    }}
                                    onClick={this.onMapClick}>
                                    <MyGreatPlace lat={this.state.latitude} lng={this.state.longitude} text={'A'} />
                                </GoogleMapReact>
                            </div>
                            <Button fluid color='green'
                                onClick={this.registerUser}>{this.state.userRegistered ? "Update" : "Register"}</Button>
                          </Segment>
                        </Grid.Column>
                    {/* } */}
                </Grid>
          </div>
        )
    }

}

export default connect(null, actions)(withRouter(NewMember));
