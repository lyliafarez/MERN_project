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

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/events/${eventId}`);
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
        setEventTypes(fetchedEventTypes);
        console.log(fetchedEventTypes);
      } catch (error) {
        console.error('Erreur lors de la récupération des types d\'événements:', error);
      }
    };

    fetchEventTypes();
  }, [backendApi]);

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:8080/events/${eventId}`, eventData);
      navigate('/events');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'événement :', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <AppLayout>
      <div className="bg-gray-600 min-h-screen flex justify-center items-center">
        <div className="max-w-md w-full p-8 bg-gray-600 rounded-lg">
          <h1 className="text-2xl mb-4 text-white">Modifier un événement</h1>
          <div className="edit-event-form space-y-4">

            <div className="flex flex-col">
                <label className="text-white edit-event-label">Titre de l'événement:</label>
                <input type="text" name="title" value={eventData.title} onChange={handleChange} className="input bg-gray-100 rounded-md" />
            </div>

            <div className="flex flex-col">
                <label className="text-white edit-event-label">Description de l'événement:</label>
                <textarea name="description" value={eventData.description} onChange={handleChange} className="input bg-gray-100 rounded-md"></textarea>
            </div>

            <div className="flex flex-col">
                <label className="text-white edit-event-label">Date de l'événement:</label>
                <input type="date" name="date" value={eventData.date} onChange={handleChange} className="input bg-gray-100 rounded-md" />
            </div>

            <div className="flex flex-col">
                <label className="text-white edit-event-label">Adresse:</label>
                <input type="text" name="address" value={eventData.address} onChange={handleChange} className="input bg-gray-100 rounded-md" />
            </div>

            <div className="flex flex-col">
                <label className="text-white edit-event-label">Nombre de places :</label>
                <input type="number" name="nbPlaces" value={eventData.nbPlaces} onChange={handleChange} className="input bg-gray-100 rounded-md" min="0" />
            </div>

            <div className="flex flex-col">
                <label className="text-white edit-event-label">Photos:</label>
                <input type="file" name="pictures" multiple onChange={handleChange} className="input bg-gray-100 rounded-md" />
            </div>
            
            <div className="flex flex-col">
                <label className="text-white edit-event-label">Liens:</label>
                <input type="text" name="links" value={eventData.links} onChange={handleChange} className="input bg-gray-100 rounded-md" />
            </div>

            <div className="flex flex-col">
                <label className="text-white edit-event-label">Type d'événement:</label>
                <select name="categoryId" value={eventData.categoryId} onChange={handleChange} className="input bg-gray-100 rounded-md">
                <option value="">Sélectionner un type d'événement</option>
                {eventTypes.map((eventType) => (
                    <option key={eventType.id} value={eventType.id}>
                    {eventType.label}
                    </option>
                ))}
                </select>
            </div>
            <button onClick={handleSubmit} className="btn bg-blue-500 text-white rounded-md w-full float-left">Enregistrer</button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default EditEvent;
