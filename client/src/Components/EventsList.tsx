import React from 'react';
import EventCard from './EventCard';
import Event from '../models/Event';
import User from '../models/User';

interface Props {
  events: Event[];
  handleRegistration: (form: any) => void;
  handleCancellation: (userId: string, eventId: string) => void;
  confirmDeleteEvent:(eventId:string)=>void;
  userEvents: string[];
  user: User;
}

const EventsList: React.FC<Props> = ({ events, handleRegistration, handleCancellation, userEvents, user,confirmDeleteEvent }) => {
  return (
    <div className='mt-4 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
      {events.map((item: Event) => (
        <EventCard key={item._id} event={item} handleRegistration={handleRegistration} handleCancellation={handleCancellation} userEvents={userEvents} user={user} confirmDeleteEvent={confirmDeleteEvent}/>
      ))}
    </div>
  );
}

export default EventsList;
