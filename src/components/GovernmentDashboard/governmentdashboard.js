import React from 'react';
import styles from './governmentdashboard.css';
import { Link } from 'react-router-dom';
import { Header,Button, Grid, Segment, Statistic, List , Table} from 'semantic-ui-react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import PieChart from 'react-minimal-pie-chart';
import Governments from '../../containers/Governments'

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

class GovernmentDashboard extends React.Component {

    constructor() {
        super();
    }

    render() {
        return(
            <span>
                <Grid columns={3}>
                  <Grid.Row>
                    <Header as="h1">Dashboard</Header>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column >
                      <Segment>
                        <Header as="h3">Summary</Header>
                        <Grid width={15}>
                          <Grid.Column textAlign = "center" width={5}>
                            <h5 className="dashHeader">Programs</h5>
                            <p>120</p>
                          </Grid.Column>

                          <Grid.Column textAlign = "center" width={5}>
                            <h5 className="dashHeader">Beneficiaries</h5>
                            <p>120</p>
                          </Grid.Column>

                          <Grid.Column textAlign = "center" width={5}>
                            <h5 className="dashHeader">Subsidies</h5>
                            <p>120</p>
                          </Grid.Column>
                        </Grid>
                      </Segment>

                      <Segment>
                        <Header as="h3">Distributions of units per type</Header>
                        <div className="chart">
                          <List horizontal size="mini">
                            <List.Item>
                                <List.Content>
                                    <List.Header className="one">Agricultural precision </List.Header>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <List.Header className="two">Harvesters</List.Header>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <List.Header className="three">Tractors</List.Header>
                                </List.Content>
                            </List.Item>
                        </List>
                        </div>

                          <PieChart
                            lineWidth={30}
                            className="PieChart"
                            data={[
                              { value: 10, key: 1, color: '#00b5ad' },
                              { value: 15, key: 2, color: '#7fdad6' },
                              { value: 20, key: 3, color: '#00908a' },
                              ]}
                          />
                      </Segment>
                    </Grid.Column>

                    <Grid.Column >
                      <Segment>
                        <Header as="h3">Balance</Header>
                        <Grid width={16}>
                          <Grid.Column textAlign = "center" width={8}>
                            <h5 className="dashHeader">Total Spent</h5>
                            <p>120</p>
                          </Grid.Column>

                          <Grid.Column textAlign = "center" width={8}>
                            <h5 className="dashHeader">This Month</h5>
                            <p>120</p>
                          </Grid.Column>
                        </Grid>
                      </Segment>

                      <Segment>
                        <Header as="h3">Total Land Coverage</Header>
                        <div className="chart">
                          <List horizontal size="mini">
                            <List.Item>
                                <List.Content>
                                    <List.Header className="one">Mechanized</List.Header>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <List.Header className="two">Not Mechanized</List.Header>
                                </List.Content>
                            </List.Item>
                        </List>
                        </div>

                          <PieChart
                            // lineWidth={30}
                            className="PieChart"
                            data={[
                              { value: 10, key: 1, color: '#00b5ad' },
                              { value: 15, key: 2, color: '#7fdad6' },
                              ]}
                          />
                      </Segment>
                    </Grid.Column>

                    <Grid.Column >
                      <Segment className="tableContainer">
                        <Header as="h3">Programs</Header>
                        <Table className="table" textAlign="center" size="small">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Program Name</Table.HeaderCell>
                                    <Table.HeaderCell>Type</Table.HeaderCell>
                                    <Table.HeaderCell>Total Spent</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                              <Table.Row>
                                  <Table.Cell>1</Table.Cell>
                                  <Table.Cell>2</Table.Cell>
                                  <Table.Cell>3</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column width={16}>
                      <Segment>
                        <Header as="h3">Loans Made</Header>
                        <ResponsiveContainer width = "100%" height={300}>
                          <LineChart data={data}
                                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                           <XAxis dataKey="name"/>
                           <YAxis/>
                           <CartesianGrid strokeDasharray="3 3"/>
                           <Tooltip/>
                           <Legend />
                           <Line type="monotone" dataKey="pv" stroke="#00b5ad" activeDot={{r: 8}}/>
                          </LineChart>
                        </ResponsiveContainer>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
            </span>
      )
    }
}

export default GovernmentDashboard;
