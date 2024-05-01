import React, { useState, useEffect } from 'react'
import EventType from '../../models/EventType';
import BackendApi from '../../services/BackendApi';

export default function AdminEventType() {

  const backendApi = new BackendApi()
  const [eventTypes, setEventTypes] = useState<EventType[] | []>([]);
  const [newEventType, setNewEventType] = useState<EventType>({
    id: 0,
    label: "",
    description: ""
  });


  useEffect(() => {
    backendApi.getAllEventTypes().then(response => {
      setEventTypes(response)
      console.log(response)
    })
  }, []);

  useEffect(() => {
    console.log(newEventType)

  }, [newEventType]);

  function createEventType() {
    backendApi.createEventType(newEventType).then(response => {
      backendApi.getAllEventTypes().then(tempEvTypes => setEventTypes(tempEvTypes))
    })
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    console.log(name, value)
    setNewEventType(prevState => {
      console.log(prevState)
      if (prevState === null || typeof prevState === 'undefined') {
        console.log("if1")
        return { id: 0, label: "", description: "" };
      }

      if (name in prevState) {
        console.log("if2")
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
          <div key={index}>
            <p>{eventType.label}</p>
            <p>{eventType.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
