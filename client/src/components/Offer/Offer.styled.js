import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  background: #fff;

  & .image-cont {
    height: 200px;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 16px 16px 0 0;
  }

  & .info {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 10px 15px 20px 15px;

    & > div {
      & h3 {
        font-size: 16px;
        font-weight: 500;
      }

      & p {
        margin-top: 3px;

        font-size: 14px;
        font-weight: 400;
      }
    }
    & button {
      border: none;
      border-radius: 20px;
      cursor: pointer;

      padding: 13px 100px;
      background-color: #de8807;

      color: #ffffff;
      font-weight: 600;
      font-size: 15px;
    }
  }
`;
