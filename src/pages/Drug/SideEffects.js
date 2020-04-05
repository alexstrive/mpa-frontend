import React from 'react';
import { Table, Tab } from 'semantic-ui-react';

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

const LegendSideEffects = ({ unit, values }) => {
    const formatter = unit === 'cases' ? caseFormatter : percentFormatter;
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

            {values
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

const SideEffects = ({ values }) => {
    const unit = values.legend.__unit;

    const legendItems = Object
        .entries(values.legend)
        .filter(([title, _]) => title !== '__unit');

    return (
        <Tab.Pane>
            <LegendSideEffects unit={unit} values={legendItems} />

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
                    {values.items
                        .map((sideEffect) =>
                            (<Table.Row>
                                <Table.Cell width={3}>
                                    <FormattedMessage
                                        id={`sideEffect.${sideEffect.id}`}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <FormattedMessage
                                        id={`frequency.${sideEffect.value}`}
                                    />
                                </Table.Cell>
                            </Table.Row>)
                        )}
                </Table.Body>
            </Table>
        </Tab.Pane>

    );
};

export default SideEffects;
