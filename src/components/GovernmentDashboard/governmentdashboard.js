
import React from 'react';
import styles from './governmentdashboard.css';
import { Link } from 'react-router-dom';
import { Header,Button, Grid, Segment, Statistic } from 'semantic-ui-react';
import PieChart from 'react-minimal-pie-chart';
import GoogleMapReact from 'google-map-react';

const MNID = require('mnid');
const K_WIDTH = 20;
const K_HEIGHT = 20;
const GOOGLE_API_KEY = "AIzaSyC--qp92_TXVu0XFzGe9yS67km_ZpV8yBM";

const MyGreatPlace = ({ text }) => (
    <div style={greatPlaceStyle}>
    </div>
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

class GovernmentDashboard extends React.Component {
  static defaultProps = {
      center: { lat: 18.248916, lng: -96.133804 },
      zoom: 11
  };
    constructor() {
        super();
    }

    render() {
        return(
          <span>
              <Grid width={15}>
                <Grid.Row>
                  <Grid.Column width={5}>
                    <Segment textAlign='center'>
                      <Statistic>
                        <Statistic.Value>5550</Statistic.Value>
                        <Statistic.Label> delivered subsidies</Statistic.Label>
                      </Statistic>
                    </Segment>
                  </Grid.Column>

                  <Grid.Column width={5}>
                    <Segment textAlign='center'>
                      <Statistic>
                        <Statistic.Value>3213</Statistic.Value>
                        <Statistic.Label> beneficiaries</Statistic.Label>
                      </Statistic>
                    </Segment>
                  </Grid.Column>

                  <Grid.Column width={5}>
                    <Segment textAlign='center'>
                      <Statistic>
                        <Statistic.Value>4020</Statistic.Value>
                        <Statistic.Label> Programs</Statistic.Label>
                      </Statistic>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={5}>
                    <Segment>
                      <Header>Land Coverage</Header>
                      <PieChart
                        lineWidth={30}
                        data={[
                          { value: 10, key: 1, color: '#00b5ad' },
                          { value: 15, key: 2, color: '#007e79' },
                          { value: 20, key: 3, color: '#4ccbc5' },
                        ]}
                      />
                    </Segment>
                  </Grid.Column>

                  <Grid.Column width={5}>
                    <Segment>
                      <Header>Distribution per type</Header>
                      <PieChart
                        lineWidth={30}
                        data={[
                          { value: 10, key: 1, color: '#00b5ad' },
                          { value: 15, key: 2, color: '#007e79' },
                          { value: 20, key: 3, color: '#4ccbc5' },
                        ]}
                      />
                    </Segment>
                  </Grid.Column>

                  <Grid.Column width={5}>
                    <Segment>
                      <Header>Distribution per farmer type</Header>
                      <PieChart
                        lineWidth={30}
                        data={[
                          { value: 10, key: 1, color: '#00b5ad' },
                          { value: 15, key: 2, color: '#007e79' },
                          { value: 20, key: 3, color: '#4ccbc5' },
                        ]}
                      />
                    </Segment>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column width={15}>
                    <Segment>
                      <Header>Land Coverage</Header>
                      <div className="map-area">
                        <GoogleMapReact
                            defaultCenter={this.props.center}
                            defaultZoom={3}
                            bootstrapURLKeys={{
                              key: GOOGLE_API_KEY,
                              language: 'en'
                              }}
                            onClick={this.onMapClick}>
                            <MyGreatPlace lat="0" lng="0" text={'A'} />
                        </GoogleMapReact>
                      </div>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>

              </Grid>
          </span>
      )
    }
}

export default GovernmentDashboard;
