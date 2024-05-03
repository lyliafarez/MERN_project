import { Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import EventType from './pages/AdminEventType/AdminEventType';
import CreateEvent from './pages/CreateEvent/CreateEvent';
import CreateCategory from './pages/CreateCategory/CreateCategory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"/>
        <Route path="/admin/eventtypes" element={<EventType/>}/>
        <Route path="/createEvent" element={<CreateEvent/>}/>
        <Route path="/createCategory" element={<CreateCategory/>}/>
      </Routes>
    </BrowserRouter>
  );
 
}

export default App
      