import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

const DrugSelect = ({ items, onSelect }) => {
    return (
        <div className='Draft-StatusFormContainer'>
            <Select
                placeholder={<FormattedMessage id="app.patient.draft.drugs.placeholder" />}
                options={items.map(medicine => {
                    const maxContradictionLevel = medicine.contradictions.MAX;
                    const labelColor = maxContradictionLevel ? maxContradictionLevel.color : 'none';

                    return {
                        value: medicine.id,
                        key: medicine.id,
                        text: <FormattedMessage id={`drug.${medicine.id}`} />,
                        label: { circular: true, empty: true, color: labelColor }
                    };
                })}
                onChange={onSelect}
            />
        </div>
    );
};

DrugSelect.propTypes = {
    items: PropTypes.array.isRequired,
    onSelect: PropTypes.func
};

DrugSelect.defaultProps = {
    items: []
};

export default DrugSelect;
