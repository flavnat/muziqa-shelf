import React from "react";
import styled from "styled-components";

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 650px;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PageButton = styled.button`
  background-color: #555;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #777;
  }

  &:disabled {
    background-color: #333;
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  color: white;
  font-size: 1rem;
  font-weight: 500;
`;

export default function Pagination({ page, totalPages, onPageChange }) {
  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  return (
    <PaginationWrapper>
      <PageButton onClick={handlePrev} disabled={page === 1}>
        ← Previous
      </PageButton>

      <PageInfo>
        Page {page} of {totalPages}
      </PageInfo>

      <PageButton onClick={handleNext} disabled={page === totalPages}>
        Next →
      </PageButton>
    </PaginationWrapper>
  );
}
