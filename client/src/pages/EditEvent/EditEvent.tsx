import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackendApi from '../../services/BackendApi';
import AppLayout from '../../Components/Layouts/AppLayout';

function EditEvent() {
  const { eventId } = useParams(); 
  const backendApi = new BackendApi();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    address: '',
    pictures: [],
    links: [],
    categoryId: '',
    nbPlaces: 0
  });
  const [eventTypes, setEventTypes] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEventConfirmation, setShowEventConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/events/${eventId}`);
        console.log('Données de l\'événement récupérées :', response.data);
        setEventData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'événement :', error);
      }
    };

    fetchEventData();
  }, [eventId]);

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const fetchedEventTypes = await backendApi.getAllEventTypes();
        console.log('Types d\'événements récupérés :', fetchedEventTypes);
        setEventTypes(fetchedEventTypes);
      } catch (error) {
        console.error('Erreur lors de la récupération des types d\'événements :', error);
      }
    };

    fetchEventTypes();
  }, [backendApi]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/registrations/event/${eventId}`);
        console.log('Inscriptions récupérées :', response.data.registrations);
        const registrationsData = response.data.registrations;
        
        const registrationsDetails = await Promise.all(registrationsData.map(async (registration) => {
          const userResponse = await axios.get(`http://localhost:8080/users/${registration.userId}`);
          const userName = userResponse.data.user.name + " " + userResponse.data.user.lastname;
          return {
            ...registration,
            userName: userName
          };
        }));

        setRegistrations(registrationsDetails);
      } catch (error) {
        console.error('Erreur lors de la récupération des inscriptions :', error);
      }
    };

    fetchRegistrations();
  }, [eventId]);

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:8080/events/${eventId}`, eventData);
      console.log('Événement mis à jour avec succès :', eventData);
      navigate('/events');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'événement :', error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const uploadedImages = files.map((file) => URL.createObjectURL(file));
    setEventData(prevData => ({
        ...prevData,
        pictures: [...prevData.pictures, ...uploadedImages]
    }));
};

  const handleRemoveImage = (indexToRemove) => {
    setEventData(prevData => ({
        ...prevData,
        pictures: prevData.pictures.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleDeleteEvent = async () => {
    setShowEventConfirmation(true);
  };

  const confirmDeleteEvent = async () => {
    try {
      await axios.delete(`http://localhost:8080/events/${eventId}`);
      console.log('Événement supprimé avec succès.');
      navigate('/events');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'événement :', error);
    }
  };

  const cancelDeleteEvent = () => {
    setShowEventConfirmation(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancelRegistration = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/registrations/${eventId}/${userId}`);
      const response = await axios.get(`http://localhost:8080/registrations/event/${eventId}`);
      console.log('Inscriptions après annulation :', response.data.registrations);
      setRegistrations(response.data.registrations);
    } catch (error) {
      console.error('Erreur lors de l\'annulation de l\'inscription :', error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setUserToDelete(null);
  };

  const openConfirmationDialog = (userId) => {
    setUserToDelete(userId);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      await handleCancelRegistration(userToDelete);
      setShowConfirmation(false);
      setUserToDelete(null);
    }
  };

  return (
    <AppLayout>
      <div className="bg-gray-600 min-h-screen flex justify-center items-center">
        <div className="max-w-md w-full p-8 bg-gray-600 rounded-lg">
          <h1 className="text-2xl mb-4 text-white">Edit an event:</h1>
          <div className="edit-event-form space-y-4">

            <div className="flex flex-col">
                <label className="text-white edit-event-label">Event title:</label>
                <input type="text" name="title" value={eventData.title} onChange={handleChange} className="input bg-gray-100 rounded-md" />
            </div>

            <div className="flex flex-col">
                <label className="text-white edit-event-label">Event description:</label>
                <textarea name="description" value={eventData.description} onChange={handleChange} className="input bg-gray-100 rounded-md"></textarea>
            </div>

            <div className="flex flex-col">
                <label className="text-white edit-event-label">Event date:</label>
                <input type="date" name="date" value={eventData.date} onChange={handleChange} className="input bg-gray-100 rounded-md" />
            </div>

            <div className="flex flex-col">
                <label className="text-white edit-event-label">Address:</label>
                <input type="text" name="address" value={eventData.address} onChange={handleChange} className="input bg-gray-100 rounded-md" />
            </div>

            <div className="flex flex-col">
                <label className="text-white edit-event-label">Number of places:</label>
                <input type="number" name="nbPlaces" value={eventData.nbPlaces} onChange={handleChange} className="input bg-gray-100 rounded-md" min="0" />
            </div>

            <div className="flex flex-col">
                <label className="text-white edit-event-label">Pictures:</label>
                {eventData.pictures.map((pictureUrl, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <img src={pictureUrl} alt={`Image ${index}`} className="w-32 h-32 object-cover rounded-md" />
                        <button onClick={() => handleRemoveImage(index)} className="btn bg-red-500 text-white rounded-md">Delete</button>
                    </div>
                ))}
                <input type="file" name="pictures" multiple onChange={handleImageChange} className="input bg-gray-100 rounded-md" />
            </div>

            
            <div className="flex flex-col">
                <label className="text-white edit-event-label">Links:</label>
                <input type="text" name="links" value={eventData.links} onChange={handleChange} className="input bg-gray-100 rounded-md" />
            </div>

            <div className="flex flex-col">
                <label className="text-white edit-event-label">Event type:</label>
                <select name="categoryId" value={eventData.categoryId} onChange={handleChange} className="input bg-gray-100 rounded-md">
                <option value="">Select an event type</option>
                {eventTypes.map((eventType) => (
                    <option key={eventType.id} value={eventType.id}>
                    {eventType.label}
                    </option>
                ))}
                </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-white edit-event-label">Registered users:</label>
              <ul>
                    {registrations.map((registration) => (
                        <li className="text-white edit-event-label" key={registration.userId}>
                            {registration.userName} <button className="btn bg-red-500 text-white rounded-md" onClick={() => openConfirmationDialog(registration.userId)}>Delete</button>
                        </li>
                    ))}
              </ul>
            </div>

            {showConfirmation && (
                <div className="text-white ml-2">
                    <p>Are you sure you want to delete this registration? ?</p>
                    <button onClick={confirmDelete} className="btn bg-red-500 text-white rounded-md">Yes</button>
                    <button onClick={cancelDelete} className="btn bg-blue-500 text-white rounded-md">No</button>
                </div>
            )}

            {showEventConfirmation  && (
              <div className="text-white ml-2">
                <p>Are you sure you want to delete this event?</p>
                <button onClick={confirmDeleteEvent} className="btn bg-red-500 text-white rounded-md">Yes</button>
                <button onClick={cancelDeleteEvent} className="btn bg-blue-500 text-white rounded-md">No</button>
              </div>
            )}

            <button onClick={handleSubmit} className="btn bg-blue-500 text-white rounded-md w-full float-left">Save</button>
            <button onClick={handleDeleteEvent} className="btn bg-red-500 text-white rounded-md w-full float-left">Delete Event</button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default EditEvent;
