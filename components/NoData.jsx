import styled from 'styled-components';

const StyledNotification = styled.div`
  width: 100%;
  h2 {
    text-align: center;
    padding: 20px;
    padding-top: 50px;
    font-size: 4em;
  }
`;

export default function NoData() {
  return (
    <StyledNotification>
      <h2>Please Enter A Location To Get The Weather</h2>
    </StyledNotification>
  );
}
