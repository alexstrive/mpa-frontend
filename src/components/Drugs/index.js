import React from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import DrugList from './DrugList';
import DrugSelect from './DrugSelect';
import { enchantWithContradictions } from './enchantWithContradictions';
import postContradictions from '../../api/postContradictions';

const Drugs = ({ medicines, toChoose, onChange }) => {
    const patient = useSelector(state => state.patient);

    const { data: contradictions } = useSWR(
        `${process.env.REACT_APP_CONTRADICTIONS_ENDPOINT_URL}?patientId=${patient.id}`,
        { suspense: true }
    );

    const medicinesWithContradictions = enchantWithContradictions(medicines, contradictions);
    const toChooseWithContradictions = enchantWithContradictions(toChoose, contradictions);

    return (
        <div>
            <DrugList items={medicinesWithContradictions} />

            {toChooseWithContradictions.length > 0 && (
                <DrugSelect items={toChooseWithContradictions} onSelect={
                    async (e, option) => {
                        postContradictions({ patientId: patient.id });
                        onChange(e, option);
                    }
                }/>
            )}
        </div>
    );
};

export default Drugs;
