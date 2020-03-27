import React from 'react';
import PropTypes from 'prop-types';
import { Popup, Dropdown } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

import AssociationForm from '../AssociationForm/AssociationForm';

const DrugItem = ({ values: { id, contradictions } }) => {
    const maxContradictionLevel = contradictions.MAX;
    const labelColor = maxContradictionLevel ? maxContradictionLevel.color : 'none';

    const diseaseContradictions = contradictions.filter(({ type }) => type === 'DISEASE');
    const doesMedicineHasDiseaseContradictions = diseaseContradictions.length > 0;

    const substanceContradictions = contradictions.filter(({ type }) => type === 'SUBSTANCE');
    const doesMedicineHasSubstanceContradictions = substanceContradictions.length > 0;

    return (
        <div>
            <div className='Draft-StatusFormContainer'>
                {(maxContradictionLevel
                    ? <Popup
                        trigger={
                            <Dropdown.Item
                                label={{ color: labelColor, circular: true, empty: true }}
                                text={ <FormattedMessage id={`drug.${id}`} />}
                            />
                        }
                    >
                        <Popup.Header style={{ color: labelColor }}>
                            <FormattedMessage id={`contradiction.level.${maxContradictionLevel.type}`}/>
                        </Popup.Header>
                        <Popup.Content>
                            {doesMedicineHasDiseaseContradictions && <div>
                                <b><FormattedMessage id="patient.draft.drugs.contradictions.disease.title"/></b>
                                <ul>
                                    {diseaseContradictions.map(contradiction =>
                                        <li><FormattedMessage id={`disease.${contradiction.id}`}/></li>)}
                                </ul>
                            </div>}

                            {doesMedicineHasSubstanceContradictions && <div>
                                <b><FormattedMessage id="patient.draft.drugs.contradictions.substance.title"/></b>
                                <ul>
                                    {substanceContradictions.map(contradiction =>
                                        <li><FormattedMessage id={`drug.${contradiction.id}`}/></li>)}
                                </ul>
                            </div>}

                        </Popup.Content>
                    </Popup> : <Dropdown.Item
                        label={{ color: labelColor, circular: true, empty: true }}
                        text={ <FormattedMessage id={`drug.${id}`} />}
                    />)}

                <AssociationForm
                    style={{ position: 'relative' }}
                    getData={() => ({
                        predicate: `eq({medicine.id}, ${id})`,
                        type: 'medicine'
                    })}
                />
            </div>
        </div>
    );
};

DrugItem.propTypes = {
    values: PropTypes.shape({
        id: PropTypes.number.isRequired,
        contradictions: PropTypes.array
    }).isRequired
};

export default DrugItem;
