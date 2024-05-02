//import React, { useState, useEffect } from 'react';
//import BackendApi from '../../services/BackendApi';
import { EventModel } from '../../../backend/src/models/Event';
import EventCard from './EventCard';


const EventsList : React.FC<Props> = ({events})=>{
return(
   <div className='mt-12 grid grid-cols-6 gap-4'>
    {events.map((item) => (
        <EventCard key={item._id} event={item} />
      ))}
   </div>
)
}
export default EventsList;