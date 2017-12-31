import React from 'react';
import CompaniesLayout from '../../layouts/CompaniesLayout';
import './companiesdashboard.css';
import * as actions from '../../actions';
import { connect, } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Button, Grid, Segment, Statistic, List, Table } from 'semantic-ui-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import PieChart from 'react-minimal-pie-chart';

const data = [
  { name: 'Q1', 2015: 4000, 2016: 2400},
  { name: 'Q2', 2015: 3000, 2016: 1398},
  { name: 'Q3', 2015: 2000, 2016: 9800},
  { name: 'Q4', 2015: 2780, 2016: 3908}
];


class CompaniesDashboard extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.props.getInformationForCompaniesDashboard();
  }
  render() {
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
                  <Grid.Column textAlign="center" width={8}>
                    <h5 className="dashHeader">Equipment Transfers</h5>
                    <p>{this.props.dashboardInfo.unitsTransferred}</p>
                  </Grid.Column>

                  <Grid.Column textAlign="center" width={8}>
                    <h5 className="dashHeader">Customers</h5>
                    <p>{this.props.dashboardInfo.customers}</p>
                  </Grid.Column>
                </Grid>
              </Segment>

              <Segment>
                <Header as="h3">Earnings per quarter</Header>
                <ResponsiveContainer width="100%" height={290}>
                  <BarChart data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="2015" fill="#21ba45" />
                    <Bar dataKey="2016" fill="#1a9437" />
                  </BarChart>
                </ResponsiveContainer>
              </Segment>
            </Grid.Column>

            <Grid.Column >
              <Segment>
                <Header as="h3">Balance</Header>
                <Grid width={16}>
                  <Grid.Column textAlign="center" width={8}>
                    <h5 className="dashHeader">Total Earnings</h5>
                    <p>{`$ ${this.props.dashboardInfo.totalEarnings}`}</p>
                  </Grid.Column>

                  <Grid.Column textAlign="center" width={8}>
                    <h5 className="dashHeader">This Month</h5>
                    <p>{`$ ${this.props.dashboardInfo.totalEarnings}`}</p>
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
                  data={this.props.dashboardInfo.distributionPerType}
                />
              </Segment>
            </Grid.Column>

            <Grid.Column >
              <Segment className="tableContainer2">
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
                    {this.props.dashboardInfo.transfers && this.props.dashboardInfo.transfers.map((item, index) => {
                      return <Table.Row key={index}>
                        <Table.Cell>{item.model}</Table.Cell>
                        <Table.Cell>{item.type}</Table.Cell>
                        <Table.Cell>{item.costPerUnit}</Table.Cell>
                      </Table.Row>
                    })
                    }
                    {!this.props.dashboardInfo.transfers &&
                      <Table.Row>
                        <Table.Cell>No records</Table.Cell>
                        <Table.Cell>No records</Table.Cell>
                        <Table.Cell>No records</Table.Cell>
                      </Table.Row>
                    }
                  </Table.Body>
                </Table>
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={10}>
              <Segment>
                <Header as="h3">Leases expiring in the next month</Header>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#21ba45" activeDot={{ r: 8 }} />
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
                      <Table.HeaderCell>Group number</Table.HeaderCell>
                      <Table.HeaderCell>Total payment</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>No records</Table.Cell>
                      <Table.Cell>No records</Table.Cell>
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

function mapStateProps(state) {
  return {
    dashboardInfo: state.dashboardReducer.companiesDashboardInfo,
    showLoader: state.dashboardReducer.showLoader
  }
}

export default connect(mapStateProps, actions)(CompaniesDashboard);
