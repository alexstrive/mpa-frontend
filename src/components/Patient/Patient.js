import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SideBar } from '../Sidebar/Sidebar';
import { routes } from '../../constants';
import { connect } from 'react-redux';
import { Dimmer, Loader, Card } from 'semantic-ui-react';
import * as patientThunks from '../../redux/thunks/patient';
import './Patient.css';

import { FormattedMessage, FormattedDate } from 'react-intl';

class PatientContainer extends React.PureComponent {
    componentDidMount () {
        this.props.getPatient(this.props.match.params.patientId);
    }

    render () {
        const { patient } = this.props;
        if (!patient.id) {
            return (
                <Dimmer active inverted>
                    <Loader inverted/>
                </Dimmer>
            );
        }

        return (
            <section className="Patient">
                <Card className="Patient-General"
                    header={patient.name}
                    meta={patient.diseaseName}
                    description={
                        <FormattedMessage
                            id="app.patient.birthday"
                            values={{ birthday: <FormattedDate value={patient.birthDate} /> }}
                        />
                    }
                />
                {console.log(patient)}
                <SideBar/>
                <div className={'Patient-Main'}>
                    <Switch>
                        {routes.map(route =>
                            <Route path={route.path} component={route.component} key={route.path}/>)}
                    </Switch>
                </div>
            </section>);
    }
};

export const Patient = connect(
    store => ({
        patient: store.patient
    }),
    {
        getPatient: patientThunks.get
    }
)(PatientContainer);
