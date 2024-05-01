import { useState , useEffect} from 'react'
import axios from 'axios';
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import { backendApi } from './services/BackendApi'
import User from '../../src/models/User';
import './App.css'
import EventType from './pages/AdminEventType/AdminEventType';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"/>
        <Route path="/admin/eventtypes" element={<EventType/>}/>
      </Routes>
    </BrowserRouter>
  );
 
}

export default App
