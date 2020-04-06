import React from 'react';
import { Table, Tab } from 'semantic-ui-react';
import legends from './legends';
import { FormattedMessage } from 'react-intl';

const caseFormatter = (value) => {
    if (typeof value === 'object') {
        if (value.gt) {
            return `≥ 1⁄${value.gt}`;
        }

        if (value.lt) {
            return `< 1⁄${value.lt}`;
        }

        return `1⁄${value.from} – 1⁄${value.to}`;
    }
};

const percentFormatter = (value) => {
    if (typeof value === 'object') {
        if (value.gt) {
            return `≥ ${value.gt}%`;
        }

        if (value.lt) {
            return `< ${value.lt}%`;
        }

        return null;
    }
};

const LegendSideEffects = ({ units, values }) => {
    const formatter = units === 'cases' ? caseFormatter : percentFormatter;

    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={3}>
                        <FormattedMessage
                            id="app.drug.sideEffects.legend.header.title"
                        />
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        <FormattedMessage
                            id="app.drug.sideEffects.legend.header.frequency"
                        />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            {Object.entries(values)
                .map(([legend, frequency], i) =>
                    (<Table.Row key={i}>
                        <Table.Cell>
                            <FormattedMessage
                                id={`frequency.${legend}`}
                            />
                        </Table.Cell>
                        <Table.Cell>{formatter(frequency)}</Table.Cell>
                    </Table.Row>)
                )}
        </Table>
    );
};

const SideEffectGroup = ({ units, items }) => {
    return (
        <Tab.Pane>
            <LegendSideEffects units={units} values={legends[units]} />

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            <FormattedMessage
                                id="app.drug.sideEffects.table.header.title"
                            />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            <FormattedMessage
                                id="app.drug.sideEffects.table.header.frequency"
                            />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {items
                        .map((sideEffect) =>
                            (<Table.Row>
                                <Table.Cell width={3}>
                                    <FormattedMessage
                                        id={`sideEffect.${sideEffect.id}`}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <FormattedMessage
                                        id={`frequency.${sideEffect.frequency}`}
                                    />
                                </Table.Cell>
                            </Table.Row>)
                        )}
                </Table.Body>
            </Table>
        </Tab.Pane>

    );
};

export default SideEffectGroup;
