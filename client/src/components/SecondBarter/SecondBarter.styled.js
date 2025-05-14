import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  background: #fff;

  & .image-cont {
    height: 150px;
    background: ${(props) =>
      props.image ? `url(http://localhost:8080${props.image})` : "#f5f5f5"};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 16px 16px 0 0;
  }

  & .info {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 10px 15px 20px 15px;
    border-radius: 10px;

    & .barter-product {
      background-color: #f9f9f9;
    }
    & div {
      & h3 {
        font-size: 16px;
        font-weight: 500;
      }

      & h2 {
        font-size: 25px;
        font-weight: 500;
      }
      & h4 {
        font-size: 40px;
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

      padding: 13px 80px;
      background-color: #de8807;

      color: #ffffff;
      font-weight: 600;
      font-size: 15px;
    }
  }
`;
