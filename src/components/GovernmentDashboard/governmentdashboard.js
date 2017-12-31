import React from 'react';
import './governmentdashboard.css';
import { Link } from 'react-router-dom';
import { Header,Button, Grid, Segment, Statistic, List , Table} from 'semantic-ui-react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import PieChart from 'react-minimal-pie-chart';
import Governments from '../../containers/Governments'
import * as actions from '../../actions';
import { connect, } from 'react-redux';

Number.prototype.format = function(n, x) {
  if(this == 0){
      return;
  }
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};


const data = [
      {name: 'January', uv: 4000, pv: 2400, amt: 2400},
      {name: 'February', uv: 3000, pv: 1398, amt: 2210},
      {name: 'March', uv: 2000, pv: 9800, amt: 2290},
      {name: 'April', uv: 2780, pv: 3908, amt: 2000},
      {name: 'May', uv: 1890, pv: 4800, amt: 2181},
      {name: 'June', uv: 2390, pv: 3800, amt: 2500},
      {name: 'July', uv: 3490, pv: 4300, amt: 2100},      
      {name: 'August', uv: 3490, pv: 4300, amt: 2100},      
      {name: 'September', uv: 3490, pv: 4300, amt: 2100},      
      {name: 'October', uv: 3490, pv: 4300, amt: 2100},      
      {name: 'November', uv: 3490, pv: 4300, amt: 2100},      
      {name: 'December', uv: 3490, pv: 4300, amt: 2100},
];

class GovernmentDashboard extends React.Component {

    constructor() {
        super();
        this.state = {
          pieChartValues: []
        }
    }
    componentWillMount(){       
      this.props.getInformationForGovernmentDashboard();
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
                            <p>{this.props.dashboardInfo.numberOfPrograms}</p>
                          </Grid.Column>

                          <Grid.Column textAlign = "center" width={5}>
                            <h5 className="dashHeader">Beneficiaries</h5>
                            <p>{this.props.dashboardInfo.subsidiesDeliverd * 2}</p>
                          </Grid.Column>

                          <Grid.Column textAlign = "center" width={5}>
                            <h5 className="dashHeader">Subsidies delivered</h5>
                            <p>{this.props.dashboardInfo.subsidiesDeliverd}</p>
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
                            data={this.props.dashboardInfo.pieChartValues}
                          />
                      </Segment>
                    </Grid.Column>

                    <Grid.Column >
                      <Segment>
                        <Header as="h3">Balance</Header>
                        <Grid width={16}>
                          <Grid.Column textAlign = "center" width={8}>
                            <h5 className="dashHeader">Total Spent</h5>
                            <p>{this.props.dashboardInfo.balance ? `$ ${this.props.dashboardInfo.balance.format()}` : "-"}</p>
                          </Grid.Column>

                          <Grid.Column textAlign = "center" width={8}>
                            <h5 className="dashHeader">This Month</h5>
                            <p>{this.props.dashboardInfo.balance ? `$ ${this.props.dashboardInfo.balance.format()}` : "-"}</p>
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
                            data={this.props.dashboardInfo.mechanizedAreaPieChartValues}
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

function mapStateProps(state) {
  return {
      dashboardInfo: state.dashboardReducer.dashboardInfo,
      showLoader: state.dashboardReducer.showLoader,
      programsInfo: state.dashboardReducer.programsInfo
  }
}

export default connect(mapStateProps, actions)(GovernmentDashboard);
