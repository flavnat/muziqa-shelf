import styled from '@emotion/styled'

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  position: relative;
  background: #545050;
  padding: 24px;
  border-radius: 12px;
  width: 320px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  color: white;
`;

export const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #ffffff;
`;

export const SubTitle = styled.h4`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: #cccccc;
`;
