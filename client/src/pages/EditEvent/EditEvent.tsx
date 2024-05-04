import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackendApi from '../../services/BackendApi';

function EditEvent() {
  const backendApi = new BackendApi();
  const { eventId } = useParams(); 
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const event = await backendApi.getEventById(eventId);
        setEventData(event);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'événement :', error);
      }
    };

    const fetchEventTypes = async () => {
      try {
        const fetchedEventTypes = await backendApi.getAllEventTypes();
        setEventTypes(fetchedEventTypes);
      } catch (error) {
        console.error('Erreur lors de la récupération des types d\'événements :', error);
      }
    };

    fetchEventData();
    fetchEventTypes();
  }, [backendApi, eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await backendApi.updateEvent(eventId, eventData);
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
    <div className="bg-gray-600 min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full p-8 bg-gray-600 rounded-lg">
        <h1 className="text-2xl mb-4 text-white">Modifier un événement</h1>
        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-white">Titre de l'événement:</label>
              <input type="text" name="title" value={eventData.title} onChange={handleChange} className="input bg-gray-100 rounded-md" />
            </div>
            <div className="flex flex-col">
              <label className="text-white">Description de l'événement:</label>
              <textarea name="description" value={eventData.description} onChange={handleChange} className="input bg-gray-100 rounded-md"></textarea>
            </div>
            <div className="flex flex-col">
              <label className="text-white">Date de l'événement:</label>
              <input type="date" name="date" value={eventData.date} onChange={handleChange} className="input bg-gray-100 rounded-md" />
            </div>

            <button type="submit" className="btn bg-blue-500 text-white rounded-md w-full float-left">Enregistrer</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditEvent;
