import * as React from 'react';
import { connect } from 'react-redux';
import * as associationsThunks from '../../redux/thunks/associations';
import { FormattedMessage } from 'react-intl';
export class AssociationsContainer extends React.PureComponent {
    async componentDidMount () {
        await this.props.getAssociations(this.props.patientId);
    }

    render () {
        const { associations } = this.props;

        return (
            <div className='States-Draft'>
                <h2><FormattedMessage id="app.patient.associations" /></h2>
                {associations.map(association => {
                    return (
                        <div key={association.id}>
                            <p><b>{association.type}: </b>{association.text}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export const Associations = connect(
    store => ({
        associations: store.associations,
        patientId: store.patient.id
    }),
    {
        getAssociations: associationsThunks.get
    }
)(AssociationsContainer);
