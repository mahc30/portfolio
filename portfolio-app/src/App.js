import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { Home } from './components/home/Home.jsx'
import { ShowOff } from './components/play/ShowOff.jsx';

function App() {

    return ( 
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="showoff" element={<ShowOff />} />
      </Routes>
    );
}

export default App;