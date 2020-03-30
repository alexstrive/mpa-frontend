import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Header, Tab } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const sideEffectsScales = [
    {
        legend: {
            __units: 'case',
            often: '100',
            rare: '1000000',
            veryCommon: '100000'
        },
        items: [
            { id: 1, frequency: 'veryCommon' },
            { id: 2, frequency: 'rare' },
            { id: 3, frequency: 'often' }
        ]
    }, {
        legend: {
            __units: 'percent',
            often: '70',
            rare: '10',
            veryCommon: '50'
        },
        items: [
            { id: 1, frequency: 'veryCommon' },
            { id: 2, frequency: 'rare' },
            { id: 3, frequency: 'often' }
        ]
    }, {
        legend: {
            __units: 'percent-interval',
            less2: '0-2',
            more2: '2-100'
        },
        items: [
            { id: 1, frequency: 'less2' },
            { id: 2, frequency: 'more2' }
        ]
    }
];

const Drug = () => {
    const { id } = useParams();
    const drugs = useSelector(state => state.medicines);

    const drug = drugs
        .filter(insideDrug => insideDrug.id === Number.parseInt(id))[0];

    const tabs = sideEffectsScales.map((sideEffects, i) => (
        {
            menuItem: `Side Effects ${i}`,
            render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>
        }
    ));

    return (
        <Container>
            <Header size="large">
                <FormattedMessage id={`drug.${id}`} />
                <Header.Subheader>{drug && drug.name}</Header.Subheader>
            </Header>
            <Tab
                menu={{ secondary: true, pointing: true }}
                panes={tabs}
            />
        </Container>
    );
};

export default Drug;
