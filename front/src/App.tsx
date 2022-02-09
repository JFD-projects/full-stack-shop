import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Main from './main';
import Admin from './admin';
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  return (
    <div className="container-fluid p-0">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Main />} />
          <Route path="admin/*" element={<Admin />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
