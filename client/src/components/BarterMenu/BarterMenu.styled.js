import styled from "styled-components";

export default styled.div`
  .barterMenu {
    width: 300px;
    height: 900px;
    background-color: #fff;
    padding: 30px;

    & .settings-mt {
      margin-top: 60px;
    }

    & .logout-mt {
      margin-top: 360px;
    }

    @media screen and (max-width: 768px) {
      width: auto;
      height: auto;
      padding: 20px;

      & .settings-mt {
        margin-top: 0px;

        @media screen and (max-width: 768px) {
          // flex-direction: column;
        }
      }

      & .logout-mt {
        margin-top: 20px;

        @media screen and (max-width: 768px) {
          margin-bottom: 0;
        }
      }
    }

    &-main {
      display: flex;
      flex-direction: column;

      @media screen and (max-width: 768px) {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        flex-direction: column;
      }
    }

    ul {
      font-weight: 400;
      color: #93a8cc;
      display: flex;
      flex-direction: column;
      gap: 30px;

      @media screen and (max-width: 768px) {
        flex-direction: row;
        gap: 20px;
        align-items: center;

        justify-content: space-between;
        margin-bottom: 20px;
      }

      li {
        display: flex;
        gap: 17px;
        align-items: center;
        color: #596780;
        cursor: pointer;
        text-transform: uppercase;

        p {
          font-weight: 400;
          font-size: 18px;
        }
      }
      .active {
        border-radius: 20px;
        height: 50px;

        background-color: #de8807;
        padding: 10px;

        p {
          color: white;
        }
      }
    }
  }
`;
