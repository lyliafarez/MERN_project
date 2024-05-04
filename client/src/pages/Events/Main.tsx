import { useState, useEffect } from "react";
import BackendApi from "../../services/BackendApi";
import { EventModel } from "../../../../backend/src/models/Event";
import EventType from "../../models/EventType";
import EventsList from "../../components/EventsList";
import parseDate from "../../helpers/parseDate";
import parseLongDateFormat from "../../helpers/parseLongDate";
import SearchBar from "../../components/SearchBar";
import CategorySelector from "../../components/CategorySelector";
import DatePicker from "../../components/DatePicker";
import Swal from "sweetalert2";

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
      const itemDate = parseDate(item.date);
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
        Swal.fire({
          title: "success",
          text: "You joined the event successfully !",
          icon: "success",
          confirmButtonText: "Done",
        });
      });
    await updateEventsList();
  };

  const handleCancellation = async (userId:string, eventId:string) => {
    await backendApi.cancelRegistration(userId,eventId).then(() => {
        Swal.fire({
            title: "info",
            text: "Your registration is canceled!",
            icon: "info",
            confirmButtonText: "Done",
          });
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
      </div>

      <EventsList key={filteredEvents} events={filteredEvents} handleRegistration={handleRegistration} handleCancellation={handleCancellation} />
    </div>
  );
}
