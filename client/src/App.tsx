import { Routes, Route, BrowserRouter} from 'react-router-dom'
import './App.css'
import EventType from './pages/AdminEventType/AdminEventType';
import CreateEvent from './pages/CreateEvent/CreateEvent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"/>
        <Route path="/admin/eventtypes" element={<EventType/>}/>
        <Route path="/createEvent" element={<CreateEvent/>}/>
      </Routes>
    </BrowserRouter>
  );
 
}

export default App
      