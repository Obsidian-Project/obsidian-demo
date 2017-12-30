import React from 'react';
import CompaniesLayout from '../../layouts/CompaniesLayout';
import './companiesdashboard.css';
import * as actions from '../../actions';
import { connect, } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header,Button, Grid, Segment, Statistic, List , Table} from 'semantic-ui-react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid,BarChart, Bar, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import PieChart from 'react-minimal-pie-chart';

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

class CompaniesDashboard extends React.Component {
    constructor() {
        super();
    }

    render(){
        return (
          <span>
              <Grid columns={3}>
                <Grid.Row>
                  <Header as="h1">Dashboard</Header>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column >
                    <Segment>
                      <Header as="h3">Summary</Header>
                      <Grid width={16}>
                        <Grid.Column textAlign = "center" width={8}>
                          <h5 className="dashHeader">Equipments Spent</h5>
                          <p>120</p>
                        </Grid.Column>

                        <Grid.Column textAlign = "center" width={8}>
                          <h5 className="dashHeader">Customers</h5>
                          <p>120</p>
                        </Grid.Column>
                      </Grid>
                    </Segment>

                    <Segment>
                      <ResponsiveContainer width="100%" height={325}>
                        <BarChart data={data}
                              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                         <XAxis dataKey="name"/>
                         <YAxis/>
                         <CartesianGrid strokeDasharray="3 3"/>
                         <Tooltip/>
                         <Legend />
                         <Bar dataKey="pv" fill="#21ba45" />
                         <Bar dataKey="uv" fill="#1a9437" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Segment>
                  </Grid.Column>

                  <Grid.Column >
                    <Segment>
                      <Header as="h3">Balance</Header>
                      <Grid width={16}>
                        <Grid.Column textAlign = "center" width={8}>
                          <h5 className="dashHeader">Total Earnings</h5>
                          <p>120</p>
                        </Grid.Column>

                        <Grid.Column textAlign = "center" width={8}>
                          <h5 className="dashHeader">This Month</h5>
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
                                  <List.Header className="oneC">Agricultural precision </List.Header>
                              </List.Content>
                          </List.Item>
                          <List.Item>
                              <List.Content>
                                  <List.Header className="twoC">Harvesters</List.Header>
                              </List.Content>
                          </List.Item>
                          <List.Item>
                              <List.Content>
                                  <List.Header className="threeC">Tractors</List.Header>
                              </List.Content>
                          </List.Item>
                      </List>
                      </div>

                        <PieChart
                          lineWidth={30}
                          className="PieChart"
                          data={[
                            { value: 10, key: 1, color: '#21ba45' },
                            { value: 15, key: 2, color: '#63ce7c' },
                            { value: 20, key: 3, color: '#1a9437' },
                            ]}
                        />
                    </Segment>
                  </Grid.Column>

                  <Grid.Column >
                    <Segment className="tableContainer">
                      <Header as="h3">Last Transfers</Header>
                      <Table className="table" textAlign="center" size="small">
                          <Table.Header>
                              <Table.Row>
                                  <Table.HeaderCell>Model</Table.HeaderCell>
                                  <Table.HeaderCell>Type</Table.HeaderCell>
                                  <Table.HeaderCell>Payment</Table.HeaderCell>
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
                  <Grid.Column width={10}>
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
                         <Line type="monotone" dataKey="pv" stroke="#21ba45" activeDot={{r: 8}}/>
                        </LineChart>
                      </ResponsiveContainer>
                    </Segment>
                  </Grid.Column>

                  <Grid.Column width={6}>
                    <Segment className="table2">
                      <Header as="h3">Recent Payments</Header>
                      <Table textAlign="center" size="small">
                          <Table.Header>
                              <Table.Row>
                                  <Table.HeaderCell>Model</Table.HeaderCell>
                                  <Table.HeaderCell>Type</Table.HeaderCell>
                                  <Table.HeaderCell>Payment</Table.HeaderCell>
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
              </Grid>
          </span>
        )
    }
}

export default CompaniesDashboard;