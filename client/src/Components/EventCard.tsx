import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import reactLogo from '../img/react.svg';
// import BackendApi from '../services/BackendApi';
// import Swal from 'sweetalert2';
import EventDetails from './EventDetails';

const EventCard = ({ event, handleRegistration, handleCancellation, isAdmin }) => {
  const [showDetails, setShowDetails] = useState(false);
  console.log(event, isAdmin);
  const handleShowDetails = () => {
    setShowDetails((prev) => !prev);
  };

  const register = () => {
    const form = {
      userId: '6630c78c1d08e0969cd80f2d',
      eventId: event._id,
    };
    handleRegistration(form);
  };

  const cancelRegistration = () => {
    const form = {
      userId: '6630c78c1d08e0969cd80f2d',
      eventId: event._id,
    };
    handleCancellation(form.userId, form.eventId);
  };

  const deleteEvent = () => {
  };

  return (
    <div className="flex flex-col border-2 border-blue-300 rounded-md">
      <img className="h-48" src={reactLogo} alt="React Logo" />
      <div className="mx-2 my-2">
        <div className="flex flex-row justify-between items-center">
          <span className="bg-blue-300 text-white px-1 py-1 rounded-md">{event.categoryId.label}</span>
          {event.nbPlaces !== 0 ? (
            <span className="text-green-400">{`${event.nbPlaces} places left`}</span>
          ) : (
            <span className="text-red-200">No places left</span>
          )}
        </div>
        <div className="flex justify-center">
          <span className="font-bold text-xl">{event.title}</span>
        </div>
        <div className="my-3 flex flex-row items-center justify-center gap-2">
          {isAdmin ? (
            <>
              <Link to={`/edit-event/${event._id}`} className="px-4 py-2 text-white rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
               Modifier
              </Link>

              <button
                onClick={deleteEvent}
                className="px-4 py-2 text-white rounded-md bg-red-500 hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                Supprimer
              </button>
            </>
          ) : (
            <>
              <button
                onClick={register}
                className="px-2 py-2 text-white rounded-md bg-blue-400 hover:bg-blue-600 hover:text-blue-200"
              >
                Register
              </button>
              <button
                onClick={cancelRegistration}
                className="px-2 py-2 text-white rounded-md bg-red-400 hover:bg-red-600 hover:text-red-300"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <button onClick={handleShowDetails}>Show</button>
      {showDetails && <EventDetails handleClose={handleShowDetails} event={event} />}
    </div>
  );
}

export default EventCard;
