import { Routes, Route, BrowserRouter} from 'react-router-dom'
import './App.css'
import Main from './pages/Events/Main';
import NavBar from './Components/NavBar';
import 'bootstrap';
import EventType from './pages/AdminEventType/AdminEventType'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup';
import CreateEvent from './pages/CreateEvent/CreateEvent'

function App() {
  return (
    <BrowserRouter>
    {/* <NavBar/> */}
      <Routes>
        <Route path="/"/>
        <Route path="/register" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin/eventtypes" element={<EventType/>}/>
        <Route path="/events" element={<Main/>}/>
        <Route path="/createEvent" element={<CreateEvent/>}/>
      </Routes>
    </BrowserRouter>

  );
 
}

export default App
      