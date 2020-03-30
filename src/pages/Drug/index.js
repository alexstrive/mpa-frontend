import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Header, Tab } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import SideEffects from './SideEffects';
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
        .filter(insideDrug => insideDrug.id === Number.parseInt(id))[0];

    const tabs = sideEffectsScales.map((sideEffects, i) => (
        {
            menuItem: `Side Effects ${i}`,
            render: () => <Tab.Pane attached={false}><SideEffects values={sideEffects} /></Tab.Pane>
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
