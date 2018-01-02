import React from 'react';
import { Container, Header, Grid, Segment, Image, List, Card, Form, Item, Button, Dimmer, Loader, Divider, Input } from 'semantic-ui-react';
import * as actions from '../actions';
import { connect, } from 'react-redux';

//la tercer imagen
const EquipmentList = (props) => (
    <Item.Group link>
        {props.equipments && props.equipments.map((item) => {
            let title = `${item.category} ${item.model}`;
            let imageUrl = item.images[2] || "http://via.placeholder.com/350x150";
            return <Equipment id={item.equipmentId} imageUrl={imageUrl} key={item.equipmentId} details={item.details} title={title} />
        })}
    </Item.Group>
)

class Equipment extends React.Component {
    render() {
        return (
            <Item onClick={() => {
                this.props.equipmentSelected(this.props.id);
            }}>
                <Item.Image size="large" src={this.props.imageUrl} />
                <Item.Content>
                    <Item.Header as='h1'>{this.props.title}</Item.Header>
                    <Item.Meta>Details</Item.Meta>
                    <Item.Description>
                        <List as="ol">
                            {this.props.details.map && this.props.details.map((item, index) => {
                                return <List.Item key={index} as='li' value='-'>{item}</List.Item>
                            })}
                        </List>
                    </Item.Description>
                    <Item.Meta as='h3'>Recommendations</Item.Meta>
                    <Item.Description>
                        Recommended for groups of 4
               </Item.Description>
                    <Item.Meta as='h3'>Expected land coverage</Item.Meta>
                    <Item.Description>
                        ~ 3000 hectares of land
               </Item.Description>
                </Item.Content>
            </Item>
        )
    }
}

Equipment = connect(null, actions)(Equipment);

class Equipments extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.props.getEquipments();
    }
  
    render() {
        return (
            <div>
                <EquipmentList equipments={this.props.equipments} />
            </div>
        )
    }

}

function mapStateProps(state) {
    return {
        equipments: state.equipmentsReducer.equipments
    }
}
export default connect(mapStateProps, actions)(Equipments);