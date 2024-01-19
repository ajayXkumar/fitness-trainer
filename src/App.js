import './App.css';
import React ,{useState} from 'react';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyCalendar from './pages/MyCalendar';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/calendar" element={<MyCalendar/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
