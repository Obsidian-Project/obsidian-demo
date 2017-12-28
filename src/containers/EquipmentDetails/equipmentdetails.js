import React from 'react';
import Equipments from '../Equipments';
import styles from './equipmentdetails.css';
import { Container, Header, Grid, Segment, Image, Form, Button, Dimmer, Loader, Divider, Input, Modal, Item, List } from 'semantic-ui-react';
import * as actions from '../../actions';
import { connect, } from 'react-redux';

class EquipmentDetails extends React.Component {
    constructor() {
        super();
    }

    render(){
        return (
          <span>
            <Segment>
              <Grid>
                <Grid.Column width={8}>
                  <img className="equipmentdetailsImg" src="https://www.deere.com/assets/images/region-4/products/tractors/4-wheel-drive-tractors/9r-9rt-series/9420r/9420r_studio_r4e003069_small_0dfb671e5a9eb33fb0093ff539d06dbc26dba017.jpg" alt=""/>

                </Grid.Column>

                <Grid.Column width={8}>
                  <Header as="h2" className="equipmentdetailsHeader"> 5067E</Header>
                  <span>tractor</span>

                  <List as ="ul">
                    <List.Item as="li">
                      John Deere PowerTech™ 13.5L PSS
                    </List.Item>
                    <List.Item as="li">
                      New and improved e18™ PowerShift Transmission
                    </List.Item>
                    <List.Item as="li">
                      New CommandView™ III cab
                    </List.Item>
                  </List>

                  <p className="equipmentdetailsp">
                    Assured reliability. Minimal maintenance. That’s John Deere quality

                    All John Deere agricultural machinery is built to the highest possible standards. Our 6M Series is a prime example of this philosophy, which is why all major components – engines, transmissions and full frame chassis – are designed, engineered, manufactured and tested by John Deere. And they are all designed to work perfectly together.
                  </p>
                  <Button fluid color="green">Transfer</Button>
                </Grid.Column>
              </Grid>
            </Segment>
          </span>
        )
    }
}

export default EquipmentDetails;
