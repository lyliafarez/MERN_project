import React, { useState, useEffect } from 'react';
import BackendApi from '../../services/BackendApi';

function CreateEvent() {
  const backendApi = new BackendApi();
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
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdEvent = await backendApi.createEvent(eventData);
      console.log('Événement créé avec succès :', createdEvent);
    } catch (error) {
      console.error('Erreur lors de la création de l\'événement :', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="bg-gray-600 min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full p-8 bg-gray-600 rounded-lg">
        <h1 className="text-2xl mb-4 text-white">Créer un événement</h1>
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
          <div className="flex flex-col">
            <label className="text-white">Nombre de places :</label>
            <input type="number" name="nbPlaces" value={eventData.nbPlaces} onChange={handleChange} className="input bg-gray-100 rounded-md" />
          </div>
          <div className="flex flex-col">
            <label className="text-white">Adresse:</label>
            <input type="text" name="address" value={eventData.address} onChange={handleChange} className="input bg-gray-100 rounded-md" />
          </div>
          <div className="flex flex-col">
            <label className="text-white">Photos:</label>
            <input type="text" name="pictures" value={eventData.pictures} onChange={handleChange} className="input bg-gray-100 rounded-md" />
          </div>
          <div className="flex flex-col">
            <label className="text-white">Liens:</label>
            <input type="text" name="links" value={eventData.links} onChange={handleChange} className="input bg-gray-100 rounded-md" />
          </div>
          <div className="flex flex-col">
            <label className="text-white">Type d'événement:</label>
            <select name="categoryId" value={eventData.categoryId} onChange={handleChange} className="input bg-gray-100 rounded-md">
              <option value="">Sélectionner un type d'événement</option>
              {eventTypes.map((eventType) => (
                <option key={eventType.id} value={eventType.id}>
                  {eventType.label}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn bg-blue-500 text-white rounded-md w-full float-left">Valider</button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;