
import React from 'react';
import styles from './home.css';
import { Link } from 'react-router-dom';
import governments from '../Governments/governments';
import { Header,Button } from 'semantic-ui-react';

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div className="home">
            <Header className="homeHeader" textAlign="center" as='h1'> Obsidian </Header>
            <p>Giving the tools to farmers around the world</p>

            <div className="entry-links">
              <Link className="entry-link government" to="/governments">
                <Button  basic color='teal' >Governments</Button>
              </Link>

              <Link className="entry-link companies" to="/companies">
                <Button basic color='green'>Companies</Button>
              </Link>
              <Link className="entry-link sugarmills" to="/sugarmills">
                <Button basic color='violet'>Sugar mills</Button>
              </Link>
            </div>
        </div>
    }
}

export default Home;
