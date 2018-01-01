import React from 'react';
import PropTypes from 'prop-types'
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import styles from './App.css';
import * as actions from './actions';
import { connect, } from 'react-redux';
import './utils';

class App extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    //this.props.setupEventListeners();
    // this.props.addListenerForNewTransfers();
    this.props.setupEventListeners();
  }
  render() {
    return (
      <Provider className="app" store={this.props.store}>
        <Routes />
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default connect(null, actions)(App);
