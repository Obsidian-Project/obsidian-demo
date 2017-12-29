
import React from 'react';
import styles from './governmentdashboard.css';
import { Link } from 'react-router-dom';
import { Header,Button, Grid, Segment, Statistic } from 'semantic-ui-react';
import { LineChart, Line , ResponsiveContainer, CartesianGrid, BarChart, XAxis, YAxis, Tooltip, Legend, Bar,PieChart, Pie} from 'recharts';
import GoogleMapReact from 'google-map-react';
import Governments from '../../containers/Governments'

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

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
                  {name: 'Group E', value: 278}, {name: 'Group F', value: 189}]

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
              <Header as="h1">Dashboard</Header>
                <Grid width={15}>
                  <Grid.Row>
                    <Grid.Column width={10}>
                      <Segment>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={data}>
                            <Line type="monotone" dataKey="uv" stroke="#00b5ad" />
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend />
                          </LineChart>
                        </ResponsiveContainer>
                      </Segment>
                    </Grid.Column>

                    <Grid.Column width={5}>
                      <Segment textAlign='center'>
                        <Statistic>
                          <Statistic.Value>4020</Statistic.Value>
                          <Statistic.Label> Programs</Statistic.Label>
                        </Statistic>
                      </Segment>
                      <Segment textAlign='center'>
                        <Statistic>
                          <Statistic.Value>4020</Statistic.Value>
                          <Statistic.Label> Programs</Statistic.Label>
                        </Statistic>
                      </Segment>
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
                        <Header textAlign= "center" as = "h4">Distribution per type</Header>
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie isAnimationActive={false} data={data01} outerRadius={80} fill="#00b5ad" label/>
                            <Tooltip/>
                           </PieChart>
                         </ResponsiveContainer>
                      </Segment>
                    </Grid.Column>

                    <Grid.Column width={10}>
                      <Segment>
                        <Header textAlign= "center" as = "h4">Distribution per farmer type</Header>
                        <ResponsiveContainer  width="100%" height={300}>
                        <BarChart data={data}
                              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                         <XAxis dataKey="name"/>
                         <YAxis/>
                         <CartesianGrid strokeDasharray="3 3"/>
                         <Tooltip/>
                         <Legend/>
                         <Bar dataKey="pv" fill="#00b5ad" />
                         <Bar dataKey="uv" fill="#007e79" />
                        </BarChart>
                        </ResponsiveContainer>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column width={15}>
                      <Segment>
                        <Header as = "h4">Land Coverage</Header>
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
