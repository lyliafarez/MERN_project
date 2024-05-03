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
    const [searchQuery, setSearchQuery] = useState<string>(''); // State for search input
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
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update search query
  };

  const filteredUsers = users.filter(
    (user) =>
      user.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchQuery.toLowerCase())
  );
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
                {/* <p className="text-30 text-white p-3 rounded-t-lg">Edit Events</p> */}
            </div>
            <div className="bg-customGrayBlueFront p-6">
                <div className='py-6'>
                <input type="text" placeholder="Enter text" className="border border-gray-300 rounded px-2 py-1 text-sm p-2.5 w-72" value={searchQuery} onChange={handleSearchChange}/>
                </div>
                <div className='pb-6 flex justify-between px-5'>
                    <div className='flex'>
                        {/* <input type="checkbox" id="selectAll" className="w-4 h-4 text-blue-500" /> */}
                        <p  className="text-white text-lg font-medium ml-3">Name</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white my-1 ml-3"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                    </div>
                    <div className='flex'>    
                        <p  className="text-white text-lg font-medium">Username</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white my-1 ml-3"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                    </div>
                    <div className='flex'>
                        <p  className="text-white text-lg font-medium">Events</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white my-1 ml-3"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                    </div>
                    <div  className="mr-20 flex">
                        <p  className="text-white text-lg font-medium">Admin</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white my-1 ml-3"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                    </div>
                </div>
                <div className="border-t border-gray-300 h-1 my-4" /> 
                <div className="p-4 flex justify-between"> 
                <table className="w-full table-auto">
        {/* Table header */}
        {/* <thead>
          <tr>
            <th className="text-left text-white text-lg font-medium py-2 align-middle">Name <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white ml-3 "><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg></th>
            <th className="text-left text-white text-lg font-medium py-2 align-middle">Username <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white ml-3 "><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg></th>
            <th className="text-left text-white text-lg font-medium py-2 align-middle">Actions <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white ml-3 "><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg></th>
          </tr>
        </thead> */}
        {/* Table body */}
        <tbody className="">
            {filteredUsers.map((user) => (
                    <tr key={user.id} className="">
                    <td className="px-4 py-2 text-white">
                        {user.prenom} {user.nom}
                    </td>
                    <td className="px-4 py-2 text-white">
                        {user.prenom.toLowerCase()}
                    </td>
                    <td className="px-4 py-2 flex space-x-2">
                        <button
                        className="bg-blue-500 text-white px-3 py-2 rounded"
                        onClick={() => openPopup(user)}
                        >
                        Edit
                        </button>
                        <button
                        className="bg-customRedButton text-white px-3 py-2 rounded"
                        onClick={() => openPopup(user)}
                        >
                        Delete
                        </button>
                    </td>
                    </tr>
            ))}
        </tbody>

                </table>
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
  );
};

export default UsersList;
