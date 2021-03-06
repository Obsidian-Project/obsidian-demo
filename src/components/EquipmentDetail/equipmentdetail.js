
import React from 'react';
import './equipmentdetail.css';
import { Container, Header, Grid, Segment, Image, Form, Button, Dimmer, Loader, Divider, Input, Modal, Item, List } from 'semantic-ui-react';
import * as actions from '../../actions';
import { connect, } from 'react-redux';
import { withRouter } from 'react-router-dom';

class EquipmentDetail extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.props.getNumberOfEquipmentsPerGroup();
        this.props.getGroupBalance();
    }
    render() {
        return (
            <div>
                {this.props.equipmentDetails &&
                    <div>
                        <Grid>
                            <Grid.Row className="title-row">
                                <Grid.Column><Header as="h1">Equipment Request</Header>  </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Segment>
                            <Grid>
                                <Grid.Column width={8}>
                                    <Header as="h3" className="equipmentdetailsHeader">Equipment Details</Header>
                                    {this.props.equipmentDetails && <img className="equipmentdetailsImg" src={this.props.equipmentDetails.imageUrl} alt="equipment details" />}

                                    <Header as="h3" className="equipmentdetailsHeader no-margin-bottom">{`${this.props.equipmentDetails.category} ${this.props.equipmentDetails.model}`}</Header>
                                    <Header as="h4" className="margin-top-one">Details</Header>
                                    <List as="ol">
                                        {this.props.equipmentDetails.details.map((item, index) => {
                                            return <List.Item key={index} as="li" value='-'>
                                                {item}
                                            </List.Item>
                                        })}
                                    </List>
                                    <p className="equipmentdetailsp">
                                        {this.props.equipmentDetails.description}
                                    </p>
                                </Grid.Column>

                                <Grid.Column width={8}>

                                    <Header as="h3" className="equipmentdetailsHeader">Group Information</Header>
                                    <Image.Group size='small' className="farmer-details-content">

                                        <Image className="farmer-details" centered src="http://res.cloudinary.com/key-solutions/image/upload/v1514717276/Hackathon/tech-nation/obsidian/farmer3.png" />

                                        <Image className="farmer-details" centered src="http://res.cloudinary.com/key-solutions/image/upload/v1514717276/Hackathon/tech-nation/obsidian/farmer1.png" />

                                    </Image.Group>
                                    <Header as="h5">Group balance: {this.props.groupBalance || 0}</Header>
                                    <Header className="no-margin-top" as="h5">Total number of equipments: {this.props.numberOfEquipmentsPerGroup || 0}</Header>
                                    <Header className="no-margin-top" as="h5">Total members: 2</Header>
                                    <Header className="no-margin-top" as="h5">Extra information: xxxx</Header>


                                    <Header as="h3" className="equipmentdetailsHeader">Lease Details</Header>
                                    <p>Total payment: $ 900</p>
                                    <p>Total months: xxxx</p>

                                </Grid.Column>

                                <Grid.Column floated="right" width={8}>
                                    <Button width={8} fluid color="green" onClick={this.props.onTransfer}>Transfer</Button>
                                </Grid.Column>
                            </Grid>
                        </Segment></div>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        numberOfEquipmentsPerGroup: state.equipmentsReducer.numberOfEquipmentsPerGroup,
        groupBalance: state.equipmentsReducer.groupBalance
    }
}

export default connect(mapStateToProps, actions)(EquipmentDetail);
