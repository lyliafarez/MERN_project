import { useState } from "react";
import reactLogo from "../img/react.svg"; 
import defaultImg from "../img/corporate-events.jpg";
import BackendApi from "../services/BackendApi";
import Swal from "sweetalert2";
import EventDetails from "./EventDetails";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function EventCard({ event ,handleRegistration, handleCancellation }) {
 const [showDetails, setShowDetails] = useState(false);

 const handleShowDetails = ()=>{
    setShowDetails((prev) => !prev)
 }


  const register = () => {
    const form = {
      userId: "6630c78c1d08e0969cd80f2d",
      eventId: event._id,
    };
    handleRegistration(form)
  };

  const cancelRegistration = () => {
    const form = {
      userId: "6630c78c1d08e0969cd80f2d",
      eventId: event._id,
    };
    handleCancellation(form.userId,form.eventId)
    
  };

  return (
    <div className="flex flex-col border-2 border-blue-300 rounded-md">
      {/* img */}
      <img className="h-48" src={defaultImg} alt="React Logo" />

      <div className="my-2">
        {/* type and number of places */}
      <div className="mx-2  flex flex-row justify-between">
      <span className="font-bold text-xl">{event.title}</span>
        { event.nbPlaces != 0 ? <span className="text-green-400">{`${event.nbPlaces} places left`}</span> : <span className="text-red-200">No places left</span>}
      </div>
      <div className="mx-2  flex justify-between">
        <span>{event.address}</span>
        <span>{event.date}</span>
      </div>
      <div className="my-2 border w-full border-gray-300"></div>
      {/* title */}
      {/* <div className="flex justify-center">
       
        <span className="bg-blue-300 text-white px-1 py-1 rounded-md">{event.categoryId.label}</span>
      </div>
       */}
      {/* address */}
    {/* <button onClick={handleShowDetails}>show</button>
    { showDetails && <EventDetails handleClose={handleShowDetails} event={event}/>} */}
      {/* description */}
     
      {/* register to event */}
      <div className="mx-2 flex flex-row justify-between">
        <div className="flex items-center gap-2">
        <span className="bg-blue-300 text-xs text-white px-1 py-1 rounded-md">{event.categoryId.label}</span>
        <button onClick={handleShowDetails}><MagnifyingGlassIcon className="h-8 w-8"/></button>
    { showDetails && <EventDetails handleClose={handleShowDetails} event={event}/>}
    
        </div>
     
      <div className="my-3 flex flex-row gap-2">
        <span className="border border-gray-400 h-full"></span>
      { event.nbPlaces != 0 &&<button
        onClick={register}
        className="px-2 py-1 text-xs text-white rounded-md bg-blue-400 hover:bg-blue-600 hover:text-blue-200"
      >
       RSVP
      </button>}
      <button
        onClick={cancelRegistration}
        className="px-2 py-1 text-xs text-white rounded-md bg-red-400 hover:bg-red-600 hover:text-red-300"
      >
        cancel
      </button>
      </div>
      </div>
      
      
      </div>
      
    </div>
  );
}
