// admin/usersList.js
import React, { useState, useEffect } from 'react';
import DeletePopup from '../../components/popups/DeletePopup';
import axios from 'axios';

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
    
      const sortedUsers = [...users].sort((a, b) => {
        let valueA = a[sortField];
        let valueB = b[sortField];
    
        if (typeof valueA === 'string') {
          valueA = valueA.toLowerCase();
          valueB = valueB.toLowerCase();
        }
    
        if (isSortAsc) {
          return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        } else {
          return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
        }
      });
    
      const filteredUsers = sortedUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.lastname.toLowerCase().includes(searchQuery.toLowerCase())
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
                    <button className=" text-white px-4 py-2 rounded text-xl">
                    Welcome
                    </button>
                </div>
                <button className="bg-blue-500 text-white p-2 rounded-full flex justify-center items-center h-16 w-16">
                </button>
            </div>
            <div className="flex">
                <p className="text-lg text-white bg-customGrayBlueFront p-3 rounded-t-lg">Edit Users</p>
                {/* <p className="text-30 text-white p-3 rounded-t-lg">Edit Events</p> */}
            </div>
            <div className="bg-customGrayBlueFront p-6">
                <div className='py-6'>
                <input type="text" placeholder="Search for user" className="border border-gray-300 rounded px-2 py-1 text-sm p-2.5 w-72" value={searchQuery} onChange={handleSearchChange}/>
                </div>
                <div className='pb-6 flex justify-between px-5'>
                    <div className='flex'>
                        {/* <input type="checkbox" id="selectAll" className="w-4 h-4 text-blue-500" /> */}
                        <p  className="text-white text-lg font-medium ml-3">Name</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 my-1 ml-3 text-white transition-transform ${sortField === 'name' && !isSortAsc ? 'rotate-180' : ''}`} onClick={() => changeSortField('name')}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg>
                    </div>
                    <div className='flex'>    
                        <p  className="text-white text-lg font-medium">Email</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 my-1 ml-3 text-white transition-transform ${sortField === 'email' && !isSortAsc ? 'rotate-180' : ''}`} onClick={() => changeSortField('email')}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                    </div>
                    <div className='flex'>
                        <p  className="text-white text-lg font-medium">Age</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 my-1 ml-3 text-white transition-transform ${sortField === 'age' && !isSortAsc ? 'rotate-180' : ''}`} onClick={() => changeSortField('age')}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                        <p  className="text-white text-lg font-medium ml-10">Admin</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 my-1 ml-3 text-white transition-transform ${sortField === 'isAdmin' && !isSortAsc ? 'rotate-180' : ''}`} onClick={() => changeSortField('isAdmin')}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"  /></svg>
                    </div>
                    <div  className="mr-12 flex">
                        
                    </div>
                </div>
                <div className="border-t border-gray-300 h-1 my-2" /> 
                <div className="p-4 flex justify-between"> 
                <table className="w-full table-auto">
        {/* Table header */}
        {/* <thead>
          <tr>
            <th className="text-left text-white text-lg font-medium py-2 align-middle">Name <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white ml-3 "><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg></th>
            <th className="text-left text-white text-lg font-medium py-2 align-middle">Email <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white ml-3 "><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg></th>
            <th className="text-left text-white text-lg font-medium py-2 align-middle">Age <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white ml-3 "><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg></th>
            <th className="text-left text-white text-lg font-medium py-2 align-middle">Admin <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white ml-3 "><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg></th>
          </tr>
        </thead> */}
        {/* Table body */}
        <tbody className="">
            {filteredUsers.map((user) => (
                    <tr key={user.id} className="">
                    <td className="px-4 py-2 text-white">
                        {user.lastname} {user.lastname}
                    </td>
                    <td className="px-4 py-2 text-white">
                        {user.email.toLowerCase()}
                    </td>
                    <td className="px-4 py-2 text-white">
                        {user.age}
                    </td>
                    <td className="px-4 py-2 text-white">
                      {user.isAdmin ? "Admin" : "User"} 
                    </td>
                    <td className="px-4 py-2 flex space-x-2">
                        <button
                        className="bg-blue-500 text-white px-3 py-2 rounded"
                        // onClick={() => openPopup(user)}
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
                                Are you sure you want to delete {selectedUser.name} {selectedUser.lastname} ?
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
