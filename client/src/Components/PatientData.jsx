import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import DefaultButton from "./Button";
import TextField from "./TextField";

export default function PatientData() {
  const [patient, setPatient] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [TMID, setTMID] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [service, setService] = useState("");
  const [status, setStatus] = useState("");
  const [typeOfPhysical, setTypeOfPhysical] = useState("");
  const [testToPerform, setTestToPerform] = useState([]); // stays as array

  const handleGetPatient = async (patient) => {
    if (!patient) {
      setError(true);
      setErrorMessage("No Team Member Data Available");
      return;
    }

    try {
      const link = `http://localhost:3000/api/patient?TMID=${patient}`;
      const request = await axios.get(link, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!request.data || !request.data.message) {
        setError(true);
        setErrorMessage("Team Member not found in the database");
        return;
      }

      const tm = request.data.message.patient;
      const visitArray = request.data.message.visit;
      const latestVisit =
        Array.isArray(visitArray) && visitArray.length > 0
          ? visitArray[visitArray.length - 1]
          : null;

      if (!latestVisit) {
        setError(true);
        setErrorMessage("No visits found for this patient");
        return;
      }

      setFirstName(tm.firstName);
      setLastName(tm.lastName);
      setTMID(tm.TMID);
      setJobTitle(tm.jobTitle);
      setService(latestVisit.service);
      setStatus(latestVisit.status);
      setTypeOfPhysical(latestVisit.typeOfPhysical);
      setTestToPerform(
        Array.isArray(latestVisit.testToPerform)
          ? latestVisit.testToPerform
          : []
      );

      setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
      setErrorMessage("An error occurred while fetching the patient.");
    }
  };

  useEffect(() => {
    if (!error) {
      setErrorMessage("");
    }
  }, [error]);

  return (
    <Container>
      <Form>
        {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <TextField
          value={patient}
          placeholder={"Team Member ID"}
          onChange={(e) => setPatient(e.target.value)}
        />
        <DefaultButton
          text="Submit"
          onClick={() => handleGetPatient(patient)}
        />
      </Form>

      <DataContainer>
        <Text>{firstName}</Text>
        <Text>{lastName}</Text>
        <Text>{TMID}</Text>
        <Text>{jobTitle}</Text>
        <Text>{service}</Text>
        <Text>{status}</Text>
        <Text>{typeOfPhysical}</Text>

        {testToPerform.length > 0 ? (
          testToPerform.map((test, index) => <Text key={index}>{test}</Text>)
        ) : (
          <Text>No tests assigned</Text>
        )}
      </DataContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: red;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60%;
  padding: 2rem;
  gap: 1rem;
  border: 0.75px solid #949494d1;
  border-radius: 10px;
  box-shadow: 5px 5px 15px #000000a4;
  background-color: #1a1a1a;
  position: relative;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: 600;
  letter-spacing: 0.15rem;
  font-size: 1.5rem;
  position: absolute;
  top: 1rem;
  text-align: center;
`;

const Text = styled.p`
  color: white;
  font-weight: 600;
  letter-spacing: 0.15rem;
  font-size: 0.75rem;
  text-align: center;
  text-transform: capitalize;
`;
