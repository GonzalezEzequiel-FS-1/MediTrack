import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// ✅ Use StyledCalendar here
export default function DefaultCalendar({ onChange, value, tileContent }) {
  return (
    <StyledCalendar
      onChange={onChange}
      value={value}
      tileContent={tileContent} // <-- use it here
    />
  );
}

const StyledCalendar = styled(Calendar)`
  border: none;
  background-color: #1a1a1a;
  color: white;
  border-radius: 10px;
  padding: 1rem;

  .react-calendar__navigation {
    background-color: #222;
    margin-bottom: 1rem;

    button {
      color: white;
      font-weight: bold;
    }
  }

  .react-calendar__tile {
    background: transparent;
    color: white;
    font-weight: 100;
    width:4rem;
    transition: background 0.3s;

    &:hover {
      background-color: #333;
    }

    &--active {
      background-color: #00aaff;
      color: black;
    }
  }
`;

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
