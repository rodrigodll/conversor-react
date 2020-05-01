import React from 'react'
import './App.css';
// import '/public/bootstrap.css';

import logo from './logo150.png';

import Conversor from './components/Conversor'

function App() {
  return (
    <div className="App">

      <div class="container">
        <div class="row">      
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>
      
      <div class="container">
        <div class="row">      
          <Conversor moedaA="BTC" moedaB="BRL"></Conversor>
        </div>
      </div>
    </div>
  );
}

export default App;
