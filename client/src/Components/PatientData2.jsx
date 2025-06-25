import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import DefaultButton from "./Button";
import TextField from "./TextField";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

export default function PatientData() {
  const [patientID, setPatientID] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [patient, setPatient] = useState(null);
  const [visits, setVisits] = useState([]);
  const [cardNumber, setCardNumber] = useState(0);

  const formatPatient = (data) => ({
    "First Name": data.firstName,
    "Last Name": data.lastName,
    TMID: data.TMID,
    "Job Title": data.jobTitle,
  });

  const formatVisit = (visit) => ({
    "Type of Physical": visit.typeOfPhysical,
    Service: visit.service,
    "Scheduled Tests": visit.testToPerform?.join(", ") ?? "N/A",
    Status: visit.status,
    "Date and Time": visit.appointments?.[0]?.dateTime ?? "N/A",
  });

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

      const { patient: rawPatient, visit } = response.data.patientAndData;

      if (!rawPatient || !Array.isArray(visit)) {
        throw new Error("Invalid or incomplete response.");
      }

      setPatient(formatPatient(rawPatient));
      setVisits(visit);
      setCardNumber(0);
      setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
      setErrorMessage("Could not fetch patient data.");
      setPatient(null);
      setVisits([]);
    }
  };

  const nextVisit = () => {
    setCardNumber((prev) => Math.min(prev + 1, visits.length - 1));
  };

  const prevVisit = () => {
    setCardNumber((prev) => Math.max(prev - 1, 0));
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
      <DataContainer>
        {patient &&
          Object.entries(patient).map(([key, value]) => (
            <Text key={key}>
              <strong>{key}: </strong>
              {String(value)}
            </Text>
          ))}
      </DataContainer>
      {visits.length > 0 && (
        <VisitCard>
          {Object.entries(formatVisit(visits[cardNumber])).map(
            ([key, value]) => (
              <Text key={key}>
                <strong>{key}: </strong>
                {String(value)}
              </Text>
            )
          )}
          <NavContainer>
            <LeftArrow onClick={prevVisit} disabled={cardNumber === 0} />
            <RightArrow
              onClick={nextVisit}
              disabled={cardNumber === visits.length - 1}
            />
          </NavContainer>
        </VisitCard>
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
  width: 80%;
  min-height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
`;

const LeftArrow = styled(FaChevronCircleLeft)`
  color: #ffffff;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  &:hover {
    color: #a2a2a2;
  }
  &:active {
    transform: scale(0.95);
  }
`;

const RightArrow = styled(FaChevronCircleRight)`
  color: #ffffff;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  &:hover {
    color: #a2a2a2;
  }
  &:active {
    transform: scale(0.95);
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 2rem;
`;
