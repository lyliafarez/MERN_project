import React, { useState } from "react";
import { Link } from "react-router-dom";
import EventDetails from "./EventDetails";
import defaultImg from "../img/corporate-events.jpg";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Event from "../models/Event";
import User from "../models/User";

interface Props {
  event: Event;
  handleRegistration: (form: { userId: string; eventId: string }) => void;
  handleCancellation: (userId: string, eventId: string) => void;
  userEvents: string[];
  user: User;
}

const EventCard: React.FC<Props> = ({
  event,
  handleRegistration,
  handleCancellation,
  userEvents,
  user,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails((prev) => !prev);
  };

  const register = () => {
    const form = {
      userId: user._id,
      eventId: event._id,
    };
    handleRegistration(form);
  };
  const cancelRegistration = () => {
    const form = {
      userId: user._id,
      eventId: event._id,
    };
    handleCancellation(form.userId, form.eventId);
  };

  return (
    <div className="flex flex-col border-2 border-blue-300 rounded-md">
      {/* img */}
      <img className="h-48 w-full object-cover" src={defaultImg} alt="Event" />

      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          {/* type and number of places */}
          <div className="flex justify-between">
            <span className="font-bold text-xl">{event.title}</span>
            {event.nbPlaces !== 0 ? (
              <span className="text-green-400">{`${event.nbPlaces} places left`}</span>
            ) : (
              <span className="text-red-200">No places left</span>
            )}
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>{event.address}</span>
            <span>{event.date}</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="bg-blue-300 text-xs text-white px-1 py-1 rounded-md">
                {event.categoryId.label}
              </span>
              <button onClick={handleShowDetails}>
                <MagnifyingGlassIcon className="h-8 w-8" />
              </button>
              {showDetails && (
                <EventDetails handleClose={handleShowDetails} event={event} />
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {user.isAdmin ? (
                <>
                  <Link to={`/edit-event/${event._id}`}>
                    <button className="px-2 py-1 text-xs text-white rounded-md bg-yellow-400 hover:bg-yellow-600 hover:text-yellow-200">
                      Modifier
                    </button>
                  </Link>
                  <button className="px-2 py-1 text-xs text-white rounded-md bg-red-400 hover:bg-red-600 hover:text-red-300">
                    Supprimer
                  </button>
                </>
              ) : (
                <>
                  {event.nbPlaces !== 0 &&
                    new Date() < new Date(event.date) &&
                    !userEvents.includes(event._id) && (
                      <button
                        onClick={register}
                        className="px-2 py-1 text-xs text-white rounded-md bg-blue-400 hover:bg-blue-600 hover:text-blue-200"
                      >
                        RSVP
                      </button>
                    )}
                  {event.nbPlaces != 0 &&
                    new Date() < new Date(event.date) &&
                    userEvents.includes(event._id) && (
                      <button
                        onClick={cancelRegistration}
                        className="px-2 py-1 text-xs text-white rounded-md bg-red-400 hover:bg-red-600 hover:text-red-300"
                      >
                        cancel
                      </button>
                    )}
                  {(event.nbPlaces === 0 && !userEvents.includes(event._id)) ||
                  new Date() > new Date(event.date)
                    ? "Event closed"
                    : null}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
