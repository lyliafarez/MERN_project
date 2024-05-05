import React, { useState, useEffect, ChangeEvent } from 'react';
import DeletePopup from '../../Components/popups/DeletePopup';
import UserDeleteConfirmationPopup from '../../Components/popups/UserDeleteConfirmationPopup';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import UserEditPopup from '../../Components/popups/UserEditPopup'; 
import AppLayout from '../../Components/Layouts/AppLayout';
import showSweetAlert from '../../helpers/showSweetAlert';

interface User {
  _id: string; 
  id: number;
  name: string;
  lastname: string;
  email: string;
  age: number;
  isAdmin: boolean;
  password: string;
}

const UsersList: React.FC = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sortField, setSortField] = useState<string>('name');
  const [isSortAsc, setIsSortAsc] = useState(true);
  const [isUserModified, setIsUserModified] = useState(false); 
  const [isUserDeleted, setIsUserDeleted] = useState(false); 
  const [loggedUser, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    axios
      .get<{ users: User[] }>('http://localhost:8080/users')
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser._id); // Handle deletion
    }
  };

  const handleEditUser = (user: User) => {
    navigate(`/userEdit/${user._id}`); 
  };

  const toggleSortOrder = () => {
    setIsSortAsc((prev) => !prev);
  };

  const changeSortField = (field: string) => {
    if (sortField === field) {
      toggleSortOrder(); // Toggle the order if sorting by the same field
    } else {
      setSortField(field);
      setIsSortAsc(true); // Reset to ascending order
    }
  };

  //spread operator for filtering user
  const sortedUsers = [...users].sort((a, b) => {
    let valueA = a[sortField];
    let valueB = b[sortField];

    if (typeof valueA === 'string') {
      valueA = valueA?.toLowerCase();
      valueB = valueB?.toLowerCase();
    }

    if (isSortAsc) {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else {
      return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
    }
  });

  //handles the filter user and put the names to lowercase to avoid error
  const filteredUsers = sortedUsers.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      user.lastname?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  // Check if the navigation state indicates a user was modified
  useEffect(() => {
    if (location.state && location.state.userModified) {
      setIsUserModified(true); // Trigger modal if a user was modified
      setTimeout(() => {
        setIsUserModified(false); // Hide the modal after 3 seconds
      }, 3000);
    }
  }, [location.state]);

  useEffect(() => {
    if (isUserDeleted) {
      const timer = setTimeout(() => {
        setIsUserDeleted(false); // Hide the confirmation popup after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Clean up the timer if the component unmounts
    }
  }, [isUserDeleted]);

  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:8080/users/${userId}`); // DELETE request
      setUsers(users.filter((user) => user._id !== userId)); // Remove deleted user
      setSelectedUser(null); // Close popup
      //setIsUserDeleted(true); // Trigger deletion confirmation popup
      showSweetAlert("success","The user is deleted successfully !","success","Done")
    } catch (error) {
      console.error("Error deleting user:", error);
      showSweetAlert("error","The user could not be deleted !","error","Done")
    }
  };

  const openPopup = (user: User) => {
    setPopupOpen(true);
    setSelectedUser(user);
  };

  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  },[])
  
  return (
    <AppLayout>
      <div className="bg-customGrayBlue h-screen">
        <div className="p-4">
          <div className="flex items-center justify-between w-full pt-5"> 
          </div>
          <div className="flex">
            <p className="text-lg text-white bg-customGrayBlueFront p-3 rounded-t-lg">Edit Users</p>
          </div>
          <div className="bg-customGrayBlueFront p-6">
            <div className='py-6'>
              <input type="text" placeholder="Search for user" className="border border-gray-300 rounded px-2 py-1 text-sm p-2.5 w-72" value={searchQuery} onChange={handleSearchChange}/>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-white border-b border-gray-500">Name
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 my-1 ml-3 text-white transition-transform ${sortField === 'name' && !isSortAsc ? 'rotate-180' : ''}`} onClick={() => changeSortField('name')}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg></th>
                    <th className="px-4 py-2 text-white border-b border-gray-500">Email
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 my-1 ml-3 text-white transition-transform ${sortField === 'lastname' && !isSortAsc ? 'rotate-180' : ''}`} onClick={() => changeSortField('lastname')}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg></th>
                    <th className="px-4 py-2 text-white border-b border-gray-500">Age
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 my-1 ml-3 text-white transition-transform ${sortField === 'age' && !isSortAsc ? 'rotate-180' : ''}`} onClick={() => changeSortField('age')}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg></th>
                    <th className="px-4 py-2 text-white border-b border-gray-500">Admin
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 my-1 ml-3 text-white transition-transform ${sortField === 'isAdmin' && !isSortAsc ? 'rotate-180' : ''}`} onClick={() => changeSortField('isAdmin')}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg></th>
                    <th className="px-4 py-2 text-white border-b border-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, id) => (
                    <tr key={id} className="">
                      <td className="px-4 py-2 text-white">{user.name} {user.lastname}</td>
                      <td className="px-4 py-2 text-white">{user.email.toLowerCase()}</td>
                      <td className="px-4 py-2 text-white">{user.age}</td>
                      <td className="px-4 py-2 text-white">{user.isAdmin ? "Admin" : "User"}</td>
                      <td className="px-4 py-2 flex space-x-2">
                        <button className="bg-blue-500 text-white px-3 py-2 rounded" onClick={() => handleEditUser(user)}>Edit</button>
                        { loggedUser._id != user._id && <button className="bg-customRedButton text-white px-3 py-2 rounded" onClick={() => openPopup(user)}>Delete</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {isPopupOpen && selectedUser && (
                <DeletePopup isOpen={isPopupOpen} onDelete={handleDelete} onClose={() => setPopupOpen(false)} >
                  <h2>Are you sure you want to delete {selectedUser.name} {selectedUser.lastname}?</h2>
                </DeletePopup>
              )}
             {/* <UserEditPopup isOpen={isUserModified} onClose={() => setIsUserModified(false)} message="User successfully modified!" />
              <UserDeleteConfirmationPopup isOpen={isUserDeleted} message="User successfully deleted!" onClose={() => setIsUserDeleted(false)}  /> */}
            </div>
          </div>
        </div> 
      </div>
    </AppLayout>
  );
};

export default UsersList;
