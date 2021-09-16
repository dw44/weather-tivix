import styled from 'styled-components';

const StyledMessage = styled.div`
  position: absolute;
  top: 100px;
  left: 40%;
  width: 400px;
  height: 160px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.85);
  padding: 30px;
  font-size: 1.5em;
  color: #2DEA8F;
  text-align: center;
  z-index: 10;
  p {
    margin-bottom: 10px;
  }
`;

export default function QueryError() {
  return (
    <StyledMessage>
      <p>No Results Found</p>
      <p>Please Enter A Valid Query</p>
    </StyledMessage>
  );
}
