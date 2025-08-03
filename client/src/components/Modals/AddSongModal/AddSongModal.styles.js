import styled from "@emotion/styled";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

export const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: -12px;
  margin-bottom: 10px;
`;

export const SubmitButton = styled.button`
  padding: 10px 16px;
  background-color: #6e7f6e;
  color: white;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #436445;
  }
`;

export const ModalContainer = styled.div`
  width: 400px;
  max-width: 90vw;
  background: #222;
  color: #fff;
  border-radius: 12px;
  padding: 24px 32px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 600px) {
    width: 98vw;
    padding: 16px 8px;
    gap: 1rem;
  }
`;

export const ModalTitle = styled.h2`
  margin: 0 0 12px 0;
  font-size: 1.5rem;
  text-align: center;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
