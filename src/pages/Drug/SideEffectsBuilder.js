import React, { useMemo } from 'react';
import { Tab, Dropdown, Form, Grid, Button } from 'semantic-ui-react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import useSWR from 'swr';

import { createNewScale } from '../../api/sideEffects';

const unitOptions = [
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

const legends = {
    'cases': {
        __unit: 'cases',
        veryCommon: { gt: 10 },
        common: { from: 10, to: 100 },
        uncommon: { from: 100, to: 1000 },
        rare: { from: 1000, to: 10000 },
        veryRare: { lt: 10000 }
    },
    'percents': {
        __unit: 'percents',
        greater2: { gt: 2 },
        less2: { lt: 2 }
    }
};

const SideEffectsBuilder = () => {
    const { data: serverSupportedSideEffectIds } = useSWR(
        `${process.env.REACT_APP_SIDEEFFECTS_ENDPOINT_URL}/getSupportedIds`,
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

    const { register, getValues, setValue, handleSubmit, control } = useForm({
        defaultValues: {
            legend: legends.cases,
            sideEffects: []
        }
    });

    const { legend } = getValues();

    const {
        fields: sideEffects,
        append: appendSideEffect
    } = useFieldArray({
        control,
        name: 'sideEffects',
        keyName: 'key'
    });

    const frequencyOptions = useMemo(
        () => Object.keys(legend)
            .filter(key => key !== '__unit')
            .map(key => ({
                key,
                text: <FormattedMessage id={`frequency.${key}`}/>,
                value: key
            })),
        [legend]
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

    const saveSideEffects = (data) => {
        createNewScale(data.legend, data.sideEffects);
    };

    return (
        <Tab.Pane>
            <Form onSubmit={handleSubmit(saveSideEffects)}>
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
                                options={unitOptions}
                                selection
                                ref={register('legend')}
                                onChange={(_, data) => setValue('legend', legends[data.value])}
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
