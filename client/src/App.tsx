import { Routes, Route, BrowserRouter} from 'react-router-dom'
import './App.css'
import EventType from './pages/AdminEventType/AdminEventType';
import Main from './pages/Events/Main';
import NavBar from './Components/NavBar';

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/"/>
        <Route path="/admin/eventtypes" element={<EventType/>}/>
        <Route path="/events" element={<Main/>}/>
      </Routes>
    </BrowserRouter>
  );
 
}

export default App
      