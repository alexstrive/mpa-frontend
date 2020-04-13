import React from 'react';
import { connect } from 'react-redux';
import * as historyThunks from '../../redux/thunks/history';
import { Loader } from 'semantic-ui-react';

import { FormattedMessage, FormattedDate } from 'react-intl';

class PatientHistoryContainer extends React.Component {
    componentDidMount () {
        const { patient, getHistory } = this.props;
        getHistory(patient.id);
    }

    render () {
        // const { birthDate } = this.props.patient;
        const { history } = this.props;

        // const dateObj = new Date(birthDate);
        // const year = dateObj.getFullYear();
        // const month = dateObj.getMonth();
        // const now = new Date();
        // const age = now.getFullYear() - year + (now.getMonth() - month < 0 ? 1 : 0);

        return (
            <section className="History">
                <h3><FormattedMessage id="app.patient.history" /></h3>
                {history ? history.map(event =>
                    <div key={event.id}>
                        {console.log(event)}
                        <p>
                            <b><FormattedMessage id="app.patient.history.item.date" />: </b>
                            <FormattedDate
                                value={event.submittedOn}
                                year="numeric"
                                month="numeric"
                                day="numeric"
                                hour="numeric"
                                minute="numeric"
                            />
                        </p>
                        <p><b><FormattedMessage id="app.patient.history.item.title" />: </b> {event.state.name}</p>
                        <p><b><FormattedMessage id="app.patient.history.item.description" />:</b> <FormattedMessage id={`state.${event.state.id}.description`} /></p>
                        { event.attributes.length
                            ? <p><b><FormattedMessage id="app.patient.history.item.attributes" />:</b>
                                <ul>
                                    {event.attributes.map(attr =>
                                        <li key={attr.name}>
                                            <b><FormattedMessage id="app.patient.history.item.attributes.title" />:</b> <FormattedMessage id={`attribute.${attr.id}`} />
                                            <br/>
                                            <b><FormattedMessage id="app.patient.history.item.attributes.dose" />:</b> {attr.value}
                                        </li>)}
                                </ul>
                            </p> : null}
                        <hr/>
                    </div>) : <Loader/>
                }
            </section>
        );
    }
}

export const PatientHistory = connect(
    store => ({
        patient: store.patient,
        history: store.history
    }),
    {
        getHistory: historyThunks.get
    }
)(PatientHistoryContainer);
