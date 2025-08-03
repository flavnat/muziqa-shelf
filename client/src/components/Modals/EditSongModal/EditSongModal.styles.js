import styled from "@emotion/styled";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
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

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: -12px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
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

const ModalContainer = styled.div`
  width: 400px;
  max-width: 90vw;
  background: #222;
  color: #fff;
  border-radius: 12px;
  padding: 24px 32px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 600px) {
    width: 98vw;
    padding: 16px 8px;
    gap: 1rem;
  }
`;

const ModalTitle = styled.h2`
  margin: 0 0 12px 0;
  font-size: 1.5rem;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.5rem;
    button {
      width: 100%;
      font-size: 1rem;
      padding: 10px 0;
    }
  }
`;

export default {ModalActions , ModalTitle, ModalContainer , SubmitButton , ErrorMessage , Input , Form}