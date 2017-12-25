import React from 'react';
import GovernmentsLayout from '../../layouts/GovernmentsLayout';
import styles from './governments.css';

class Governments extends React.Component {
    constructor() {
        super();
    }

    render(){
        return (
            <GovernmentsLayout>
                {this.props.children}
            </GovernmentsLayout>
        )
    }
}

export default Governments;