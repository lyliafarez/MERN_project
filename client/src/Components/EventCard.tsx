import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EventDetails from './EventDetails';
import defaultImg from "../img/corporate-events.jpg";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import DeletePopup from '../Components/popups/DeletePopup';
import axios from 'axios';

export default function EventCard({ event ,handleRegistration, handleCancellation, userEvents, user, confirmDeleteEvent }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showEventConfirmation, setShowEventConfirmation] = useState(false);

  const handleShowDetails = () => {
    setShowDetails((prev) => !prev);
  };

  const handleDeleteEvent = () => {
    setShowEventConfirmation((prev) => !prev);
  };

  const register = () => {
    const form = {
      userId: user._id,
      eventId: event._id,
    };
    handleRegistration(form);
  };

 

  return (
    <div className="flex flex-col border-2 border-blue-300 rounded-md">
      {/* img */}
      <img className="h-48" src={defaultImg} alt="React Logo" />

      <div className="my-2">
        {/* type and number of places */}
        <div className="mx-2  flex flex-row justify-between">
          <span className="font-bold text-xl">{event.title}</span>
          {event.nbPlaces !== 0 ? (
            <span className="text-green-400">{`${event.nbPlaces} places left`}</span>
          ) : (
            <span className="text-red-200">No places left</span>
          )}
        </div>
        <div className="mx-2  flex justify-between">
          <span>{event.address}</span>
          <span>{event.date}</span>
        </div>
        <div className="my-2 border w-full border-gray-300">
          <div className="mx-2 flex flex-row justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-blue-300 text-xs text-white px-1 py-1 rounded-md">{event.categoryId.label}</span>
              <button onClick={handleShowDetails}><MagnifyingGlassIcon className="h-8 w-8"/></button>
              {showDetails && <EventDetails handleClose={handleShowDetails} event={event}/>}
            </div>

            <div className="my-3 flex flex-row gap-2">
              {user.isAdmin ? (
                <>
                  <Link to={`/edit-event/${event._id}`}>
                    <button className="px-2 py-1 text-xs text-white rounded-md bg-yellow-400 hover:bg-yellow-600 hover:text-yellow-200">
                      Edit
                    </button>
                  </Link>
                  <button onClick={handleDeleteEvent} className="px-2 py-1 text-xs text-white rounded-md bg-red-400 hover:bg-red-600 hover:text-red-300">
                    Delete
                  </button>
                </>
              ) : (
                <>
                  {event.nbPlaces !== 0 && new Date() < new Date(event.date) && !userEvents.includes(event._id) && (
                    <button
                      onClick={register}
                      className="px-2 py-1 text-xs text-white rounded-md bg-blue-400 hover:bg-blue-600 hover:text-blue-200"
                    >
                      RSVP
                    </button>
                  )}
                  {(event.nbPlaces === 0 && !userEvents.includes(event._id)) || new Date() > new Date(event.date)
                    ? "Event closed"
                    : null}
                </>
              )}
            </div>
          </div>
          {showEventConfirmation && 
            <DeletePopup isOpen={showEventConfirmation} onDelete={() => confirmDeleteEvent(event._id)} onClose={() => setShowEventConfirmation(false)} >
              <h2>Are you sure you want to delete the event?</h2>
            </DeletePopup>
          }
        </div>
      </div>
    </div>
  );
}
