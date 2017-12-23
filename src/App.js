import React from 'react';
import PropTypes from 'prop-types'
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import styles from './App.css';

class App extends React.Component {
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

export default App;
