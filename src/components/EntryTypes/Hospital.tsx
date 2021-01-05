import React from "react";
import {HospitalEntry} from "../../types";
import {useStateValue} from "../../state";
import {Form, Segment} from "semantic-ui-react";

const Hospital: React.FC<{ entry: HospitalEntry }> = ({entry}) => {
    const [{diagnoses}, dispatch] = useStateValue();
    return (
        <Segment>
            <Form>
                <h4>{entry.date} <i className="hospital icon"></i></h4>
                <p>{entry.description}</p>
                <ul>
                    {entry.diagnosisCodes?.map((code: string) => (
                        <li key={code}>{code}: {diagnoses[code].name}
                        </li>
                    ))}
                </ul>
                <h5>Discharge on {entry.discharge.date}</h5>
                <p>Criteria: {entry.discharge.criteria}</p>
            </Form>
        </Segment>

    );
}

export default Hospital