//import React, { useState, useEffect } from 'react';
//import BackendApi from '../../services/BackendApi';
import { EventModel } from '../../../backend/src/models/Event';


const EventsList : React.FC<Props> = ({events})=>{
return(
   <div>
    {events.map((item) => (
        <li key={item._id}>{item.title + " "+item.date} </li>
      ))}
   </div>
)
}
export default EventsList;