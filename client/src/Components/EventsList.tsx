//import React, { useState, useEffect } from 'react';
//import BackendApi from '../../services/BackendApi';
import { EventModel } from '../../../backend/src/models/Event';
import EventCard from './EventCard';


const EventsList : React.FC<Props> = ({events,handleRegistration, handleCancellation})=>{
return(
   <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
    {events.map((item) => (
        <EventCard key={item._id} event={item} handleRegistration={handleRegistration} handleCancellation={handleCancellation}/>
      ))}
   </div>
)
}
export default EventsList;