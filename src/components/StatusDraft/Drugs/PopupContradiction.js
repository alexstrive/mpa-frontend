import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

const PopupContradiction = ({ trigger, details }) => {
    const diseaseContradictions = details.contradictions.filter(({ type }) => type === 'DISEASE');
    const substanceContradictions = details.contradictions.filter(({ type }) => type === 'SUBSTANCE');

    const doesMedicineHasDiseaseContradictions = diseaseContradictions.length > 0;
    const doesMedicineHasSubstanceContradictions = substanceContradictions.length > 0;

    return (
        <Popup trigger={trigger}>
            <Popup.Header style={{ color: details.labelColor }}>
                <FormattedMessage id={`contradiction.level.${details.contradictions.MAX.type}`}/>
            </Popup.Header>
            <Popup.Content>
                {doesMedicineHasDiseaseContradictions && <div>
                    <b><FormattedMessage id="app.patient.draft.drugs.contradictions.disease.title"/></b>
                    <ul>
                        {diseaseContradictions.map(
                            contradiction =>
                                <li key={contradiction.id}>
                                    <FormattedMessage id={`disease.${contradiction.id}`}/>
                                </li>
                        )}
                    </ul>
                </div>}

                {doesMedicineHasSubstanceContradictions && <div>
                    <b><FormattedMessage id="app.patient.draft.drugs.contradictions.substance.title"/></b>
                    <ul>
                        {substanceContradictions.map(contradiction =>
                            <li key={contradiction.id}>
                                <FormattedMessage id={`substance.${contradiction.id}`}/>
                            </li>)}
                    </ul>
                </div>}

            </Popup.Content>
        </Popup>
    );
};

PopupContradiction.propTypes = {
    trigger: PropTypes.element,
    details: PropTypes.shape({
        contradictions: PropTypes.array
    })
};

export default PopupContradiction;
