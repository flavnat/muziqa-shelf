import styled from "@emotion/styled";

export const DashboardContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
`;

export const ListWrapper = styled.div`
  /* border: 1px solid white; */
  width: 100%;
  max-width: 800px;
  padding: 1rem;
  box-sizing: border-box;
`;

export const SongsHeader = styled.div`        
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 695px;
  margin-bottom: 2rem;
  gap: 1rem;
`;

export const TextContainer = styled.div`
  min-width: 0; 
  flex: 1;

  h1 {
    margin: 0;
    font-size: 1.8rem;
    text-transform: uppercase;
    font-weight: 400;
  }

  h2 {
    margin: 0;
    font-size: 1.1rem;
    color: #ccc;
    font-weight: 300;
  }
`;

export const AddButton = styled.button`
  background-color: #6e7f6e;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: fit-content;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #436445;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;