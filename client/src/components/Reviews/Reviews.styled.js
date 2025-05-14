import styled from "styled-components";

export default styled.div`
  display: flex;
  gap: 17px;

  padding: 30px;

  & .info {
    display: flex;
    flex-direction: column;
    gap: 15px;

    & p {
      font-weight: 400;
      font-size: 18px;
    }
    & h3 {
      color: #2d2d2d;
      font-weight: 500;
      font-size: 23px;
    }

    & .about {
      display: flex;
      justify-content: space-between;
    }
  }
`;
