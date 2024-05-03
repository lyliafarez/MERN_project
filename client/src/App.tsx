import { Routes, Route, BrowserRouter} from 'react-router-dom'
import './App.css'
import 'bootstrap'
import EventType from './pages/AdminEventType/AdminEventType'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"/>
        <Route path="/register" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin/eventtypes" element={<EventType/>}/>
      </Routes>
    </BrowserRouter>

  );
 
}

export default App
      