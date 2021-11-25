import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainHome from './pages/MainHome/MainHome';
import Home from './pages/Home/Home';


const App = () => {

  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainHome/>}/>
            <Route path="/home" element={<Home/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}


export default App;


