import React, {useState, useEffect} from 'react'
import EventType from '../../models/EventType';
import BackendApi from '../../services/BackendApi';

export default function AdminEventType() {

    const backendApi = new BackendApi()
    const [eventTypes, setEventTypes] = useState<EventType[] | []>([]);
    const [newEventType, setNewEventType] = useState<EventType | null>(null);


    useEffect(() => {
      backendApi.getAllEventTypes().then(response => {
        setEventTypes(response)
        console.log(response)
      })
    }, []);

    useEffect(() => {
      console.log(eventTypes)

    }, [eventTypes]);


  return (
    <div>
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
