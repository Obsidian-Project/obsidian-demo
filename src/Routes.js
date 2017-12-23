import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './containers/Home';
import Governments from './containers/Governments';
import Companies from './containers/Companies';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/governments" component={Governments} />
            <Route path="/companies" component={Companies} />            
            <Route component={Home} />
        </Switch>
    </Router>
)

export default Routes;