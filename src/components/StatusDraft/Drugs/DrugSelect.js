import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

import DrugItem from './DrugItem';

const DrugSelect = ({ items, onSelect }) => {
    return (
        <div className='Draft-StatusFormContainer'>
            <Dropdown
                placeholder={<FormattedMessage id="app.patient.draft.drugs.placeholder" />}
                pointing='top'
                selection
            >
                <Dropdown.Menu>
                    {items.map(medicine => <DrugItem values={medicine} onClick={onSelect} key={medicine.id}/>)}
                </Dropdown.Menu>
            </Dropdown>
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
