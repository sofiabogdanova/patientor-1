import React from "react";
import {OccupationalHealthcareEntry} from "../../types";
import {useStateValue} from "../../state";
import {Form, Segment} from "semantic-ui-react";

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({entry}) => {
    const [{diagnoses}, dispatch] = useStateValue();
    return (
        <Segment>
            <Form>
                <h4>{entry.date} <i className="cog icon"></i></h4>
                <p>{entry.description}</p>
                <ul>
                    {entry.diagnosisCodes?.map((code: string) => (
                        <li key={code}>{code}: {diagnoses[code].name}
                        </li>
                    ))}
                </ul>
                <h5>Employed by: {entry.employerName}</h5>
                <p>Sick leave: {entry.sickLeave?.startDate} -{entry.sickLeave?.endDate}</p>
            </Form>
        </Segment>

    );
}

export default OccupationalHealthcare