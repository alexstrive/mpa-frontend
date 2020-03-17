import React from 'react';

import { PatientsList } from './components/PatientsList/PatientsList';
import { Patient } from './components/Patient/Patient';
import { Associations } from './components/Associations/Associations';
import { CurrentState } from './components/CurrentState/CurrentState';
import { States } from './components/States/States';
import { NewPatientForm } from './components/NewPatientForm/NewPatientForm';
import { PatientHistory } from './components/PatientHistory/PatientHistory';

import Anamnesis from './components/Anamnesis';

export const headerRoutes = [
    {
        name: 'Пациенты',
        path: '/patients',
        localeId: 'app.menu.showPatients',
        component: PatientsList,
        exact: true
    },
    {
        name: 'Создать пациента',
        path: '/patients/new',
        localeId: 'app.menu.createPatient',
        component: NewPatientForm,
        exact: true
    },
    {
        path: '/patient/:patientId',
        component: Patient
    }
];

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
        localeId: 'app.patient.sidebard.anamensis',
        component: () => <React.Suspense fallback={() => 'loading'}><Anamnesis /> </React.Suspense>
    }
];

export const routes = sidebarRoutes.map(route => ({
    ...route,
    path: `/patient/:patientId/${route.path}`
}));
