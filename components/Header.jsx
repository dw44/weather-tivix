/* eslint-disable no-alert */
import styled from 'styled-components';
import { useState } from 'react';

import location from '../util/location';

const StyledHeader = styled.header`
  width: 100vw;
  height: 240px;
  background-color: #2DEA8F;
  
  & * {
    color: #243D44;
  }
  

  h1 {
    text-align: center;
    font-size: 2rem;
    padding: 10px; 
  }

  form { text-align: center; }

  input, 
  select {
    color: 
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

  button {
    display: block;
    margin: 10px auto;
    height: 40px;
    font-weight: 500;
    font-size: 24px;
    width: 100px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.4s;
  }

  button:hover {
    background-color: #ccc;
  }
`;

export default function Header({ getWeather }) {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [usState, setUsState] = useState('');

  const handleChange = (stateSetter, e) => stateSetter(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === '' || country === '') {
      alert('City and Country Must Be Provided');
    } else {
      getWeather(city, country, usState);
    }
  };

  const countryCodes = Object.keys(location.countryCodes);

  return (
    <StyledHeader>
      <h1>Please Enter A Location:</h1>
      <form>
        <input type="text" placeholder="City" value={city} onChange={(e) => handleChange(setCity, e)} />
        <select
          value={country}
          onChange={(e) => handleChange(setCountry, e)}
        >
          <option value="">Pick A Country</option>
          {countryCodes.map((code) => (
            <option key={code} value={code}>{location.countryCodes[code]}</option>
          ))}
        </select>
        <select
          value={country === 'US' ? usState : ''}
          onChange={(e) => handleChange(setUsState, e)}
          disabled={country !== 'US'}
        >
          <option value="">Pick A (US) State</option>
          {location.states.map((state) => (
            <option value={state} key={state}>{state}</option>
          ))}
        </select>
        <button onClick={handleSubmit} type="submit">Search</button>
      </form>
    </StyledHeader>
  );
}
