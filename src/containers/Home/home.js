
import React from 'react';
import styles from './home.css';
import { Link } from 'react-router-dom';
import governments from '../Governments/governments';
import { Header } from 'semantic-ui-react';

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div className="home">
            <Header textAlign="center" as='h1'>
                <Header.Content> 
                    Obsidian
                    <Header.Subheader>
                        Giving the tools to farmers around the world
                    </Header.Subheader>
                </Header.Content>
            </Header>
            <div className="entry-links">
                <Link className="entry-link government" to="/governments">Governments</Link>
                <Link className="entry-link companies" to="/companies">Companies</Link>
            </div>
        </div>
    }
}

export default Home;