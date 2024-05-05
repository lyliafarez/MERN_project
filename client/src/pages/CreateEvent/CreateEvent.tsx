import React, { useState, useEffect } from 'react';
import BackendApi from '../../services/BackendApi';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../Components/Layouts/AppLayout';

function CreateEvent() {
  const backendApi = new BackendApi();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    address: '',
    pictures: [],
    links: [],
    categoryId: '',
    ownerId: user._id,
    nbPlaces: 0
  });
  const [eventTypes, setEventTypes] = useState([]);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdEvent = await backendApi.createEvent(eventData);
      console.log('Événement créé avec succès :', createdEvent);
      navigate('/events')

    } catch (error) {
      console.error('Erreur lors de la création de l\'événement :', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files) {
      const fileURLs = Array.from(files).map(file => URL.createObjectURL(file));
      setEventData(prevData => ({
        ...prevData,
        pictures: fileURLs,
      }));
    }
  };

  return (
    <AppLayout>
      <div className="bg-gray-600 min-h-screen flex justify-center items-center">
        <div className="max-w-md w-full p-8 bg-gray-600 rounded-lg">
          <h1 className="text-2xl mb-4 text-white">Create an event</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-white">Event title:</label>
              <input type="text" name="title" value={eventData.title} onChange={handleChange} className="input bg-gray-100 rounded-md" />
            </div>
            <div className="flex flex-col">
              <label className="text-white">Event description:</label>
              <textarea name="description" value={eventData.description} onChange={handleChange} className="input bg-gray-100 rounded-md"></textarea>
            </div>
            <div className="flex flex-col">
              <label className="text-white">Event date:</label>
              <input type="date" name="date" value={eventData.date} onChange={handleChange} className="input bg-gray-100 rounded-md" />
            </div>
            <div className="flex flex-col">
              <label className="text-white">Number of places :</label>
              <input type="number" name="nbPlaces" value={eventData.nbPlaces} onChange={handleChange} className="input bg-gray-100 rounded-md" min="0" />
            </div>
            <div className="flex flex-col">
              <label className="text-white">Address:</label>
              <input type="text" name="address" value={eventData.address} onChange={handleChange} className="input bg-gray-100 rounded-md" />
            </div>
            <div className="flex flex-col">
              <label className="text-white">Pictures:</label>
              <input type="file" name="pictures" multiple onChange={handleFileChange} className="input bg-gray-100 rounded-md" />
              <div className="flex flex-wrap gap-2">
                {eventData.pictures.map((fileURL, index) => (
                  <div key={index} className="relative">
                    <img src={fileURL} alt={`Image ${index}`} className="h-20 w-20 object-cover rounded-md" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-white">Links:</label>
              <input type="text" name="links" value={eventData.links} onChange={handleChange} className="input bg-gray-100 rounded-md" />
            </div>
            <div className="flex flex-col">
              <label className="text-white">Event type:</label>
              <select name="categoryId" value={eventData.categoryId} onChange={handleChange} className="input bg-gray-100 rounded-md">
                <option value="">Select an event type</option>
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
    </AppLayout>
  );
}

export default CreateEvent;
