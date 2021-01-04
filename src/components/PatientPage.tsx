import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useStateValue} from "../state";
import axios from "axios";
import {Gender, Patient} from "../types";
import {apiBaseUrl} from "../constants";


const PatientPage: React.FC = () => {
    const [{patients}, dispatch] = useStateValue();
    const [patient, setPatient] = useState();

    const {id} = useParams<{ id: string }>();
    const extendedInfoExists = patients && patients[id] && patients[id].ssn;
    useEffect(() => {
        if (!extendedInfoExists) {
            const getExtendedPatientInfo = async () => {
                try {
                    const {data: patientExtendedInfo} = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                    await dispatch({type: "ADD_PATIENT", payload: patientExtendedInfo});
                    setPatient(patientExtendedInfo.ssn);
                } catch (e) {
                    console.error(e.response.data);
                }
            };
            getExtendedPatientInfo();
        } else {
            setPatient(patients[id])
        }
    }, [ patients])

if (patient) {
    const icon = patient.gender === Gender.Male ? "mars icon" :
        patient.gender === Gender.Female ? "venus icon" :
            "genderless icon"
    return (<div>
            <h1>{patient.name} <i className={icon}></i></h1>
                <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>

        </div>
    );
} else {
    return (<>
        </>
    );
}

};

export default PatientPage;