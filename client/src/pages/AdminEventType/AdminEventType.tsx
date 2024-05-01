import React, {useState, useEffect} from 'react'
import EventType from '../../models/EventType';
import BackendApi from '../../services/BackendApi';

export default function AdminEventType() {

    const backendApi = new BackendApi()
    const [eventTypes, setEventTypes] = useState([]);
    const [newEventType, setNewEventType] = useState<EventType | null>(null);


    useEffect(() => {
      backendApi.getAllEventTypes().then(response => console.log(response))
    }, []);


  return (
    <div>EventType</div>
  )
}
