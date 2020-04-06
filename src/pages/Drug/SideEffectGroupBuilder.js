import React, { useMemo } from 'react';
import { Tab, Dropdown, Form, Grid, Button } from 'semantic-ui-react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import useSWR from 'swr';
import legends from './legends';
import { createNewGroup } from '../../api/sideEffects';

const unitsOptions = [
    {
        key: 'cases',
        text: <FormattedMessage id="app.drug.sideEffects.units.cases"/>,
        value: 'cases'
    },
    {
        key: 'percents',
        text: <FormattedMessage id="app.drug.sideEffects.units.percents"/>,
        value: 'percents'
    }
];

const SideEffectsBuilder = ({ drugId, onSubmit }) => {
    const { data: serverSupportedSideEffectIds } = useSWR(
        `${process.env.REACT_APP_SIDEEFFECTS_ENDPOINT_URL}/supportedIds`,
        { suspense: true, initialData: [] }
    );

    const serverSupportedSideEffectOptions = useMemo(
        () => serverSupportedSideEffectIds
            .map((sideEffectId) => ({
                text: <FormattedMessage id={`sideEffect.${sideEffectId}`} />,
                value: sideEffectId,
                key: sideEffectId
            }),
            [serverSupportedSideEffectIds])
    );

    const { register, getValues, handleSubmit, control, reset } = useForm({
        defaultValues: {
            units: 'cases',
            sideEffects: []
        }
    });

    const { units } = getValues();

    const {
        fields: sideEffects,
        append: appendSideEffect
    } = useFieldArray({
        control,
        name: 'sideEffects',
        keyName: 'key'
    });

    const frequencyOptions = useMemo(
        () => Object.keys(legends[units])
            .map(key => ({
                key,
                text: <FormattedMessage id={`frequency.${key}`}/>,
                value: key
            })),
        [units]
    );

    const remainingSideEffectOptions = useMemo(
        () =>
            serverSupportedSideEffectOptions
                .filter((currentSideEffect) =>
                    sideEffects
                        .findIndex(
                            (currentSelectedSideEffect) => currentSelectedSideEffect.id === currentSideEffect.value
                        ) === -1
                ),
        [sideEffects]
    );

    const saveSideEffectGroup = (data) => {
        createNewGroup(drugId, data.units, data.sideEffects);
        onSubmit(data.units, data.sideEffects);
    };

    return (
        <Tab.Pane>
            <Form onSubmit={handleSubmit(saveSideEffectGroup)}>
                <Form.Field>
                    <label>
                        <FormattedMessage
                            id="app.drug.sideEffects.builder.units.label"
                            defaultMessage="Units"
                        />
                    </label>

                    <FormattedMessage
                        id="app.drug.sideEffects.builder.units.placeholder"
                        defaultMessage="Choose units"
                    >
                        {(placeholder) =>
                            <Dropdown
                                placeholder={placeholder}
                                options={unitsOptions}
                                selection
                                ref={register('units')}
                                onChange={(_, data) => reset({
                                    units: data.value
                                })}
                                defaultValue={'cases'}
                            />
                        }
                    </FormattedMessage>

                </Form.Field>

                <Form.Field>
                    <label>
                        <FormattedMessage
                            id="app.drug.sideEffects.builder.sideEffects.label"
                            defaultMessage="Side effects"
                        />
                    </label>

                    <Grid>
                        {sideEffects
                            .map((sideEffect, index) =>
                                (<Grid.Row key={sideEffect.key}>
                                    <Grid.Column width={6}>
                                        <Controller
                                            name={`sideEffects[${index}].id`}
                                            as={
                                                <Dropdown
                                                    fluid
                                                    selection
                                                    options={
                                                        serverSupportedSideEffectOptions
                                                    }
                                                />
                                            }
                                            control={control}
                                            defaultValue={sideEffect.id}
                                            onChange={([_, data]) => data.value}
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={10}>
                                        <Controller
                                            name={`sideEffects[${index}].frequency`}
                                            as={
                                                <Dropdown
                                                    fluid
                                                    selection
                                                    options={frequencyOptions}
                                                />
                                            }
                                            control={control}
                                            defaultValue={sideEffect.frequency}
                                            onChange={([_, data]) => data.value}
                                        />
                                    </Grid.Column>
                                </Grid.Row>)
                            )}

                        <Grid.Row>
                            <Grid.Column width="16">
                                <Button
                                    fluid
                                    content={
                                        <FormattedMessage
                                            id="app.drug.sideEffects.builder.addSideEffect"
                                            defaultMessage="Add side effect"
                                        />
                                    }
                                    type="button"
                                    style={{ background: 'none', border: '1px dashed grey' }}
                                    onClick={() => appendSideEffect({
                                        id: remainingSideEffectOptions[0].value,
                                        frequency: frequencyOptions[0].value
                                    })}
                                    disabled={remainingSideEffectOptions.length === 0}
                                />
                            </Grid.Column>

                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width="16">
                                <Button
                                    fluid
                                    type="submit"
                                    content={
                                        <FormattedMessage
                                            id="app.drug.sideEffects.builder.submit"
                                            defaultMessage="Submit"
                                        />
                                    }
                                    positive
                                />
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>

                </Form.Field>
            </Form>

        </Tab.Pane>
    );
};

export default SideEffectsBuilder;
