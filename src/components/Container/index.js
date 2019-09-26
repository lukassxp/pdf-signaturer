import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }

    input {
      flex: 1;
      border: 3px solid #eee;
      margin-left: 10%;
      padding: 10px 15px;
      border-radius: 4px;
      font-size: 16px;
    }
  }
`;

export default Container;
