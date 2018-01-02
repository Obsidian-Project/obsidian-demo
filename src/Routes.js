import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './containers/Home';
import Governments from './containers/Governments';
import Companies from './containers/Companies';
import SugarMills from './containers/SugarMills';

import NewGroup from './containers/NewGroup';
import NewProgram from './containers/NewProgram';
import NewMember from './containers/NewMember';
import EquipmentDetails from './containers/EquipmentDetails';
import ProgramDetails from './containers/ProgramDetails';

import GovernmentDashboard from './components/GovernmentDashboard'
import CompaniesDashboard from './components/CompaniesDashboard'
//test
import Equipments from './containers/Equipments';

const GovernmentsRoutes = () => (
    <Switch>
        <Governments>
            <Route exact path="/governments" component={GovernmentDashboard} />
            <Route path="/governments/newProgram" component={NewProgram} />
            <Route path="/governments/newMember" component={NewMember} />
            <Route path="/governments/newGroup" component={NewGroup} />
        </Governments>
    </Switch>
)

const CompaniesRoutes = () => (
    <Switch>
        <Companies>
            <Route exact path="/companies" component={CompaniesDashboard} />
            <Route path="/companies/newProgram" component={NewProgram} />            
            <Route path="/companies/equipmentdetails/:equipmentId" component={EquipmentDetails} />
            <Route path="/companies/programdetails/:programId" component={ProgramDetails} />
        </Companies>
    </Switch>
)

const SugarMillsRoutes = () => (
    <Switch>
        <Route exact path="/sugarmills" component={SugarMills} />
        <SugarMills>
            <Route path="/sugarmills/newProgram" component={NewProgram} />
        </SugarMills>
    </Switch>
)

const Routes = () => (
    <Router>
      <Switch>
          <Route exact path="/" component={Home} />
            <Route path="/governments" component={GovernmentsRoutes} />
            <Route path="/companies" component={CompaniesRoutes} />
            <Route path="/sugarmills" component={SugarMillsRoutes} />         
            <Route component={Home} />
        </Switch>
    </Router>
)

export default Routes;

{/* <Route path="/newMember" component={NewMember} />
<Route path="/newGroup" component={NewGroup} />      */}
