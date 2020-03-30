import React from 'react';

import { Associations } from './components/Associations/Associations';
import { CurrentState } from './components/CurrentState/CurrentState';
import { States } from './components/States/States';
import { PatientHistory } from './components/PatientHistory/PatientHistory';
import Anamnesis from './components/Anamnesis';

export const sidebarRoutes = [
    {
        name: 'Черновик состояния',
        path: 'draft',
        localeId: 'app.patient.sidebar.draft',
        component: States
    },
    {
        name: 'Текущее состояние',
        path: 'current',
        localeId: 'app.patient.sidebar.status',
        component: CurrentState
    },
    {
        name: 'История',
        path: 'history',
        localeId: 'app.patient.sidebar.history',
        component: PatientHistory
    },
    {
        name: 'Ассоциации',
        path: 'associations',
        localeId: 'app.patient.sidebar.associations',
        component: Associations
    },
    {
        name: 'Anamnesis',
        path: 'anamnesis',
        localeId: 'app.patient.sidebar.anamnesis',
        component: () => <React.Suspense fallback={() => 'loading'}><Anamnesis /> </React.Suspense>
    }
];

export const routes = sidebarRoutes.map(route => ({
    ...route,
    path: `/patient/:patientId/${route.path}`
}));
