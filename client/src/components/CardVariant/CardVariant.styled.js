export const CardVariantStyled = styled.div`
  // ... existing styles ...

  .card-stats {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 8px;
  }

  .like-button {
    display: flex;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.2s;
    color: #666;

    svg {
      width: 20px;
      height: 20px;
      transition: all 0.2s;
    }

    &:hover {
      background-color: #f0f0f0;
    }

    &.liked {
      color: #ff4b4b;

      svg {
        fill: #ff4b4b;
      }
    }
  }
`;
