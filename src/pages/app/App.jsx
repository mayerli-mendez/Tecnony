import logPrin from '../../img/logo2rem.png';
import './App.css';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts';

export const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logPrin} className="App-logo" alt="logo" />
        <h1 className='text-4xl font-bold'>Tecnony</h1>
        <h2 className='text-2xl font-bold'>Bienvenido  {user.full_name}</h2>
      </header>
    </div>
  );
}
