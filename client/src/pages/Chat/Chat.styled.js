import styled from "styled-components";

export default styled.div`
  background-color: #f9f9f9;
  height: 900px;

  & .empty {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 100px;
  }

  & .chat {
    display: flex;
    &-users {
      width: 450px;
      background: #ffffff;

      & .chat-type {
        padding: 30px 72px;
        border: 1px solid rgba(195, 212, 233, 0.4);
        & ul {
          display: flex;
          align-items: center;
          justify-content: center;

          & .active {
            color: #ffffff;
            background-color: #de8807;
          }
          & li {
            cursor: pointer;

            border: 1px solid #de8807;
            padding: 10px 40px;

            color: #de8807;
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

    & .persons {
      display: flex;
      flex-direction: column;
      gap: 10px;
      height: 875px;
      max-height: 675px;

      overflow-x: hidden;
      overflow-y: visible;

      &::-webkit-scrollbar {
        display: none;
      }

      & .person {
        cursor: pointer;
        padding: 10px 30px;

        display: flex;
        gap: 15px;

        & h3 {
          font-weight: 500;
          font-size: 23px;
        }
        &p {
          font-weight: 400;
          font-size: 18px;
        }

        align-items: center;
        &.active {
          background-color: #de8807;
          &:hover {
            background-color: #de8807;
          }

          & p,
          h3 {
            color: #ffffff;
          }
        }
        &:hover {
          background-color: #eaeaea;
        }
      }
    }

    & .chat-info {
      align-self: flex-end;
      flex: 2;
      & > .companion {
        background-color: #ffffff;

        & > div {
          padding: 12px 25px;
          display: flex;
          gap: 17px;

          & img {
            width: 80px;
            height: 80px;
          }

          & > div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
          }
        }

        & .hidden {
          display: none;

          & .chat-user {
            display: block;
          }
        }
      }

      & .correspondence {
        margin-top: auto;

        height: 100%;
        max-height: 700px;

        overflow-x: hidden;
        overflow-y: visible;

        &::-webkit-scrollbar {
          display: none;
        }

        padding: 30px 90px;
        display: flex;
        flex-direction: column;
        gap: 15px;

        & .message-history {
          display: flex;
          align-self: center;
          background-color: rgba(89, 103, 128, 0.4);
          border-radius: 20px;
          padding: 10px 20px;
          color: #ffffff;
          width: 85px;
        }

        & .user-message {
          margin-left: auto;

          & > ul {
            color: #ffffff;
            font-weight: 400px;
            font-size: 20px;

            & > li {
              display: flex;
              justify-content: flex-end;
              gap: 10px;
              align-items: center;
              &:not(:last-child) {
                margin-bottom: 15px;
              }

              & p {
                font-size: 15px;
              }
              & > div {
                background-color: #de8807;
                width: 585px;
                max-width: max-content;
                padding: 10px 20px;
                border-radius: 20px;

                text-align: right;
              }
            }
          }
        }
        & .companion-message {
          margin-right: auto;

          & > ul {
            color: #596780;
            font-weight: 400px;
            font-size: 20px;

            & > li {
              display: flex;
              justify-content: flex-start;
              gap: 10px;
              align-items: center;
              &:not(:last-child) {
                margin-bottom: 15px;
              }

              & p {
                font-size: 15px;
              }
              & > div {
                background-color: #ffffff;
                width: 585px;
                max-width: max-content;
                padding: 10px 20px;
                border-radius: 20px;
              }
            }
          }
        }
        &-input {
          display: flex;
          gap: 10px;
          justify-content: space-between;
          align-items: center;
          & input {
            width: 100%;
            padding: 27px 40px;
            color: #a5a7aa;

            border: none;
            border-radius: 20px;
          }
        }
      }
    }
  }
`;
