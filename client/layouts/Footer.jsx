import React from 'react'
import styled from 'styled-components';

export default function Footer() {
  const FooterContainer = styled.footer`
    width: 100%;
    background: #333;
    color: #fff;
    padding: 16px 40px;
    margin-top: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    @media (max-width: 600px) {
      flex-direction: column;
      padding: 10px 8px;
      font-size: 0.95rem;
      text-align: center;
    }
  `;

  return (
    <FooterContainer>
      <p>© 2025 Muziqa Shelf. All rights reserved.</p>
    </FooterContainer>
  )
}
