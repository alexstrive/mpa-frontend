import React from 'react';
import { Menu } from 'semantic-ui-react';
import { headerRoutes } from '../../constants';
import { Link } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';

export const Header = () => {
    return (
        <Menu attached="top">
            {headerRoutes.filter(route => route.name).map(route => (
                <Link to={route.path} key={route.name}>
                    <Menu.Item as={'li'}>
                        <FormattedMessage id={route.localeId} />
                    </Menu.Item>
                </Link>
            ))}
        </Menu>
    );
};
