import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import DrugItem from './DrugItem';

const DrugList = ({ items }) => {
    return (
        <div>
            <h3><FormattedMessage id="app.patient.draft.drugs" /></h3>
            {items.map((drug, index) => <DrugItem values={drug} />)}
        </div>
    );
};

DrugList.propTypes = {
    items: PropTypes.array
};

DrugList.defaultProps = {
    items: []
};

export default DrugList;
