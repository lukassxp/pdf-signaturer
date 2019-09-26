import styled, { css, keyframes } from 'styled-components';

export const SignContainer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;

  canvas {
    border: 3px solid #eee;
    border-radius: 4px;
    background: white;
    width: 100%;
    height: 100%;
    padding: 3px;
  }

  div {
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    button {
      background: #1a82cc;
      border: 0;
      padding: 15px;
      margin-left: 10px;
      border-radius: 4px;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const PdfContainer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;

  iframe {
    border: 3px solid #eee;
    border-radius: 4px;
    background: white;
    width: 100%;
    height: 100%;
    min-height: 500px;
    padding: 3px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SignButton = styled.button.attrs(props => ({
  type: 'button',
  disabled: props.loading,
}))`
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;
