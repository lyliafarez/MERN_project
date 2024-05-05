import { Routes, Route, BrowserRouter} from 'react-router-dom'
import './App.css'
import UsersList from './pages/admin/UsersList';
import Main from './pages/Events/Main';
import NavBar from './Components/NavBar';
import 'bootstrap';
import EventType from './pages/AdminEventType/AdminEventType'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup';
import CreateEvent from './pages/CreateEvent/CreateEvent';
import EditEvent from './pages/EditEvent/EditEvent';
import EditUserForm from './pages/admin/EditUserForm';


function App() {
  return (
    <BrowserRouter>
    {/* <NavBar/> */}
      <Routes>
        <Route path="/"/>
        <Route path="/register" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin/eventtypes" element={<EventType/>}/>
        <Route path="/users" element={<UsersList/>} /> 
        <Route path="/userEdit/:id" element={<EditUserForm/>} /> 
        <Route path="/events" element={<Main/>}/>
        <Route path="/createEvent" element={<CreateEvent/>}/>
        <Route path="/edit-event/:eventId" element={<EditEvent/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App
      