import React, { Suspense } from 'react';
import useSWR from 'swr';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { Container, Header, Tab, Loader } from 'semantic-ui-react';

import SideEffectGroup from './SideEffectGroup';
import SideEffectGroupBuilder from './SideEffectGroupBuilder';

const Drug = () => {
    const intl = useIntl();
    const { id: drugId } = useParams();
    const drugs = useSelector(state => state.medicines);
    const drug = drugs
        .filter(currentDrug => currentDrug.id === Number.parseInt(drugId))[0] || {};

    const { data: sideEffectGroups, mutate } = useSWR(`${process.env.REACT_APP_SIDEEFFECTS_ENDPOINT_URL}?drugId=${drugId}`, {
        suspense: true
    });

    const handleAddGroup = (units, items) => {
        mutate([...sideEffectGroups, {
            units,
            items
        }]);
    };

    const tabs = sideEffectGroups
        .map((sideEffectGroup, i) =>
            ({
                menuItem: intl.formatMessage({ id: 'drug.sideEffects.group' }, { number: i + 1 }),
                render: () => <SideEffectGroup units={sideEffectGroup.units} items={sideEffectGroup.items} />
            })
        )
        .concat({
            menuItem: { key: 'add', icon: 'add', content: intl.formatMessage({ id: 'drug.sideEffects.group.add' }) },
            render: () => <SideEffectGroupBuilder drugId={drugId} onSubmit={handleAddGroup} />
        });

    return (
        <Container>
            <Header size="large">
                <FormattedMessage id={`drug.${drugId}`} />
                <Header.Subheader>{drug.name}</Header.Subheader>
            </Header>
            <Suspense
                fallback={Loader}
            >
                <Tab
                    menu={{ secondary: true }}
                    panes={tabs}
                />
            </Suspense>
        </Container>
    );
};

export default Drug;
