import styled from "styled-components";

export default styled.div`
  display: flex;

  & .empty {
    margin-top: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 2;
    gap: 30px;

    p {
      text-align: center;
    }

    .button {
      background-color: $green;
      width: 250px;
      height: 50px;
    }
  }
  & .info {
    display: flex;
    justify-content: space-between;

    & button {
      padding: 10px 76px;
      background-color: #16ab19;
      border-radius: 20px;
      border: none;

      color: #ffffff;
      font-size: 15px;

      cursor: pointer;
    }
  }

  & .offers {
    display: flex;
    flex-direction: column;
    flex: 5;

    padding: 40px;
  }
  & .cont {
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    align-items: center;
    gap: 44px;

    margin-top: 30px;
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
