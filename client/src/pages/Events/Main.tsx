import { useState, useEffect } from "react";
import BackendApi from "../../services/BackendApi";
import { EventModel } from "../../../../backend/src/models/Event";
import EventType from "../../models/EventType";
import EventsList from "../../Components/EventsList";
//import parseDate from "../../helpers/parseDate";
import parseLongDateFormat from "../../helpers/parseLongDate";
import SearchBar from "../../Components/SearchBar";
import CategorySelector from "../../Components/CategorySelector";
import DatePicker from "../../Components/DatePicker";
import Swal from "sweetalert2";
import showSweetAlert from "../../helpers/showSweetAlert";

export default function Main() {
  const backendApi = new BackendApi();
  const [events, setEvents] = useState<(typeof EventModel)[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredEvents, setFilteredEvents] = useState<(typeof EventModel)[]>(
    []
  );
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [eventTypes, setEventTypes] = useState<(typeof EventType)[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  /* Search Input */
  const handleSearchInput = (event) => {
    const search: string = event.target.value;
    setSearchInput(search);
    if (search.length > 0) {
      const list = events.filter((item: EventModel) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredEvents(list);
    } else {
      setFilteredEvents(events);
    }
  };

  /* date picker */
  const handleDatePicker = (startDate, endDate) => {
    const start = parseLongDateFormat(startDate);
    const end = parseLongDateFormat(endDate);

    const filteredItems = events.filter((item: EventModel) => {
      const itemDate = new Date(item.date);
      return itemDate >= start && itemDate <= end;
    });

    setFilteredEvents(filteredItems);
  };
  const resetCalendar = () => {
    const date = [
      {
        startDate: null,
        endDate: null,
        key: "selection",
      },
    ];
    setState(date);
    setFilteredEvents(events);
    setShowCalendar(false);
  };
  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev);
  };

  const handleCalendarChange = (item) => {
    setState([item.selection]);
  };
  useEffect(() => {
    if (state[0].startDate != null) {
      handleDatePicker(state[0].startDate, state[0].endDate);
    }
  }, [state]);

  /* category change */
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    if (category === "") {
      setFilteredEvents(events);
    } else {
      const list = events.filter(
        (item: eventModel) => item.categoryId.id === category
      );

      setFilteredEvents(list);
    }
  };

  useEffect(() => {
    backendApi.getAllEvents().then((response) => {
        
      setFilteredEvents(response);
      setEvents(response);
    });

    backendApi.getAllEventTypes().then((response) => {
      setEventTypes(response);
    });
  }, []);


  const updateEventsList = async () => {
    const response = await backendApi.getAllEvents();
    setEvents(response);
    setFilteredEvents(response);
  };

  const handleRegistration = async (form) => {
    await backendApi.createRegistration(form).then(() => {
        showSweetAlert("success","You joined the event successfully !","success","Done")
      });
    await updateEventsList();
  };

  const handleCancellation = async (userId:string, eventId:string) => {
    await backendApi.cancelRegistration(userId,eventId).then(() => {
          showSweetAlert("info","Your registration is canceled!","info","Done")
    });
    await updateEventsList();
  };

  return (
    <div className="mx-8 my-6">
      <h1 className="font-bold text-3xl">Events list</h1>
      {/* search bar and filters */}
      <div className="flex flex-row mt-6 gap-3">
        {/* search bar */}
        <SearchBar
          searchInput={searchInput}
          handleSearchInput={handleSearchInput}
        />
        {/* category selection */}
        <CategorySelector
          eventTypes={eventTypes}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
        {/* date picker */}

        <DatePicker
          showCalendar={showCalendar}
          toggleCalendar={toggleCalendar}
          state={state}
          handleCalendarChange={handleCalendarChange}
          resetCalendar={resetCalendar}
        />
        {/* Create event button */}
        <a href='/createEvent' className="px-2 py-2 bg-blue-400 rounded-md text-white">Add an event</a>
        <a href='/admin/eventtypes' className="px-2 py-2 bg-blue-400 rounded-md text-white">Add an event type</a>
      </div>

      <EventsList key={filteredEvents} events={filteredEvents} handleRegistration={handleRegistration} handleCancellation={handleCancellation} />
    </div>
  );
}
