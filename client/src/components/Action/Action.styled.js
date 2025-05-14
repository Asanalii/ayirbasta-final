import styled from "styled-components";

export default styled.div`
  & .action {
    margin-top: 20px;

    & button {
      padding-top: 20px;
      padding-bottom: 20px;

      background: #16ab19;
      border-radius: 20px;
      border: 0;

      color: #fff;
      font-weight: 600px;
      font-size: 25px;
      line-height: 31px;
      cursor: pointer;
    }

    &__info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    &__social {
      display: flex;
      gap: 15px;
    }
  }
`;
