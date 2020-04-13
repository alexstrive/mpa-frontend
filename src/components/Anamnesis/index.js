import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import { FormattedMessage } from 'react-intl';

import AnamnesisForm from './AnamnesisForm';

import postAnamnesis from '../../api/postAnamnesis';
import postContradictions from '../../api/postContradictions';

const patientSWRKey = (patient) => `${process.env.REACT_APP_ANAMNESIS_ENDPOINT_URL}?patientId=${patient.id}`;

const Anamnesis = () => {
    const patient = useSelector(state => state.patient);

    const { data: anamnesis, mutate } = useSWR(patientSWRKey(patient), { suspense: true });

    const handleSubmit = useCallback(
        async (data = { diseaseId: [], diseaseState: [] }) => {
            // format request object
            const cases = (
                data.diseaseId &&
                data.diseaseId.reduce(
                    (acc, diseaseId, index) =>
                        ([...acc, { diseaseId, state: data.diseaseState[index] }]),
                    []
                )
            ) || [];

            await postAnamnesis({ patientId: patient.id, cases });
            mutate(cases);

            // recalculate patient's contradictions
            await postContradictions({ patientId: patient.id });
        },
        []
    );

    return (
        <div>
            <h2>
                <FormattedMessage id="app.patient.anamnesis"/>
            </h2>
            <AnamnesisForm anamnesis={anamnesis} onSubmit={handleSubmit}/>
        </div>
    );
};

export default Anamnesis;
