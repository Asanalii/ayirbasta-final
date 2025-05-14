import styled from "styled-components";

export default styled.div`
  .header {
    background-color: #fff;
    border: 1px solid rgba(195, 212, 233, 0.4);

    &__logo {
      cursor: pointer;
    }

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__page {
      & ul {
        display: flex;
        gap: 40px;
        color: #596780;

        & li {
          font-family: "Plus Jakarta Sans";
          font-weight: 600;
          font-size: 18px;
          cursor: pointer;
        }
      }
    }
    & .active-page {
      font-family: "Montserrat";
      font-weight: 600;

      border-bottom: 2px solid #16ab19;
      color: #16ab19;

      padding-bottom: 4px;
    }

    &__action {
      display: flex;
      gap: 20px;

      .button {
        width: 40px;
        height: 40px;
        border: 2px solid #c3d4e966;
        &:last-child {
          & img {
            width: 40px;
          }
        }
      }

      button {
        border: 2px solid #c3d4e966;
        cursor: pointer;
        width: 120px;
        background-color: #16ab19;
        border-radius: 20px;
        font-weight: 600;

        a {
          color: white;
        }
      }
    }
  }
`;
