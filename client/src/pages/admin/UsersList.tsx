// admin/usersList.js
import React, { useState, useEffect } from 'react';
import DeletePopup from '../../components/popups/DeletePopup';
import axios from 'axios';

interface User {
    _id: string; 
    id: number;
    nom: string;
    prenom: string;
    age: number;
    }

const UsersList:React.FC = () =>  {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null); 
    const [checkedUsers, setCheckedUsers] = useState<{ [key: number]: boolean }>({}); // State for checkboxes
    const [isSelectAll, setIsSelectAll] = useState(false); // State for "select all" checkbox

  useEffect(() => {
    axios
      .get<{ users: User[] }>('http://localhost:8080/users') // Expecting an object with 'users' key
      .then((response) => {
        setUsers(response.data.users); // Extract 'users' array from response
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError('Failed to fetch user data');
        
      });
  }, []);
      
        const toggleSelectAll = () => {
            const newIsSelectAll = !isSelectAll; // Toggle the select all state
            setIsSelectAll(newIsSelectAll); // Set the new state

            const updatedCheckedUsers: { [key: number]: boolean } = {};
            users.forEach((user) => {
            updatedCheckedUsers[user.id] = newIsSelectAll; // Set all checkboxes based on select all state
            });
            setCheckedUsers(updatedCheckedUsers);
        };

        const toggleCheckbox = (userId: number) => {
            const updatedCheckedUsers = { ...checkedUsers, [userId]: !checkedUsers[userId] };
            setCheckedUsers(updatedCheckedUsers); 

            // Check if all users are checked to update select all checkbox
            const allChecked = users.every((user) => updatedCheckedUsers[user.id]);
            setIsSelectAll(allChecked);
        };
        const openPopup = (user: User) => {
          setPopupOpen(true);
          setSelectedUser(user);
        };
        const closePopup = () => {
          setPopupOpen(false);
          setSelectedUser(null); 
        };
  return (
    <div className="bg-customGrayBlue h-screen">
        <div className="p-4">
            <div className="flex items-center justify-between w-full  pt-5"> 
                <div className="w-full flex justify-center"> 
                    <button className="bg-green-500 text-white px-4 py-2 rounded">
                    Admin page
                    </button>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded"> 
                    User
                </button>
            </div>
            <div className="flex">
                <p className="text-30 text-white bg-customGrayBlueFront p-3 rounded-t-lg">Edit Users</p>
                <p className="text-30 text-white p-3 rounded-t-lg">Edit Events</p>
            </div>
            <div className="bg-customGrayBlueFront p-6">
                <div className='py-6'>
                <input type="text" placeholder="Enter text" className="border border-gray-300 rounded px-2 py-1 text-sm" />
                </div>
                <div className='pb-6 flex justify-between px-5'>
                    <div>
                        <input type="checkbox" id="selectAll" className="w-4 h-4 text-blue-500" />
                        <label  className="text-white text-lg font-medium mt-1 ml-3 checked={isSelectAll}
              onChange={toggleSelectAll}">Name</label>
                    </div>
                    <div className='flex'>    
                        <p  className="text-white text-lg font-medium">Username</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white mt-1 ml-3"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                    </div>
                    <div className='flex'>
                        <p  className="text-white text-lg font-medium">Events</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white mt-1 ml-3"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                    </div>
                    <div  className="mr-20 flex">
                        <p  className="text-white text-lg font-medium">Admin</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white mt-1 ml-3"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                    </div>
                </div>
                <div className="border-t border-gray-300 h-1 my-4" /> 
                <div className="p-4 bg-gray-100 flex justify-between"> 
                <div className=''>
                    <ul>
                        {users.map((user) => (
                        <li key={user.id}  className='pb-4'>
                            <input type="checkbox" id={`checkbox-${user.id}`} className="w-4 h-4 text-blue-500" checked={!!checkedUsers[user.id]} onChange={() => toggleCheckbox(user.id)} />
                            <label htmlFor={`checkbox-${user.id}`} className="text-gray-700"> {user.prenom} {user.nom}</label>
                        </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <ul>
                        {users.map((user) => (
                        <li key={user.id} className='pb-4'>
                            <p className="text-gray-700"> {user.prenom}</p>
                        </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                    </ul>
                </div>
                <div className='flex'>
                    <ul className='mr-2'>
 
                    </ul>
                    <ul className=''>
                    {users.map((user) => (
                        <li key={user.id} className="mb-2">
                            <button className="bg-blue-500 text-white px-3 py-2 mr-2 rounded"> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                            </button>
                                <button className="bg-customRedButton text-white px-3 py-2 rounded" onClick={() => openPopup(user)} > 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                        </li>
                        ))}
                    </ul>
                    {isPopupOpen && selectedUser && (
                            <DeletePopup isOpen={isPopupOpen} onClose={closePopup}>
                                <h2 className="text-lg font-semibold">Delete User</h2>
                                <p>
                                Are you sure you want to delete {selectedUser.prenom} {selectedUser.nom}?
                                </p>
                                {/* Additional content and buttons */}
                            </DeletePopup>
                            )}
                </div>
                    
                </div>
                
            </div>
        </div>
    </div>
  );
};

export default UsersList;
