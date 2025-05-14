import styled from "styled-components";

export default styled.div`
  display: flex;
  gap: 40px;

  & .cont {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 1040px;
    padding: 25px 60px 25px 35px;

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
      flex-direction: column;
      gap: 7px;

      & > .info {
        display: flex;
        justify-content: space-between;

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
    & .offer {
      &-product {
        display: flex;
        gap: 40px;
        & .product-info {
          flex: 2;
        }

        & .product-upload {
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
              }
            }
          }
          padding: 20px 30px;
          & .upload-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
          }

          & .upload-pic {
            padding: 60px;
            border: 1px dashed #dee6ee;
            border-radius: 20px;
            height: 200px;
            background-color: #ffffff;
            display: flex;
            flex-direction: column;

            align-items: center;
            justify-content: center;

            & p {
              cursor: pointer;
              span {
                color: #16ab19;
              }
            }
          }

          & .upload-progress {
            margin-top: 20px;
            display: flex;
            gap: 15px;

            & > div {
              flex: 2;
              & > div {
                display: flex;
                justify-content: space-between;
                & > p {
                  color: #242424;
                  font-weight: 400;
                  font-size: 10px;

                  &:last-child {
                    cursor: pointer;
                  }
                }
              }

              & > progress {
                width: 100%;
                accent-color: red;
                &::-webkit-progress-bar {
                  border-radius: 5px;
                }
              }
            }
          }
        }
      }
    }

    & .barterTo {
      &-type {
        & p {
          color: #16ab19;
        }
        & > div {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-top: 10px;

          & > div > div {
            gap: 10px;
            display: flex;
            margin-top: 15px;
          }
        }
      }

      & .add {
        cursor: pointer;
      }
    }

    & .offersType {
      &-cont {
        display: flex;
        justify-content: space-between;
      }
      &-choice {
        display: flex;
        align-items: center;
        gap: 20px;
        input {
          width: 30px;
          height: 30px;
          margin: 0;
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

  @media (max-width: 768px) {
    flex-direction: column; // Stack elements vertically
    gap: 20px; // Reduce gap between elements

    & .empty {
      margin-left: 0; // Center empty state on smaller screens
      margin-top: 100px; // Adjust top margin
    }

    & .cont {
      margin-top: 0;
      width: unset;
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
