import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Container, Header, Tab } from 'semantic-ui-react';

import SideEffects from './SideEffects';
import SideEffectsBuilder from './SideEffectsBuilder';

const sideEffectsScales = [
    {
        legend: {
            __unit: 'cases',
            veryCommon: { gt: 10 },
            common: { from: 10, to: 100 },
            uncommon: { from: 100, to: 1000 },
            rare: { from: 1000, to: 10000 },
            veryRare: { lt: 10000 }
        },
        items: [
            { id: 1, value: 'veryCommon' },
            { id: 2, value: 'rare' },
            { id: 3, value: 'common' }
        ]
    }, {
        legend: {
            __unit: 'percents',
            greater2: { gt: 2 },
            less2: { lt: 2 }
        },
        items: [
            { id: 1, value: 'greater2' },
            { id: 2, value: 'greater2' },
            { id: 3, value: 'less2' }
        ]
    }
];

const Drug = () => {
    const { id } = useParams();
    const drugs = useSelector(state => state.medicines);

    const drug = drugs
        .filter(currentDrug => currentDrug.id === Number.parseInt(id))[0];

    const tabs = sideEffectsScales
        .map((sideEffects, i) => (
            {
                menuItem: `Side Effects ${i + 1}`,
                render: () => <SideEffects values={sideEffects} />
            }
        ))
        .concat({
            menuItem: { key: 'add', icon: 'add', content: 'Add new side effects' },
            render: () => <SideEffectsBuilder />
        });

    return (
        <Container>
            <Header size="large">
                <FormattedMessage id={`drug.${id}`} />
                <Header.Subheader>{drug && drug.name}</Header.Subheader>
            </Header>
            <Suspense fallback={'loading'}>
                <Tab
                    menu={{ secondary: true }}
                    panes={tabs}
                />
            </Suspense>

        </Container>
    );
};

export default Drug;
