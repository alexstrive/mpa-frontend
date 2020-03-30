import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { List } from 'semantic-ui-react';

import DrugItem from './DrugItem';

const DrugList = ({ items }) => {
    return (<>
        <h3><FormattedMessage id="app.patient.draft.drugs" /></h3>
        <List>
            {items.map(
                (drug, index) =>
                    (<List.Item
                        as={Link}
                        to={`/drug/${drug.id}`}
                    >
                        <DrugItem values={drug} key={drug.id} />
                    </List.Item>)
            )}
        </List>
    </>);
};

DrugList.propTypes = {
    items: PropTypes.array
};

DrugList.defaultProps = {
    items: []
};

export default DrugList;
