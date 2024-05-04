import { Routes, Route, BrowserRouter} from 'react-router-dom'
import './App.css'
import UsersList from './pages/admin/UsersList';
import Main from './pages/Events/Main';
import NavBar from './components/NavBar';
import 'bootstrap';
import EventType from './pages/AdminEventType/AdminEventType'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup';
import CreateEvent from './pages/CreateEvent/CreateEvent'
import UserEdit from './pages/admin/UserEdit';


function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/"/>
        <Route path="/register" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin/eventtypes" element={<EventType/>}/>
        <Route path="/list" element={<UsersList/>} /> 
        <Route path="/events" element={<Main/>}/>
        <Route path="/createEvent" element={<CreateEvent/>}/>
      </Routes>
    </BrowserRouter>

  );
 
}

export default App
      