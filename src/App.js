import React from 'react'
import './App.css';
// import '/public/bootstrap.css';

import logo from './logo150.png';

import Conversor from './components/Conversor'

function App() {
  return (
    <div className="App">

      <header className="header">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12">
              <img src={logo} className="header__logo" alt="logo" />
            </div>
            <div className="col-12">
              <nav className="header__menu">
                <ul>
                  <li>
                    <a href="/" className="active">Exchange</a>
                  </li>
                  <li>
                    <a href="/">About</a>
                  </li>
                  <li>
                    <a href="/">Contact</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3 className="heading">
              My first APP built on <a href="https://pt-br.reactjs.org/" target="_blank">React JS</a>, a currency exchange solution created with the goal of personal development.
            </h3>
          </div>
          <Conversor/>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="">
                Rodrigodll <a href="http://github.com/rodrigodll/" target="_blank">github</a> © 2020
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
