import styled from '@emotion/styled';

export const HomeContainer = styled.div`
  background: #333333;
  color: white;
  width: 100%;
`;

// ✅ Extract layout into its own styled component
export const HomeSection = styled.section`
  min-height: 100vh;
  padding: 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 2rem;
    text-align: center;
  }
`;

export const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.5rem;

  @media (max-width: 768px) {
    padding-left: 0;
    align-items: center;
    text-align: center;
  }
`;

export const ImageColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const VinylImage = styled.img`
  width: 300px;
  rotate: 90deg;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 220px;
    rotate: 60deg;
  }
`;

export const HeadlineText = styled.h1`
  font-size: 4.5rem;
  font-weight: 500;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

export const SubHeadlineText = styled.h2`
  font-weight: 400;
  color: #a3a1a1ff;
  font-size: 1rem;
  margin-top: 0.9rem;
  line-height: 1.6rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.5rem;
  }
`;

export const ActionButton = styled.button`
  background: #6e7f6e;
  color: inherit;
  border: none;
  margin-top: 2rem;
  width: fit-content;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  outline: none;
  cursor: pointer;

  a {
    text-decoration: none;
    color: inherit;
  }
`;