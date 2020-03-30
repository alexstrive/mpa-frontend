import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import AddPatient from './Add';
import ListPatients from './List';

const Patients = () => {
    return (
        <Container>
            <Switch>
                <Route
                    path="/patients/add"
                    component={AddPatient}
                    exact
                />
                <Route
                    path="/patients"
                    component={ListPatients}
                    exact
                />
            </Switch>
        </Container>
    );
};

export default Patients;
