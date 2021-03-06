import * as actionCreators from '../reducers/patient';
import * as service from '../../Services/patientService';

export const get = (id) => {
    return async dispatch => {
        const patient = await service.getPatientById(id);

        console.log('GOT PATIENT', patient);

        dispatch(actionCreators.put(patient));
    };
};

export const create = (data) => {
    return async dispatch => {
        await service.createPatient(data);

        // TODO: maybe dispatch something??
    };
};

export const clear = () => dispatch => dispatch(actionCreators.clear());
