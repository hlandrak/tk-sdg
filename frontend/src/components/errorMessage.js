import styled from "@emotion/styled";

export const ErrorMessage = styled.div`
  ${({ big }) => `
  color: red;
  font-size: ${big ? "3em" : "2em"};
  padding: 0.125rem;
  border: 2px solid red;
  background-color: White;
  font-weight: bold;
`}
`;

export default ErrorMessage;
