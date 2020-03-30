import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import PopupContradiction from './PopupContradiction';

const DrugItem = ({ values: { id, contradictions }, onClick }) => {
    const maxContradictionLevel = contradictions.MAX;
    const labelColor = maxContradictionLevel ? maxContradictionLevel.color : null;

    const dropdownItem = <Dropdown.Item
        value={`drug.${id}`}
        label={{ color: labelColor, circular: true, empty: true }}
        text={ <span style={{ marginLeft: 10 }}><FormattedMessage id={`drug.${id}`} /></span>}
        onClick={() => onClick(null, { value: id })}
    />;

    return (
        (maxContradictionLevel
            ? <PopupContradiction details={{ contradictions }} trigger={dropdownItem} />
            : dropdownItem)
    );
};

DrugItem.propTypes = {
    values: PropTypes.shape({
        id: PropTypes.number.isRequired,
        contradictions: PropTypes.array
    }).isRequired,
    onClick: PropTypes.func
};

DrugItem.defaultProps = {
    onClick: () => {}
};

export default DrugItem;
