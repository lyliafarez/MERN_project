import React, { useState, useEffect } from 'react'
import EventType from '../../models/EventType';
import BackendApi from '../../services/BackendApi';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export default function AdminEventType() {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Suppression l'état de connexion  et des données utilisateur du localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate('/login');
};


useEffect(() => {
  // Vérification de l'état de connexion lors du chargement du composant
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
      navigate('/login');
  }
}, []);
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

  
//<Logout onLogout= {logout}></Logout>
  
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>

      <div className='new-event-type'>
        <div>
          <div className="input flex flex-col w-fit static">
  <label
    htmlFor="label"
    className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#ffffff] w-fit"
    >Type de l'évènement:</label>
  <input
    name="label"
    type="text"
    placeholder="Write here..."
    value={newEventType?.label} 
    onChange={e => handleInputChange(e)}
    className="border-blue-500 input px-[10px] py-[11px] text-xs border-2 rounded-[5px] w-[210px] focus:outline-none placeholder:text-black/25"
  />
</div>

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
