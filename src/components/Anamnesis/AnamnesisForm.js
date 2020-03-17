import React, { useState, useCallback } from 'react';
import { Form } from 'semantic-ui-react';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

const diseases = [
    { key: 'disease.1', value: 1, text: <FormattedMessage id="disease.1"/> },
    { key: 'disease.2', value: 2, text: <FormattedMessage id="disease.2"/> },
    { key: 'disease.3', value: 3, text: <FormattedMessage id="disease.3"/> }
];

const states = [
    { key: 'disease.state.ACTIVE', value: 'ACTIVE', text: <FormattedMessage id="disease.state.ACTIVE" /> },
    { key: 'disease.state.HEALED', value: 'HEALED', text: <FormattedMessage id="disease.state.HEALED" /> }
];

const AnamnesisForm = ({ anamnesis }) => {
    const { control, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

    const [recordNumber, setRecordNumber] = useState(0);

    const handleAdd = useCallback(
        () => {
            setRecordNumber(recordNumber + 1);
        },
        [recordNumber]
    );

    const newRecords = Array(recordNumber).fill({});

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {anamnesis.concat(newRecords).map((diseaseCase, i) => (
                    <Form.Group widths={'equal'} key={i}>
                        <Controller
                            as={<Form.Select options={diseases} />}
                            name={`diseaseId[${i}]`}
                            onChange={([event, data]) => data.value}
                            defaultValue={diseaseCase.diseaseId}
                            control={control}
                        />

                        <Controller
                            as={<Form.Select options={states}/>}
                            name={`diseaseState[${i}]`}
                            onChange={([event, data]) => data.value}
                            defaultValue={diseaseCase.state}
                            control={control}
                        />
                    </Form.Group>
                ))}

                <Form.Button fluid onClick={handleAdd}>Add Record</Form.Button>

                <Form.Button type='submit' positive>Save</Form.Button>
            </Form>
        </div>
    );
};

export default AnamnesisForm;
