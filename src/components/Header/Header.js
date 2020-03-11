import React from 'react';
import { Menu } from 'semantic-ui-react';
import { headerRoutes } from '../../constants';
import { Link } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';

import LanguageSelector from '../LanguageSelector';

export const Header = () => {
    return (
        <Menu attached="top">

            {headerRoutes.filter(route => route.name).map(route => (
                <Menu.Item>
                    <Link to={route.path} key={route.name}>
                        <FormattedMessage id={route.localeId} />
                    </Link>
                </Menu.Item>
            ))}

            <Menu.Menu position="right">
                <Menu.Item><LanguageSelector /></Menu.Item>
            </Menu.Menu>

        </Menu>
    );
};
