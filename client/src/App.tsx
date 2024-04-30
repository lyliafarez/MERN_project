import { useState , useEffect} from 'react'
import axios from 'axios';
import User from '../../src/models/User';
import './App.css'

function App() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    // Fetch data from the Express server
    axios.get('http://localhost:8080/users/')
      .then((response) => {setUsers(response.data.users)
        console.log(response.data.users)
      })
      .catch(error => console.error(error));
  }, []);
  return (
    <div>
      <h1>MERN Stack Todo App</h1>
      <ul>
        {users.map((user:User) => (
          <li key={user._id}>{user.nom}</li>
        ))}
      </ul>
    </div>
  );
 
}

export default App
