import React, { useState, useEffect } from 'react';
import BackendApi from '../../services/BackendApi';
import { EventModel } from '../../../../backend/src/models/Event';
import EventType from '../../models/EventType';
import EventsList from '../../Components/EventsList';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import parseDate from '../../helpers/parseDate';
import parseLongDateFormat from '../../helpers/parseLongDate';

export default function Main() {
const backendApi = new BackendApi()
const [events, setEvents] = useState<typeof EventModel[]>([]);
const [searchInput, setSearchInput] = useState<string>(""); 
const [filteredEvents, setFilteredEvents] = useState<typeof EventModel[]>([]);
const [eventTypes, setEventTypes] = useState<typeof EventType[]>([]);
const [selectedCategory, setSelectedCategory] = useState("");
const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
/* Search Input */
const handleSearchInput = (event) => {
    const search : string = event.target.value;
    setSearchInput(search);
    if (search.length > 0) {
      const list = events.filter((item:EventModel) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredEvents(list)
    } else{
        setFilteredEvents(events)
    }
   
  };

  /* date picker */
const handleDatePicker = (startDate,endDate)=>{
    const start = parseLongDateFormat(startDate);
    const end = parseLongDateFormat(endDate);
    
    const filteredItems = events.filter((item : EventModel) => {
        const itemDate = parseDate(item.date);
        return itemDate >= start && itemDate <= end;
    });
   
   setFilteredEvents(filteredItems)
    
}
 useEffect(()=>{  
   handleDatePicker(state[0].startDate, state[0].endDate)
 },[state])

 
 /* category change */
 const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    
    if (category === "") {
       setFilteredEvents(events);
        
      } else {
        
        const list = events.filter((item : eventModel) =>
        item.categoryId === category
        );
       
        setFilteredEvents(list);
        
      }
 }

  useEffect(() => {
    backendApi.getAllEvents().then(response => {
        setFilteredEvents(response)
        setEvents(response)
      
    })

    backendApi.getAllEventTypes().then(response => {
        setEventTypes(response)    
    })
  }, []);


    return(
        <div>
           {/* search bar */} 
           <input
              value={searchInput}
              type="text"
              placeholder="search a pokemon"
              className="rounded-md px-2 py-2 w-80 border border-black"
              onChange={handleSearchInput}
            />
            {/* date picker */}
            <DateRangePicker
            onChange={item => setState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={state}
            direction="horizontal"
            />

            {/* category selection */}
            <select
              name="category"
              id="category-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="py-2 border border-black rounded-md"
            >
              <option value="">-- Choose a category --</option>
              {eventTypes.map((type,index)=>{
                return(<option value={type.id} key={index} >{type.label}</option>)
              })}
             
              {/* <option value="grass">Grass</option>
              <option value="fire">Fire</option>
              <option value="water">Water</option> */}
            </select>

          <EventsList key={filteredEvents} events={filteredEvents}/>
        </div>
    )
}