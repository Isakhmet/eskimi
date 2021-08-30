import React from 'react';
import Table from "./Table";
import { Link } from 'react-router-dom'
import AppContainer from './AppContainer'

function Main() {

    return (
        <AppContainer title="Advertising campaign">
            <Link to="/create" className="btn btn-primary">Add Advertising</Link>
            <Table/>
        </AppContainer>
    );
}

export default Main;
