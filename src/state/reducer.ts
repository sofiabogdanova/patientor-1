import {State} from "./state";
import {Diagnosis, Patient} from "../types";

export const setPatientList = (payload: Patient[]): Action => {
    return {
        type: "SET_PATIENT_LIST",
        payload: payload
    }
}

export const setDiagnosisList = (payload: Diagnosis[]): Action => {
    return {
        type: "SET_DIAGNOSIS_LIST",
        payload: payload
    }
}

export const addPatient = (payload: Patient): Action => {
    return {
        type: "ADD_PATIENT",
        payload: payload
    }
}

export const updatePatient = (payload: Patient): Action => {
    return {
        type: "UPDATE_PATIENT",
        payload: payload
    }
}

export type Action =
    | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
}
    | {
    type: "ADD_PATIENT";
    payload: Patient;
}   | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
}   | {
    type: "UPDATE_PATIENT";
    payload: Patient;
}

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_PATIENT_LIST":
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({...memo, [patient.id]: patient}),
                        {}
                    ),
                    ...state.patients
                }
            };
        case "SET_DIAGNOSIS_LIST":
            return {
                ...state,
                diagnoses: {
                    ...action.payload.reduce(
                        (memo, diagnosis) => ({...memo, [diagnosis.code]: diagnosis}),
                        {}
                    ),
                    ...state.diagnoses
                }
            }
        case "ADD_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload
                }
            };
        case "UPDATE_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload
                }
            };
        default:
            return state;
    }
};
