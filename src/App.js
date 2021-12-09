import React from 'react';
import {
  HashRouter,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import css from './App.css';
import Home from './pages/Home/Home';
import SupplyAndBorrow from './pages/SupplyAndBorrow/SupplyAndBorrow';
import Stream from './pages/Stream/Stream';
import Assets from './pages/Assets/Assets';
import Streams from './pages/Streams/Streams';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/supply-and-borrow" element={<SupplyAndBorrow/>}></Route>
        <Route path="/stream" element={<Stream/>}></Route>
        <Route path="/assets" element={<Assets/>}></Route>
        <Route path="/streams" element={<Streams/>}></Route>
      </Routes>
    </HashRouter>
   
  );
}


export default App;