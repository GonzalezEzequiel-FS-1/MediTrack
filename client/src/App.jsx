import "./App.css";
import styled from "styled-components";
import RightPanel from "./panels/RightPanel";
import CenterPanel from "./panels/CenterPanel";
import LeftPanel from "./panels/LeftPanel";
import TopBar from "./panels/TopBar";


const bg = "#2f2f2f";
const mainHeight = "85vh";
function App() {
  return (
    <MainContainer>
      <TopBar background={bg} />
      <DataContainer>
        <LeftPanel
          height={mainHeight}
          background={bg}
        />
        <CenterPanel  height={mainHeight} background={bg} />
        <RightPanel height={mainHeight} background={bg} />
      </DataContainer>
    </MainContainer>
  );
}

export default App;

const MainContainer = styled.div`
  background: linear-gradient(90deg, #353535, #515151, #515151, #353535);
  width: 95%;
  height: 98%;
  border-radius: 20px;
  border: 0.75px solid #949494d1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
`;

const DataContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 0.5rem;

`;
