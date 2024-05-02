import React, { useState } from 'react';
import BackendApi from '../../services/BackendApi';

function CreateEvent() {
  const backendApi = new BackendApi()
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
  });

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
    <div>
      <h1>Créer un événement</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Titre de l'événement:
          <input type="text" name="title" value={eventData.title} onChange={handleChange} />
        </label>
        <label>
          Description de l'événement:
          <textarea name="description" value={eventData.description} onChange={handleChange} />
        </label>
        <label>
          Date de l'événement:
          <input type="date" name="date" value={eventData.date} onChange={handleChange} />
        </label>
        <label>
          Adresse:
          <input type="text" name="address" value={eventData.address} onChange={handleChange} />
        </label>
        <label>
          Photos:
          <input type="text" name="pictures" value={eventData.pictures} onChange={handleChange} />
        </label>
        <label>
          Liens:
          <input type="text" name="links" value={eventData.links} onChange={handleChange} />
        </label>
        <button type="submit">Valider</button>
      </form>
    </div>
  );
}

export default CreateEvent;
