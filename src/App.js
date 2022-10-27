import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom'
import { Suspense } from "react";
import { useRoutes } from 'react-router-dom';

import routes from "./router";

function App() {
  return (
    <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
            {useRoutes(routes)}
        </Suspense>
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.js</code> and save to reload.*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</header>*/}
    </div>
  );
}

export default App;
