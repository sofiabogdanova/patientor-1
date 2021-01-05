import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {addPatient, setDiagnosisList, updatePatient, useStateValue} from "../state";
import axios from "axios";
import {Diagnosis, Entry, Gender, Patient} from "../types";
import {apiBaseUrl} from "../constants";
import {EntryForm} from "./EntryForm";
import {Button} from "semantic-ui-react";
import AddVisitModal from "../AddVisitModal";
import {PatientFormValues} from "../AddPatientModal/AddPatientForm";
import {VisitFormValues} from "../AddVisitModal/AddVisitForm";


const PatientPage: React.FC = () => {
    const [{patients, diagnoses}, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [patient, setPatient] = useState();
    const [diagnosesExist, setDiagnosesExist] = useState(false);
    const {id} = useParams<{ id: string }>();
    const extendedInfoExists = patients && patients[id] && patients[id].ssn;

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
    };
    const submitNewVisit = async (values: VisitFormValues) => {
        try {
            const {data: updatedPatient} = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch(updatePatient(updatedPatient));
            closeModal();
        } catch (e) {
            console.error(e.response.data);
        }
    }

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
        for (let i = 0; i < codes.length; i++) {
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
                <AddVisitModal
                    modalOpen={modalOpen}
                    onSubmit={submitNewVisit}
                    onClose={closeModal}
                />
                <br/>
                <Button onClick={() => openModal()}>Add New Hospital Visit</Button>
            </div>
        );
    } else {
        return (<>
            </>
        );
    }

};

export default PatientPage;