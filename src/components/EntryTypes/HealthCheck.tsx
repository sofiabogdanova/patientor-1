import React from "react";
import {HealthCheckEntry} from "../../types";
import {useStateValue} from "../../state";
import {Form, Segment} from "semantic-ui-react";
import HealthRatingBar from "../HealthRatingBar";

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({entry}) => {
    const [{diagnoses}, dispatch] = useStateValue();
    return (
        <Segment>
            <Form>
                <h4>{entry.date} <i className="user doctor icon"></i></h4>
                <p>{entry.description}</p>
                <ul>
                    {entry.diagnosisCodes?.map((code: string) => (
                        <li key={code}>{code}: {diagnoses[code].name}
                        </li>
                    ))}
                </ul>
                <HealthRatingBar showText={false} rating={entry.healthCheckRating}/>
            </Form>
        </Segment>

    );
}

export default HealthCheck