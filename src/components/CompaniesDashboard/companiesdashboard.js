import React from 'react';
import CompaniesLayout from '../../layouts/CompaniesLayout';
import './companiesdashboard.css';
import * as actions from '../../actions';
import { connect, } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Button, Grid, Segment, Statistic, List, Table } from 'semantic-ui-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import PieChart from 'react-minimal-pie-chart';

class CompaniesDashboard extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.props.getInformationForCompaniesDashboard();
  }

  getDataForChart = (earnings) => {
    const data = [
      { name: 'Q1', 2017: 0, 2016: 0},
      { name: 'Q2', 2017: 0, 2016: 0},
      { name: 'Q3', 2017: 0, 2016: 0},
      { name: 'Q4', 2017: earnings, 2016: 0}
    ];
    return data;
  }

  getEarningsPerYear = (earnings) => {
    const data = [
      {name: 'January', 2016: 0, 2017: 0},
      {name: 'February', 2016: 0, 2017: 0},
      {name: 'March', 2016: 0, 2017: 0},
      {name: 'April', 2016: 0, 2017: 0},
      {name: 'May', 2016: 0, 2017: 0},
      {name: 'June', 2016: 0, 2017: 0},
      {name: 'July', 2016: 0, 2017: 0},
      {name: 'August', 2016: 0, 2017: 0},
      {name: 'September', 2016: 0, 2017: 0},
      {name: 'October', 2016: 0, 2017: 0},
      {name: 'November', 2016: 0, 2017: 0},
      {name: 'December', 2016: 0, 2017: earnings}
    ];
    return data;
  }
  render() {
    return (
      <span>
        <Grid columns={3}>
          <Grid.Row>
            <Header style={{ paddingLeft: "1rem"}} as="h1">Dashboard</Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column >
              <Segment>
                <Header as="h3">Summary</Header>
                <Grid width={16}>
                  <Grid.Column textAlign="center" width={8}>
                    <h5 className="dashHeader">Equipment Transfers</h5>
                    <p>{this.props.unitsTransferred}</p>
                  </Grid.Column>

                  <Grid.Column textAlign="center" width={8}>
                    <h5 className="dashHeader">Customers</h5>
                    <p>{this.props.customers}</p>
                  </Grid.Column>
                </Grid>
              </Segment>

              <Segment>
                <Header as="h3">Earnings per quarter</Header>
                <ResponsiveContainer width="100%" height={290}>
                  <BarChart data={this.getDataForChart(this.props.totalEarnings || 0)}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="2016" fill="#00908a" />
                    <Bar dataKey="2017" fill="#1a9437" />
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
                    <p>{`$ ${this.props.totalEarnings.format()}`}</p>
                  </Grid.Column>

                  <Grid.Column textAlign="center" width={8}>
                    <h5 className="dashHeader">This Month</h5>
                    <p>{`$ ${this.props.totalEarnings.format()}`}</p>
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
                  data={this.props.distributionPerType}
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
                    {this.props.transfers && this.props.transfers.map((item, index) => {
                      return <Table.Row key={index}>
                        <Table.Cell>{item.model}</Table.Cell>
                        <Table.Cell>{item.type}</Table.Cell>
                        <Table.Cell>{`$ ${Number(item.costPerUnit).format()}`}</Table.Cell>
                      </Table.Row>
                    })
                    }
                    {!this.props.transfers &&
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
                <Header as="h3">Earnings per year</Header>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={this.getEarningsPerYear(this.props.totalEarnings || 0)}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="2017" stroke="#21ba45" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Segment>
            </Grid.Column>

            <Grid.Column width={6}>
              <Segment className="table2">
                <Header as="h3">Leases expiring this Month</Header>
                <Table textAlign="center" size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Group number</Table.HeaderCell>
                      <Table.HeaderCell>Program reference</Table.HeaderCell>
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
    showLoader: state.dashboardReducer.showLoader,
    unitsTransferred: state.companyDashboardReducer.unitsTransferred,
    customers: state.companyDashboardReducer.customers,
    totalEarnings: state.companyDashboardReducer.totalEarnings,
    distributionPerType: state.companyDashboardReducer.distributionPerType,
    transfers: state.companyDashboardReducer.transfers
  }
}

export default connect(mapStateProps, actions)(CompaniesDashboard);
