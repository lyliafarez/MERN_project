import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User } from './UserTypes';
import AppLayout from '../../Components/Layouts/AppLayout';
import showSweetAlert from '../../helpers/showSweetAlert';

const EditUserForm: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate(); 
  
  const [formData, setFormData] = useState<User | null>(null); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 

  // Function to handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      const { name, checked } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: checked }));
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/users/${id}`)
        .then((response) => {
          setFormData(response.data.user); // Extract the "user" from the response
        })
        .catch((err) => {
          setError("Failed to fetch user data.");
        });
    }
  }, [id]); // Dependency on the ID
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsLoading(true); 
    setError(null); 

    try {
      if (id && formData) {
        const response = await axios.patch(
          `http://localhost:8080/users/${id}`,
          formData 
        );
        navigate('/users', { state: { userModified: true } });
        showSweetAlert("success","The user is updated successfully !","success","Done")
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setError("An error occurred while updating the user. Please try again."); 
    } finally {
      setIsLoading(false); 
    }
  };

  if (formData === null) {
    return <div>Loading...</div>; 
  }
  

  return (
    <AppLayout>
      <div className="bg-gray-600 min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full p-8 bg-gray-600 rounded-lg">
        <h1 className="text-2xl mb-4 text-white text-center">Edit user </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-white">Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="input bg-gray-100 rounded-md p-1" />
          </div>
          <div className="flex flex-col">
            <label className="text-white">Lastname:</label>
            <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} className="input bg-gray-100 rounded-md p-1"></input>
          </div>
          <div className="flex flex-col">
            <label className="text-white">Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="input bg-gray-100 rounded-md p-1" />
          </div>
          <div className="flex flex-col">
            <label className="text-white">Age :</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} className="input bg-gray-100 rounded-md p-1" />
          </div>
          <div className="flex ">
            <label className="text-white">Admin</label>
            <input type="checkbox" name="isAdmin" checked={formData.isAdmin}  onChange={handleCheckboxChange} className="input bg-gray-100 rounded-md ml-1" />
          </div>
          <button
            type="button"
            onClick={() => navigate('/users')}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 ml-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
    </AppLayout>
    
  );
};

export default EditUserForm;







