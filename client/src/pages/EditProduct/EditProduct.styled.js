import styled from "styled-components";

export default styled.div`
  & .cont {
    & input,
    textarea,
    select {
      width: 100%;
      max-width: 504px;
      height: 40px;
      border-radius: 70px;
      border: 1px solid rgba(195, 212, 233, 0.4);
      padding: 8px 24px;
      margin-top: 14px;

      &::placeholder {
        font-family: "Plus Jakarta Sans";
        font-size: 15px;
        font-weight: 400;
      }
    }

    & h4 {
      margin-top: 18px;
    }

    & textarea {
      border-radius: 20px;
      height: 150px;
    }

    & > div {
      background-color: #ffffff;
      border-radius: 20px;
      padding: 25px 60px 25px 35px;

      display: flex;
      gap: 7px;

      & > .info {
        display: flex;

        & h3 {
          font-weight: 500;
          font-size: 20px;
        }
        & h4 {
          font-weight: 500;
        }

        & p {
          font-weight: 300;
          font-size: 15px;
        }

        & > div > ul {
          display: flex;
          & .active {
            color: #ffffff;
            background-color: #16ab19;
          }
          & li {
            cursor: pointer;

            border: 1px solid #16ab19;
            padding: 10px 40px;

            color: #16ab19;
            background-color: #ffffff;

            font-weight: 500;
            font-size: 15px;

            &:first-child {
              border-radius: 20px 0 0 20px;
              border-right: none;
            }

            &:last-child {
              border-radius: 0 20px 20px 0;
            }
          }
        }
      }
    }
    .offer-product {
      display: flex;
      gap: 50px;
      & .product-info {
        flex: 1.5;
      }

      & .product-pic {
        padding: 50px 20px;
        flex: 0.5;
        & img {
          maxwidth: 500px;
          max-height: 300px;
        }
      }

      & .product-upload {
        max-height: 500px;

        align-items: center;
        justify-content: center;
        flex: 2;
        display: flex;
        flex-direction: column;
        gap: 15px;
        background-color: #f9f9f9;

        & h3 {
          color: #242424;
          font-size: 20px;
          font-weight: 500;
        }
        & p {
          font-size: 12px;
          font-weight: 400;
        }

        & .DragText {
          &.Top {
            display: flex;
            flex-direction: column;

            img {
              align-self: center;
              max-width: 300px;
              max-height: 200px;
            }
          }
        }
      }
    }

    & button {
      margin-bottom: 40px;

      width: 250px;
      height: 40px;

      background-color: #16ab19;
      border-radius: 20px;
      border: none;
      cursor: pointer;

      color: #ffffff;
      font-weight: 600;
      font-size: 15px;
    }
  }
`;
