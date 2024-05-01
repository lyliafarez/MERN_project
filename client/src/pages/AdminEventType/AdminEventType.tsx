import React, { useState, useEffect } from 'react'
import EventType from '../../models/EventType';
import BackendApi from '../../services/BackendApi';

export default function AdminEventType() {

  const backendApi = new BackendApi()
  const [eventTypes, setEventTypes] = useState<EventType[] | []>([]);
  const [newEventType, setNewEventType] = useState<Partial<EventType>>({
    label: "",
    description: ""
  });
  

  useEffect(() => {
    backendApi.getAllEventTypes().then(response => {
      setEventTypes(response)
    })
  }, []);

  useEffect(() => {

  }, [newEventType]);

  function deleteEventTypeById(eventId: string) {
    backendApi.deleteEventTypeById(eventId).then(() => {
      backendApi.getAllEventTypes().then(tempEvTypes => setEventTypes(tempEvTypes))
    });
  }  

  function createEventType() {
    if(newEventType.label && newEventType.label?.length > 2){
      backendApi.createEventType(newEventType).then(response => {
        backendApi.getAllEventTypes().then(tempEvTypes => setEventTypes(tempEvTypes))
        setNewEventType({
          label: "",
          description: ""
        })
      })
    }

  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setNewEventType(prevState => {
      if (prevState === null || typeof prevState === 'undefined') {
        return { label: "", description: "" };
      }

      if (name in prevState) {
        return {
          ...prevState,
          [name]: value
        };
      }
      return prevState;
    });
  }

  
  return (
    <div>
      <div className='new-event-type'>
        <div>
          <label htmlFor="label">Type de l'évènement</label>
          <input name="label" type="text" value={newEventType?.label} onChange={e => handleInputChange(e)} />
        </div>
        <div>
          <label htmlFor="description">Description de l'évènement</label>
          <input name="description" type="text" value={newEventType?.description} onChange={e => handleInputChange(e)} />
        </div>
        <button onClick={ e =>createEventType()}>Ajouter</button>
      </div>
      <div className='list-event-type'>
        {eventTypes.map((eventType, index) => (
          <div key={index} className='flex'>
            <p>{eventType.label}</p>
            <p>{eventType.description}</p>
            <button onClick={() => deleteEventTypeById(eventType.id)}>Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  )
}
