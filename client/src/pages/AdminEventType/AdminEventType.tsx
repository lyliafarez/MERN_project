import React, { useState, useEffect } from 'react'
import './AdminEventType.css';
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

  /**
   * Fonction permettant de supprimer un évènement en fonction de son ID
   * @param eventId 
   */
  function deleteEventTypeById(eventId: string) {
    backendApi.deleteEventTypeById(eventId).then(() => {
      backendApi.getAllEventTypes().then(tempEvTypes => setEventTypes(tempEvTypes))
    });
  }

  /**
   * Fonction permettant de créer un type d'event
   */
  function createEventType() {
    if (newEventType.label && newEventType.label?.length > 2) {
      backendApi.createEventType(newEventType).then(response => {
        backendApi.getAllEventTypes().then(tempEvTypes => setEventTypes(tempEvTypes))
        setNewEventType({
          label: "",
          description: ""
        })
      })
    }

  }

  /**
   * Fonction permettant de prendre en charge le changement d'etat
   * @param event 
   */
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
    <body>
      <div>
        <h1>Ajout d'un évènement</h1>
        <div className='new-event-type'>
          <div>
            <div className="mb-6">
              <label htmlFor="label" className="flex block mb-2 text-m font-medium text-gray-900 dark:text-white">Event Type</label>
              <input name="label" type="text" value={newEventType?.label} onChange={e => handleInputChange(e)} className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-white-400 dark:text-black   dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="flex block mb-2 text-m font-medium text-gray-900 dark:text-white">Description</label>
              <input name="description" type="text" value={newEventType?.description} onChange={e => handleInputChange(e)} className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-white-400 dark:text-black   dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
          </div>
          <button className="mb-10 cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            onClick={e => createEventType()}>
            Confirm
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {eventTypes.map((eventType, index) => (
            <div key={index} className="flex flex-col bg-gray-200 p-4 rounded-lg shadow-md">
              <p className="text-gray-800 font-semibold">{eventType.label}</p>
              <p className="text-gray-600">{eventType.description}</p>
              <div>
                <button
                  className="flex justify-center items-center mt-2 h-10 w-20 bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185] text-white font-semibold rounded-md mx-auto"
                  onClick={() => deleteEventTypeById(eventType.id)}
                >
                  <svg viewBox="0 0 15 15" className="w-5 fill-white">
                    <svg
                      className="w-6 h-6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                    Button
                  </svg>
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </body>
  )
}
