import styled from "styled-components";

export default styled.div`
  display: flex;

  & .coins {
    flex: 2;
    padding: 35px 60px 30px 40px;

    & h3 {
      font-weight: 500;
      font-size: 25px;
    }

    & h4 {
      font-weight: 500;
      font-size: 25px;
      color: #16ab19;
    }
    & h5 {
      font-weight: 500;
      font-size: 25px;
      color: #de8807;
    }

    & .action {
      display: flex;

      justify-content: space-between;

      & div {
        display: flex;
        flex-direction: column;
        gap: 10px;

        & button {
          font-weight: 600;
          font-size: 15px;
          padding: 13px 90px;

          background-color: #16ab19;

          &:last-child {
            background-color: #de8807;
          }
        }
      }
    }
    & .info {
      margin-top: 25px;
      display: flex;
      background-color: #ffffff;
      justify-content: space-between;

      border-radius: 20px;
      padding: 30px 50px;

      & .change {
        display: flex;
        flex-direction: column;
        gap: 17px;
        align-items: center;

        button {
          font-weight: 300;
          font-size: 15px;
          padding: 15px 105px;

          background-color: #f9f9f9;
          color: #2d2d2d;
        }

        & div {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background-color: #16ab19;

          cursor: pointer;

          justify-content: center;
          display: flex;
        }
      }
    }
  }
`;
