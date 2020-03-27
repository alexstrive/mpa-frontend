import React, { useState, useCallback } from 'react';
import { Form, Grid } from 'semantic-ui-react';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { v4 } from 'uuid';

const diseases = [
    { key: 'disease.1', value: 1, text: <FormattedMessage id="disease.1"/> },
    { key: 'disease.2', value: 2, text: <FormattedMessage id="disease.2"/> },
    { key: 'disease.3', value: 3, text: <FormattedMessage id="disease.3"/> }
];

const states = [
    { key: 'disease.state.ACTIVE', value: 'ACTIVE', text: <FormattedMessage id="disease.state.ACTIVE" /> },
    { key: 'disease.state.HEALED', value: 'HEALED', text: <FormattedMessage id="disease.state.HEALED" /> }
];

const AnamnesisForm = ({ anamnesis, onSubmit }) => {
    const { control, handleSubmit, errors } = useForm();

    const [records, setRecords] = useState(anamnesis.map(diseaseCase => ({ ...diseaseCase, uuid: v4() })));

    const handleAdd = useCallback(() => { setRecords([...records, { uuid: v4() }]); }, [records]);
    const handleRemove = useCallback(
        (index) => {
            setRecords([...records.slice(0, index), ...records.slice(index + 1)]);
        },
        [records]
    );

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Grid>
                    {records.map((diseaseCase, i) => (
                        <Grid.Row key={diseaseCase.uuid}>
                            <Grid.Column width={12}>
                                <Controller
                                    as={
                                        <Form.Select
                                            fluid
                                            options={diseases} error={errors.diseaseId && errors.diseaseId[i]}
                                            placeholder={<FormattedMessage id="app.patient.anamnesis.form.placeholder.diseaseId" />}
                                        />
                                    }
                                    name={`diseaseId[${i}]`}
                                    onChange={([event, data]) => data.value}
                                    defaultValue={diseaseCase.diseaseId}
                                    control={control}
                                />
                            </Grid.Column>

                            <Grid.Column width={3}>
                                <Controller
                                    as={
                                        <Form.Select
                                            fluid
                                            options={states}
                                            error={errors.diseaseId && errors.diseaseState[i]}
                                            placeholder={<FormattedMessage id="app.patient.anamnesis.form.placeholder.diseaseState" />}
                                        />
                                    }
                                    name={`diseaseState[${i}]`}
                                    onChange={([event, data]) => data.value}
                                    defaultValue={diseaseCase.state}
                                    control={control}
                                />
                            </Grid.Column>

                            <Grid.Column width={1}>
                                <Form.Button icon="remove" onClick={() => handleRemove(i)}></Form.Button>
                            </Grid.Column>
                        </Grid.Row>

                    ))}
                </Grid>

                <Grid>
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <Form.Button fluid onClick={handleAdd}>Add Record</Form.Button>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Form.Button fluid type="submit" positive>Save</Form.Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Form>
        </div>
    );
};

export default AnamnesisForm;
