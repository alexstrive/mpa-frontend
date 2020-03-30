import React, { Suspense } from 'react';

import { Route, Switch } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { SemanticToastContainer } from 'react-semantic-toasts';

import 'react-semantic-toasts/styles/react-semantic-alert.css';
import 'semantic-ui-css/components/reset.min.css';
import 'semantic-ui-css/components/site.min.css';
import 'semantic-ui-css/components/container.min.css';
import 'semantic-ui-css/components/icon.min.css';
import 'semantic-ui-css/components/message.min.css';
import 'semantic-ui-css/components/header.min.css';

import Drug from './pages/Drug';
import Patients from './pages/Patients';
import { Patient } from './components/Patient/Patient';

import './App.css';

export const App = () => (
    <div className="App">
        <Header/>
        <main className={'Main'}>
            <Suspense fallback={() => 'loading'}>
                <Switch>
                    <Route path='/drug/:id' component={Drug} />
                    <Route path='/patients' component={Patients}/>
                    <Route path='/patient/:patientId' component={Patient} />
                </Switch>
            </Suspense>

        </main>
        <SemanticToastContainer position='bottom-right' />
    </div>

);
