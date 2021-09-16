import styled from 'styled-components';
import { useState, useEffect } from 'react';

import location from '../util/location';

const StyledHeader = styled.header`
  width: 100vw;
  height: 100%;
  background-color: #ce5cff;

  h1 {
    text-align: center;
    color: #eeeeee;
    font-size: 2rem;
    margin: 10px; 
  }

  form { text-align: center; }

  input, 
  select {
    width: 50%;
    display: block;
    margin: 6px auto;
    border-radius: 4px;
    font-size: 20px;
    padding: 4px;
    border: none;
  }

  select {
    display: inline-block;
    width: 20%;
    margin: 10px;
  }
`;

export default function Header() {
  // set to true if country = usa
  const [enableStatePicker, setEnableStatePicker] = useState(false);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [usState, setUsState] = useState('');

  const handleChange = (e, stateSetter) => stateSetter(e.target.value);

  const countryCodes = Object.keys(location.countryCodes);

  // toggle state picker on/off based on the US being selected
  useEffect(() => {
    if (country === 'US') {
      setEnableStatePicker(true);
    } else {
      setEnableStatePicker(false);
    }
  }, [country]);

  return (
    <StyledHeader>
      <h1>Please Enter A Location:</h1>
      <form>
        <input type="text" placeholder="City" value={city} onChange={(e) => handleChange(e, setCity)} />
        <select
          value={usState}
          onChange={(e) => handleChange(e, setUsState)}
        >
          <option value="">Select A Country</option>
          {countryCodes.map((code) => (
            <option key={code} value={code}>{location.countryCodes[code]}</option>
          ))}
        </select>
        <select
          value={country}
          onChange={(e) => handleChange(e, setCountry)}
        >
          <option value="">Pick A State</option>
          {location.states.map((state) => (
            <option value={state} key={state}>{state}</option>
          ))}
        </select>
      </form>
    </StyledHeader>
  );
}
