import React, { Suspense } from 'react';
import useSWR from 'swr';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Container, Header, Tab } from 'semantic-ui-react';

import SideEffectGroup from './SideEffectGroup';
import SideEffectGroupBuilder from './SideEffectGroupBuilder';

const Drug = () => {
    const { id: drugId } = useParams();
    const drugs = useSelector(state => state.medicines);

    const { data: sideEffectGroups, mutate } = useSWR(`${process.env.REACT_APP_SIDEEFFECTS_ENDPOINT_URL}?drugId=${drugId}`, {
        suspense: true
    });

    const handleSubmit = (units, items) => {
        mutate([...sideEffectGroups, {
            units,
            items
        }]);
    };

    const drug = drugs
        .filter(currentDrug => currentDrug.id === Number.parseInt(drugId))[0];

    const tabs = sideEffectGroups
        .map((sideEffectGroup, i) => (
            {
                menuItem: `Side Effects ${i + 1}`,
                render: () => <SideEffectGroup units={sideEffectGroup.units} items={sideEffectGroup.items} />
            }
        ))
        .concat({
            menuItem: { key: 'add', icon: 'add', content: 'Add new side effects' },
            render: () => <SideEffectGroupBuilder drugId={drugId} onSubmit={handleSubmit} />
        });

    return (
        <Container>
            <Header size="large">
                <FormattedMessage id={`drug.${drugId}`} />
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
