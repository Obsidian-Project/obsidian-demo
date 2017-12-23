import React from 'react';
import styles from './layout.css';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class Layout extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Container>
                 {this.props.children}                 
            </Container>
        )
    }
}

export default Layout;