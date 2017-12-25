import React from 'react';
import SugarMillsLayout from '../../layouts/SugarMillsLayout';
import styles from './sugarmills.css';

class SugarMills extends React.Component {
    constructor() {
        super();
    }

    render(){
        return (
            <SugarMillsLayout>
                {this.props.children}
            </SugarMillsLayout>
        )
    }
}

export default SugarMills;