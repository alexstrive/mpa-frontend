import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
class CurrentStateContainer extends React.PureComponent {
    render () {
        const { status } = this.props.patient;
        const { state } = status;
        return (
            <section className="CurrentState">
                <h2><FormattedMessage id="app.patient.status.title"/></h2>
                <h3>{state.name}</h3>
                <div>
                    <h4><FormattedMessage id="app.patient.status.description" /></h4>
                    <p><FormattedMessage id={`state.${state.id}.description`} /></p>
                </div>
                <div>
                    <h4><FormattedMessage id="app.patient.status.analysis.title" /></h4>
                    <ul>
                        {status.attributes.length ? status.attributes.map(attr =>
                            <li key={attr.name}>

                                <b><FormattedMessage id="app.patient.status.analysis.item.title" />:</b> <FormattedMessage id={`attribute.${attr.id}`} />
                                <br/>
                                <b><FormattedMessage id="app.patient.status.analysis.item.result" />:</b> <FormattedMessage id={`attributes.data.${attr.value}`} defaultMessage={attr.value}/>
                            </li>)
                            : <FormattedMessage id="app.patient.status.analysis.empty" />}
                    </ul>
                </div>
                <div>
                    <h4><FormattedMessage id="app.patient.status.drugs.title" /></h4>
                    <ul>
                        {status.medicines.length ? status.medicines.map(attr =>
                            <li key={attr.name}>
                                <b><FormattedMessage id="app.patient.status.drugs.item.title" />:</b> <FormattedMessage id={`drug.${attr.id}`} />
                                <br/>
                                <b><FormattedMessage id="app.patient.status.drugs.item.dose" />:</b> {attr.value}
                            </li>)
                            : <FormattedMessage id="app.patient.status.drugs.empty" />}
                    </ul>
                </div>
            </section>);
    }
};

export const CurrentState = connect(
    store => ({
        patient: store.patient
    })
)(CurrentStateContainer);
