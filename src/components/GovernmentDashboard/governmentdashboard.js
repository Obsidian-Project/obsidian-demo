import React from 'react';
import './governmentdashboard.css';
import { Link } from 'react-router-dom';
import { Header,Button, Grid, Segment, Statistic, List , Table} from 'semantic-ui-react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import PieChart from 'react-minimal-pie-chart';
import Governments from '../../containers/Governments'
import * as actions from '../../actions';
import { connect, } from 'react-redux';

class GovernmentDashboard extends React.Component {

    constructor() {
        super();
        this.state = {
          pieChartValues: []
        }
    }
    getSubsidiesPerYear = (subsidies) => {
      const data = [
        {name: 'January', subsides:0},
        {name: 'February', subsides:0},
        {name: 'March', subsides:0},
        {name: 'April', subsides:0},
        {name: 'May', subsides:0},
        {name: 'June', subsides:0},
        {name: 'July', subsides:0},
        {name: 'August', subsides:0},
        {name: 'September', subsides:0},
        {name: 'October', subsides:0},
        {name: 'November', subsides:0},
        {name: 'December', subsides:subsidies}
      ];
      return data;
    }

    componentWillMount(){
      this.props.getInformationForGovernmentDashboard();
    }
    render() {
        return(
            <div>
                <Grid columns={3}>
                  <Grid.Row>
                    <Header style={{ paddingLeft: "1rem"}} as="h1">Dashboard</Header>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column >
                      <Segment>
                        <Header as="h3">Summary</Header>
                        <Grid width={15}>
                          <Grid.Column textAlign = "center" width={5}>
                            <h5 className="dashHeader">Programs</h5><br/>
                            <p>{this.props.numberOfPrograms}</p>
                          </Grid.Column>

                          <Grid.Column textAlign = "center" width={5}>
                            <h5 className="dashHeader">Beneficiaries</h5><br/>
                            <p>{this.props.subsidiesDeliverd > 0 ? 2 : 0}</p>
                          </Grid.Column>

                          <Grid.Column textAlign = "center" width={5}>
                            <h5 className="dashHeader">Subsidies delivered</h5>
                            <p>{this.props.subsidiesDeliverd}</p>
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
                            data={this.props.equipmentTypes}
                          />
                      </Segment>
                    </Grid.Column>

                    <Grid.Column >
                      <Segment>
                        <Header as="h3">Balance</Header>
                        <Grid width={16}>
                          <Grid.Column textAlign = "center" width={8}>
                            <h5 className="dashHeader">Total Spent</h5><br/>
                            <p>{this.props.balance ? `$ ${this.props.balance.format()}` : "$ 0"}</p>
                          </Grid.Column>

                          <Grid.Column textAlign = "center" width={8}>
                            <h5 className="dashHeader">This Month</h5><br/>
                            <p>{this.props.balance ? `$ ${this.props.balance.format()}` : "$ 0"}</p>
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
                            className="PieChart"
                            data={this.props.landCoverage}
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
                                    <Table.HeaderCell>Units</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                            {this.props.programsInfo && this.props.programsInfo.map((item, index) => {
                                return <Table.Row key={index}>
                                <Table.Cell>{item.name}</Table.Cell>
                                <Table.Cell>Subsidy</Table.Cell>
                                <Table.Cell>{item.units}</Table.Cell>
                              </Table.Row>
                            })
                          }
                            </Table.Body>
                        </Table>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column width={16}>
                      <Segment>
                        <Header as="h3">Subsidies delivered</Header>
                        <ResponsiveContainer width = "100%" height={300}>
                          <LineChart data={this.getSubsidiesPerYear(this.props.subsidiesDeliverd)}
                                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                           <XAxis dataKey="name"/>
                           <YAxis/>
                           <CartesianGrid strokeDasharray="3 3"/>
                           <Tooltip/>
                           <Legend />
                           <Line type="monotone" dataKey="subsides" stroke="#00b5ad" activeDot={{r: 8}}/>
                          </LineChart>
                        </ResponsiveContainer>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
            </div>
      )
    }
}

function mapStateProps(state) {
  return {
      balance: state.governmentDashboardReducer.balance,
      subsidiesDeliverd: state.governmentDashboardReducer.subsidiesDeliverd,
      units: state.governmentDashboardReducer.units,
      numberOfPrograms: state.governmentDashboardReducer.numberOfPrograms,
      showLoader: state.governmentDashboardReducer.showLoader,
      equipmentTypes: state.governmentDashboardReducer.equipmentTypes,
      landCoverage: state.governmentDashboardReducer.landCoverage,
      programsInfo: state.governmentDashboardReducer.programsInfo
  }
}

export default connect(mapStateProps, actions)(GovernmentDashboard);
