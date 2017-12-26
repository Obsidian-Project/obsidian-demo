import React from 'react';
import { Container, Header, Grid, Segment, Image, Form, Button, Dimmer, Loader, Divider, Input } from 'semantic-ui-react';
import { uport, web3 } from '../../utils/connector.js';
import './newmember.css';
import GoogleMapReact from 'google-map-react';
const MNID = require('mnid');
const K_WIDTH = 20;
const K_HEIGHT = 20;
const GOOGLE_API_KEY = "AIzaSyC--qp92_TXVu0XFzGe9yS67km_ZpV8yBM";

const MyGreatPlace = ({ text }) => (
    <div style={greatPlaceStyle}>
    </div>
)

const CustomInput = () => (    
    <Input
      label={{ basic: true, content: 'Hectares' }}
      labelPosition='right'
      placeholder='Size of land in hectares'
    />
  )

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

class Members extends React.Component {
    static defaultProps = {
        center: { lat: 18.248916, lng: -96.133804 },
        zoom: 11
    };
    _onClick = ({ x, y, lat, lng, event }) => {
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
            loggedWithUport: false
        }
    }
    //Process in here
    //when I start, I launch uport and the user is signed in, I verify identity and the status change to verified
    //then I can capture acreage and land location
    //I click register, store address, location and acreage in smart contract and I'm done !!
    onNationalIdChange = (event) => {
        this.setState({ nationalId: event.target.value });
    }

    onSizeOfLandChange  = (event) => {
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
                // let addressPayload = MNID.decode(credentials.address);
                // let userAddress = addressPayload.address;
                if (hasValidatedHisNationalId) {
                    isVerified = true;
                    hideLandForm = false;
                }

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
                //si no, entonces, poner vista para que sea atesteado, de lo contrario, vista para capturar datos
                //tambien tengo que checar en Obsidian contract si ha sido registrado antes                       
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

    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <Segment>
                {this.state.loading && <Dimmer inverted active>
                    <Loader />
                </Dimmer>}
                <Grid columns={2}>
                    <Grid.Column width={8}>
                        <Header>Personal Information</Header>
                        <Image centered src={this.state.imageUrl || 'http://via.placeholder.com/300x300'} size='medium' circular />
                        <Form>
                            <Form.Input label='Name' placeholder={this.state.name || "Name"} readOnly />
                            <Form.Input label='National Id' placeholder={this.state.nationalId || 'National Id'} 
                                value={this.state.isVerified ? "" : this.state.nationalId || ""} 
                                onChange={this.onNationalIdChange} 
                                readOnly={this.state.isVerified} />
                            {!this.state.isVerified &&
                                <Button disabled={!this.state.loggedWithUport} className="big" color='green' 
                                    onClick={this.attestUser}>Verify</Button>
                            }
                        </Form>
                    </Grid.Column>
                    {!this.state.isVerified && //remove ! for test
                        <Grid.Column width={8}>
                            <Header>Land Information</Header>
                            <Form>
                                {/* <Form.Input label='Size' placeholder="Hectares" value={this.state.sizeOfLand || ""} 
                                    onChange={this.onSizeOfLandChange}   labelPosition='right' />   */}
                                    <Form.Input label='Size' value={this.state.sizeOfLand || ""} control={CustomInput}></Form.Input>
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
                                    onClick={this._onClick}>
                                    <MyGreatPlace lat={this.state.latitude} lng={this.state.longitude} text={'A'} />
                                </GoogleMapReact>
                            </div>
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