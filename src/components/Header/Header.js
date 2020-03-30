import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';

import LanguageSelector from '../LanguageSelector';

export const Header = () => {
    return (
        <Menu attached="top">
            <Menu.Item>
                <Link to={'/patients'} exact>
                    <FormattedMessage id={'app.menu.patients'} />
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to={'/drugs'} exact>
                    <FormattedMessage id={'app.menu.drugs'} />
                </Link>
            </Menu.Item>

            <Menu.Menu position="right">
                <Menu.Item><LanguageSelector /></Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};
