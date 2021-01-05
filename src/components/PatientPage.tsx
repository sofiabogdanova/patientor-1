import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {addPatient, setDiagnosisList, useStateValue} from "../state";
import axios from "axios";
import {Diagnosis, Entry, Gender, Patient} from "../types";
import {apiBaseUrl} from "../constants";
import {EntryForm} from "./EntryForm";


const PatientPage: React.FC = () => {
    const [{patients, diagnoses}, dispatch] = useStateValue();
    const [patient, setPatient] = useState();
    const [diagnosesExist, setDiagnosesExist]= useState(false);
    const {id} = useParams<{ id: string }>();
    const extendedInfoExists = patients && patients[id] && patients[id].ssn;
    useEffect(() => {
        if (!extendedInfoExists) {
            const getExtendedPatientInfo = async () => {
                try {
                    const {data: patientExtendedInfo} = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                    dispatch(addPatient(patientExtendedInfo));
                } catch (e) {
                    console.error(e.response.data);
                }
            };
            getExtendedPatientInfo();
        } else {
            setPatient(patients[id])
            if (!diagnosisInfoExists(patients[id])) {
                getDiagnosesInfo();
            }
        }

    }, [patients, diagnoses])

    const getDiagnosesInfo = async () => {
        try {
            const {data: diagnosesInfo} = await axios.get<Diagnosis[]>(
                `${apiBaseUrl}/diagnoses`
            );
            dispatch(setDiagnosisList(diagnosesInfo));
        } catch (e) {
            console.error(e.response.data);
        }
    };

    const diagnosisInfoExists = (patientInfo: Patient) => {
        const codes = patientInfo.entries
            .flatMap((entry: Entry) => entry.diagnosisCodes)
            .filter(entry => entry != undefined);
        for (let i=0; i<codes.length; i++) {
            const code = codes[i];
            if (!code || !diagnoses[code]) {
                setDiagnosesExist(false);
                return false;
            }
        }

        setDiagnosesExist(true);
        return true;
    }
    if (patient && diagnosesExist) {
        const icon = patient.gender === Gender.Male ? "mars icon" :
            patient.gender === Gender.Female ? "venus icon" :
                "genderless icon"
        return (<div>
                <h1>{patient.name} <i className={icon}></i></h1>
                <p>ssn: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
                <h3>entries:</h3>
                <div>
                    {
                        patient.entries.map((entry: Entry) => (
                            <EntryForm key={entry.id} entry={entry}/>
                        ))
                    }
                </div>
            </div>
        );
    } else {
        return (<>
            </>
        );
    }

};

export default PatientPage;