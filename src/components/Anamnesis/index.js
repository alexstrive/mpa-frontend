import React from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import { FormattedMessage } from 'react-intl';
import AnamnesisForm from './AnamnesisForm';
const Anamnesis = () => {
    const patient = useSelector(state => state.patient);

    const { data: anamnesis, errors } = useSWR(`${process.env.REACT_APP_ANMNESIS_ENDPOINT_URL}?patientId=${patient.id}`, { refreshInterval: 10000, suspense: true });

    return (
        <div>
            <h2>
                <FormattedMessage id="app.patient.anamnesis.title"/>
            </h2>
            <AnamnesisForm anamnesis={anamnesis}/>
        </div>
    );
};

export default Anamnesis;
