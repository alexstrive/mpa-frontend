import React, { useCallback } from 'react';
import { Button, Form, Input, Dropdown, Header } from 'semantic-ui-react';
import useSWR from 'swr';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import * as service from '../../../Services/patientService';

const genderOptions = [
    { key: 'm', text: <FormattedMessage id="app.createPatient.gender.male"/>, value: 'male' },
    { key: 'f', text: <FormattedMessage id="app.createPatient.gender.female" />, value: 'female' }
];

const AddPatient = () => {
    const { mutate, data: patients } = useSWR(`${process.env.REACT_APP_ENDPOINT_URL}/patients`, { initialData: [], suspense: true });
    const history = useHistory();
    const { handleSubmit, control, setValue } = useForm();

    const handleAddPatient = useCallback(async (values) => {
        const { name, birthDate } = values;

        // // TODO: попробовать отправлять на бек данные о поле пациента
        const patientData = {
            name,
            birthDate: birthDate.toISOString().substring(0, 10),
            diseaseId: 1,
            doctorId: 1
        };

        await service.createPatient(patientData);
        await mutate([...patients, patientData]);
        history.push('/patients');
    });

    return (
        <>
            <Header>
                <FormattedMessage id="app.createPatient.title"/>
            </Header>
            <Form onSubmit={handleSubmit(handleAddPatient)}>
                <Controller
                    name="name"
                    as={
                        <Form.Field>
                            <label >
                                <FormattedMessage id="app.createPatient.name"/>
                            </label>
                            <Input />
                        </Form.Field >
                    }
                    control={control}
                />

                <Controller
                    name="gender"
                    as={
                        <Form.Field>
                            <label >
                                <FormattedMessage id="app.createPatient.gender"/>
                            </label>
                            <Dropdown
                                selection
                                options={genderOptions}
                                onChange={(e, option) => setValue('gender', option.value)}
                            />
                        </Form.Field >
                    }
                    control={control}
                />

                <Controller
                    name="birthDate"
                    as={
                        <Form.Field>
                            <label>
                                <FormattedMessage id="app.createPatient.age" />
                            </label>
                            <SemanticDatepicker
                                onDateChange={(value) => {
                                    setValue('birthDate', value);
                                }}
                            />
                        </Form.Field>
                    }
                    control={control}
                />

                <Button
                    positive
                    icon="checkmark"
                    content={<FormattedMessage id="app.createPatient.submit" />}
                    type="submit"
                />
            </Form>
        </>);
};

export default AddPatient;
