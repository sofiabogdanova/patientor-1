import React from "react";
import {Button, Grid} from "semantic-ui-react";
import {Field, Form, Formik} from "formik";

import {DiagnosisSelection, NumberField, TextField} from "../AddPatientModal/FormField";
import {HealthCheckEntry} from "../types";
import {useStateValue} from "../state";

export type VisitFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
    onSubmit: (values: VisitFormValues) => void;
    onCancel: () => void;
}

export const AddVisitForm: React.FC<Props> = ({onSubmit, onCancel}) => {
    const [{diagnoses}, dispatch] = useStateValue();
    return (
        <Formik
            initialValues={{
                type: "HealthCheck",
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
                healthCheckRating: 0
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.name = requiredError;
                }
                if (!values.date) {
                    errors.ssn = requiredError;
                }
                if (!values.specialist) {
                    errors.dateOfBirth = requiredError;
                }
                if (!values.diagnosisCodes) {
                    errors.occupation = requiredError;
                }
                if (!values.healthCheckRating) {
                    errors.occupation = requiredError;
                }
                return errors;
            }}
        >
            {({isValid, dirty, setFieldValue, setFieldTouched}) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date Of Visit"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Field
                            label="healthCheckRating"
                            name="healthCheckRating"
                            component={NumberField}
                            min={0}
                            max={3}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddVisitForm;
