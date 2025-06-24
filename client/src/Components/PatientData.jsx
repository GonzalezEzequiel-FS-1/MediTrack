import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import DefaultButton from "./Button";
import TextField from "./TextField";

export default function PatientData() {
  const [patientID, setPatientID] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [patient, setPatient] = useState(null);
  const [visits, setVisits] = useState([]);

  const handleGetPatient = async () => {
    if (!patientID) {
      setError(true);
      setErrorMessage("Please enter a Team Member ID.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/api/patient?TMID=${patientID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data.patientAndData;
      const patient = data.patient;
      const visits = data.visit;

      console.log(data.patient);

      if (!patient || !Array.isArray(visits)) {
        throw new Error("Invalid or incomplete response.");
      }

      setPatient(patient);
      setVisits(visits);
      setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
      setErrorMessage("Could not fetch patient data.");
      setPatient(null);
      setVisits([]);
    }
  };

  useEffect(() => {
    if (!error) setErrorMessage("");
  }, [error]);

  return (
    <Container>
      <Form>
        {error && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <TextField
          value={patientID}
          placeholder="Team Member ID"
          onChange={(e) => setPatientID(e.target.value)}
        />
        <DefaultButton text="Submit" onClick={handleGetPatient} />
      </Form>

      {patient && (
        <DataContainer>
          <Heading>Patient Info</Heading>
          <Text>{patient.fullName}</Text>
          <Text>TMID: {patient.TMID}</Text>

          <Heading>Visit History ({visits.length})</Heading>
          {visits.map((visit, index) => (
            <VisitCard key={visit._id}>
              <Text>
                <strong>Visit #{index + 1}</strong>
              </Text>
              <Text>Type: {visit.typeOfPhysical}</Text>
              <Text>Service: {visit.service}</Text>
              <Text>Status: {visit.status}</Text>

              <Text>Tests:</Text>
              {visit.testToPerform?.map((test, i) => (
                <Text key={i}>- {test}</Text>
              ))}

              <Text>Appointments:</Text>
              {visit.appointments?.map((appt, i) => (
                <Text key={i}>
                  📅 {new Date(appt.dateTime).toLocaleString()} @{" "}
                  {appt.location} — {appt.notes}
                </Text>
              ))}
            </VisitCard>
          ))}
        </DataContainer>
      )}
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

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
`;

const Text = styled.p`
  color: white;
  font-weight: 600;
  letter-spacing: 0.05rem;
  font-size: 0.9rem;
  margin: 0.25rem 0;
`;

const Heading = styled.h3`
  color: #00ffcc;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const VisitCard = styled.div`
  background-color: #333;
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem 0;
  box-shadow: 0 0 5px #00000080;
`;
