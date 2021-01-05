import React from "react";
import {useStateValue} from "../state";
import {Entry} from "../types";
import Hospital from "./EntryTypes/Hospital";
import HealthCheck from "./EntryTypes/HealthCheck";
import OccupationalHealthcare from "./EntryTypes/OccupationalHealthcare";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

export const EntryForm: React.FC<{ entry: Entry }> = ({entry}) => {
    const [{diagnoses}, dispatch] = useStateValue();
    switch(entry.type) {
        case "Hospital":
            return <Hospital entry={entry}></Hospital>
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry={entry}></OccupationalHealthcare>
        case "HealthCheck":
            return <HealthCheck entry={entry}></HealthCheck>
        default:
            assertNever(entry)
            return <div></div>
    }
    return (<div>
            {entry.diagnosisCodes?.map((code: string) => (
                <div key={code}>
                    <p>{code}: {diagnoses[code].name}</p>
                </div>
            ))}
        </div>
    );

};

//export default EntryForm;