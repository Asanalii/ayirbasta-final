import styled from "styled-components";

export default styled.div`
  display: flex;
  padding: 20px 30px;
  flex-direction: column;
  gap: 15px;

  width: 400px;
  height: 350px;
  background: #ffffff;

  border-radius: 20px;
  & .info {
    display: flex;
    gap: 17px;

    & div {
      & h3 {
        color: #2d2d2d;
        font-size: 23px;
      }
      & p {
        font-weight: 400;
        font-size: 18px;
      }
    }
  }
  & .barter {
    & h3 {
      color: #2d2d2d;
      font-size: 23px;
    }
    & p {
      font-weight: 400;
      font-size: 18px;
    }
  }

  & .buttons {
    display: flex;
    gap: 10px;
    margin-top: auto;

    & button {
      border: 1px solid #de8807;
      padding: 15px 25px;
      border-radius: 20px;
      background-color: transparent;

      color: #de8807;
      font-weight: 600;
      font-size: 15px;

      cursor: pointer;

      &:last-child {
        padding: 15px 50px;

        background-color: #de8807;
        border: none;

        color: #ffffff;
      }
    }
  }
`;
