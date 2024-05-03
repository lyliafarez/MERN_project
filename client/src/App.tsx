import { Routes, Route, BrowserRouter} from 'react-router-dom'
import './App.css'
import EventType from './pages/AdminEventType/AdminEventType';
import UserEdit from './pages/admin/UserEdit';
import UsersList from './pages/admin/UsersList';

function App() {
  return (
   
    <BrowserRouter >
   
      <Routes>
        <Route path="/"/>
        <Route path="/admin/eventtypes" element={<EventType/>}/>
        <Route path="/list" element={<UsersList/>} /> 
      </Routes>
    </BrowserRouter>
  );
 
}

export default App
      