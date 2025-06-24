import React, { useState } from "react";
import styled from "styled-components";
import DefaultCalendar from "../Components/calendars/DefaultCalendar";

export default function RightPanel({ height, background }) {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    console.log(`New Date is ${date}`);
  };

  return (
    <Container height={height} background={background}>
      <DefaultCalendar
        onChange={handleDateChange}
        value={date}
        tileContent={""}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 30%;
  height: ${(props) => props.height};
  background-color: ${(props) => props.background};
  border-radius: 10px;
  border: 0.75px solid #949494d1;
  padding: 1rem;
`;

// const Calendar = styled.div`
//   width:100%;
//   height:40%;
//   background-color: red;
//   border-radius: 10px;
//`
