import { useState } from "react";
import reactLogo from "../img/react.svg"; // Assuming the image is in the 'img' folder in the same directory as this component
import BackendApi from "../services/BackendApi";
import Swal from "sweetalert2";
import EventDetails from "./EventDetails";
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
      <img className="h-48" src={reactLogo} alt="React Logo" />

      <div className="mx-2 my-2">
        {/* type and number of places */}
      <div className="flex flex-row justify-between">
        <span className="bg-blue-300 text-white px-1 py-1 rounded-md">{event.categoryId.label}</span>
        { event.nbPlaces != 0 ? <span className="text-green-400">{`${event.nbPlaces} places left`}</span> : <span className="text-red-200">No places left</span>}
      </div>
      {/* title */}
      <div className="flex justify-center">
        <span className="font-bold text-xl">{event.title}</span>
      </div>
      
      {/* address */}
    <button onClick={handleShowDetails}>show</button>
    { showDetails && <EventDetails handleClose={handleShowDetails} event={event}/>}
      {/* description */}
     
      {/* register to event */}
      <div className="my-3 flex flex-row items-center justify-center gap-2">
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
        cancel
      </button>
      </div>
      
      </div>
      
    </div>
  );
}
