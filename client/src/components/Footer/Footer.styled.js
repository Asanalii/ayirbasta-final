import styled from "styled-components";

export default styled.div`
  background-color: #1e2833;

  .container {
    padding: 50px 0;
    margin: 0 70px;

    & .footer {
      & .offer {
        display: flex;
        justify-content: space-between;

        & .offer-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 25px;
          @media screen and (max-width: 800px) {
            flex-direction: column;
          }

          & p {
            font-weight: 400;
            font-size: 20px;
            color: #fff;
          }
          & button {
            background-color: #16ab19;
            padding: 12px 70px;
            cursor: pointer;

            border-radius: 20px;
            border: none;

            color: #fff;
            font-weight: 600;
            font-size: 15px;

            @media screen and (max-width: 800px) {
              padding: 12px 50px;
            }
          }
        }
      }
      & hr {
        margin: 15px 0;
        border: 1px normal #fff;
        opacity: 0.2;
      }

      & .usefull {
        display: flex;
        justify-content: space-between;

        & .files {
          display: flex;
          gap: 40px;

          @media screen and (max-width: 800px) {
            flex-direction: column;
            gap: 20px;
          }

          & > a {
            font-weight: 400;
            font-size: 15px;
            color: #fff;
          }
        }

        & .social {
          display: flex;
          gap: 40px;
          align-items: center;
        }
      }
    }
  }
`;
