import styled from "styled-components";
const TextField = ({ type, value, onChange, placeholder }) => {
  return (
    <TextInput
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default TextField;

const TextInput = styled.input`
  padding: 0.5rem;
  background-color: #42424230;
  text-align: center;
  font-weight: bold;
  letter-spacing: 0.15rem;
  color:#e3e3e3;
`;
