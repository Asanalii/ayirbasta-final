import styled from "styled-components";

export default styled.div`
  display: flex;
  gap: 40px;

  & .empty {
    margin-top: 180px;
    margin-left: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  & .cont {
    padding: 20px 40px;
    & > div {
      display: flex;
      flex-wrap: wrap;
      gap: 50px;

      & > div {
        // max-width: 30%;
        padding: 20px 30px;
      }
      & div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        & a {
          align-self: center;
        }
        & button {
          padding: 13px 80px;
          background-color: #16ab19;
          color: #fffff;
          font-weight: 600;
          font-size: 15px;
        }
        & .swap {
          width: 70px;
          height: 70px;
          background-color: #f9f9f9;
          border-radius: 10px;
          margin: 20px 0;
          display: flex;
          align-self: center;
          justify-content: center;

          & img {
            transform: rotate(90deg);
            align-self: center;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column; // Stack elements vertically
    gap: 20px; // Reduce gap between elements

    & .empty {
      margin-left: 0; // Center empty state on smaller screens
      margin-top: 100px; // Adjust top margin
    }

    & .cont {
      padding: 10px; // Reduce padding for smaller screens
    }

    & .cont > div {
      gap: 30px; // Reduce gap between items
    }

    & .cont > div > div {
      // Adjust max-width for smaller screens
      max-width: 100%; // Allow full width for items
    }
    & .empty {
      margin-top: 80px; // Further adjust top margin
      gap: 20px; // Reduce gap in empty state
    }

    & button {
      padding: 10px 50px; // Reduce button padding
      font-size: 14px; // Adjust font size for buttons
    }
  }
`;
