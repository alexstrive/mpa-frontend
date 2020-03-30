import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Container, List, Header } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

const Drugs = () => {
    const drugs = useSelector(state => state.medicines);
    return (
        <Container>
            <Header><FormattedMessage id="app.drugs.title"/></Header>
            <List selection size="big">
                {drugs.map(
                    (drug) => <List.Item as={Link} to={`/drug/${drug.id}`}>
                        <FormattedMessage id={`drug.${drug.id}`} />
                    </List.Item>
                )}
            </List>
        </Container>
    );
};

export default Drugs;
