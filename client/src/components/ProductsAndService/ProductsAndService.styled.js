import styled from "styled-components";

// Add these styles to your styled component
export const PaginationStyled = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;

    button {
      padding: 8px 16px;
      border: 1px solid #ddd;
      background-color: gray;
      cursor: pointer;
      border-radius: 4px;

      &:disabled {
        background-color: #b8b2b2;
        cursor: not-allowed;
      }

      &.active {
        background-color: rgb(222, 136, 7);
        color: white;
        border-color: rgb(222, 136, 7);

        &:hover {
          background-color: rgb(231 164 63);
        }
      }

      &:hover:not(:disabled, .active) {
        background-color: #b8b2b2;
      }
    }
  }
`;
