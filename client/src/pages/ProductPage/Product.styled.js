import styled from "styled-components";

export default styled.div`
  padding: 40px 60px;

  @media screen and (max-width: 800px) {
    padding: 40px 50px;
  }
  & h2 {
    color: #2d2d2d;
    font-size: 35px;
    font-weight: 600;

    margin-top: 57px;
  }
  & .cardOffers {
    margin-top: 30px;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 35px;
  }

  & .reviews {
    margin-top: 30px;

    background: #ffffff;
    display: flex;
    flex-direction: column;

    border-radius: 20px;

    &__btn {
      display: flex;
      align-items: center;
      justify-content: center;

      padding-bottom: 20px;

      p {
        cursor: pointer;
      }
    }
  }
`;
