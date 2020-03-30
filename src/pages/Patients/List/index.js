import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { Header, List, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ListPatients = () => {
    const { data: patients } = useSWR(`${process.env.REACT_APP_ENDPOINT_URL}/patients`, { initialData: [], suspense: true });

    return (
        <div>
            <Header size="huge">
                <FormattedMessage id="app.patients.title"/>
            </Header>
            <Button
                as={Link}
                icon
                labelPosition='left'
                size="mini"
                to="/patients/add"
            >
                <Icon name="add" />
                <FormattedMessage id="app.patients.add.title" />
            </Button>
            <List
                selection
                size="big"
            >
                {patients.map(patient => (
                    <List.Item
                        as={Link}
                        to={`/patient/${patient.id}/draft`}
                        key={patient.id}
                    >
                        {patient.name} (
                        <FormattedDate>{patient.birthDate}</FormattedDate>
                                )
                    </List.Item>
                ))}
            </List>
        </div>

    );
};

ListPatients.defaultProps = {
    patients: []
};

export default ListPatients;
