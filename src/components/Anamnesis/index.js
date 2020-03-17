import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import { FormattedMessage } from 'react-intl';
import AnamnesisForm from './AnamnesisForm';
import postAnamnesis from './postAnamnesis';

const Anamnesis = () => {
    const patient = useSelector(state => state.patient);

    const { data: anamnesis } = useSWR(`${process.env.REACT_APP_ANAMNESIS_ENDPOINT_URL}?patientId=${patient.id}`, { suspense: true });

    const handleSubmit = useCallback(
        (data) => {
            const cases = data.diseaseId.reduce((acc, diseaseId, index) => ([...acc, { diseaseId, state: data.diseaseState[index] }]), []);

            return fetch(postAnamnesis(JSON.stringify({ patientId: patient.id, cases })));
        },
        []
    );

    return (
        <div>
            <h2>
                <FormattedMessage id="app.patient.anamnesis.title"/>
            </h2>
            <AnamnesisForm anamnesis={anamnesis} onSubmit={handleSubmit}/>
        </div>
    );
};

export default Anamnesis;
