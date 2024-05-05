import React, { useState, useEffect } from "react";
import BackendApi from "../../services/BackendApi";
import Event from "../../models/Event";
import User from "../../models/User";
import EventType from "../../models/EventType";
import EventsList from "../../Components/EventsList";
import parseDate from "../../helpers/parseDate";
//import parseDate from "../../helpers/parseDate";
import parseLongDateFormat from "../../helpers/parseLongDate";
import SearchBar from "../../Components/SearchBar";
import CategorySelector from "../../Components/CategorySelector";
import DatePicker from "../../Components/DatePicker";
import Swal from "sweetalert2";
import showSweetAlert from "../../helpers/showSweetAlert";
import AppLayout from "../../Components/Layouts/AppLayout";
import axios from "axios";

interface Props {}

const Main: React.FC<Props> = () => {
  const backendApi = new BackendApi();
  const [user, setUser] = useState<User>();
  const [events, setEvents] = useState<Event[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [userEvents, setUserEvents] = useState<string[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search: string = event.target.value;
    setSearchInput(search);
    if (search.length > 0) {
      const list = events.filter((item: Event) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredEvents(list);
    } else {
      setFilteredEvents(events);
    }
  };

  const handleDatePicker = (startDate: Date, endDate: Date) => {
    const start = parseLongDateFormat(startDate);
    const end = parseLongDateFormat(endDate);

    const filteredItems = events.filter((item: Event) => {
      const itemDate = new Date(item.date);
      itemDate.setHours(0, 0, 0, 0);
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

  const handleCalendarChange = (item: any) => {
    setState([item.selection]);
  };

  useEffect(() => {
    if (state[0].startDate != null) {
      handleDatePicker(state[0].startDate, state[0].endDate);
    }
  }, [state]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);

    if (category === "") {
      setFilteredEvents(events);
    } else {
      const list = events.filter(
        (item: Event) => item.categoryId.id === category
      );

      setFilteredEvents(list);
    }
  };

  const updateUserEvents = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storedUser);
    if (storedUser) {
      const response = await backendApi.getUser(storedUser._id);
      setUser(response.user);
      setUserEvents(response.eventIds);
    }
  };

  useEffect(() => {
    updateUserEvents();
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

  const handleRegistration = async (form: any) => {
    await backendApi.createRegistration(form).then(() => {
      showSweetAlert("success", "You joined the event successfully !", "success", "Done");
    });
    await updateEventsList();
    await updateUserEvents();
  };

  const handleCancellation = async (userId: string, eventId: string) => {
    await backendApi.cancelRegistration(userId, eventId).then(() => {
      showSweetAlert("info", "Your registration is canceled!", "info", "Done");
    });
    await updateEventsList();
    await updateUserEvents();
  };

  const confirmDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8080/events/${eventId}`);
      console.log('Événement supprimé avec succès.');
      await updateEventsList();
      showSweetAlert("success","Event deleted successfully !","success","Done")
      
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'événement :', error);
    }
  };

  return (
    <AppLayout>
      <div className="mx-4 md:mx-8 my-4 md:my-6">
        <h1 className="font-bold text-2xl md:text-3xl">Events list</h1>
        <div className="flex flex-col md:flex-row md:justify-between mt-4 md:mt-6 gap-4">
          <SearchBar searchInput={searchInput} handleSearchInput={handleSearchInput} />
          <CategorySelector eventTypes={eventTypes} selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} />
          <DatePicker
            showCalendar={showCalendar}
            toggleCalendar={toggleCalendar}
            state={state}
            handleCalendarChange={handleCalendarChange}
            resetCalendar={resetCalendar}
          />
          <a href="/createEvent" className="px-2 py-2 bg-blue-400 rounded-md text-white">
            Add an event
          </a>
          <a href="/admin/eventtypes" className="px-2 py-2 bg-blue-400 rounded-md text-white">
            Add an event type
          </a>
        </div>
        <EventsList
          key={filteredEvents}
          events={filteredEvents}
          handleRegistration={handleRegistration}
          handleCancellation={handleCancellation}
          userEvents={userEvents}
          user={user}
          confirmDeleteEvent={confirmDeleteEvent}
        />
      </div>
    </AppLayout>
  );
};

export default Main;
