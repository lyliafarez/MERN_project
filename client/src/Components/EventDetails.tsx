import { CalendarDaysIcon, MapIcon } from "@heroicons/react/24/solid";
import defaultImg from "../img/corporate-events.jpg";

interface Props {
  handleClose: () => void;
  event: {
    title: string;
    categoryId: {
      label: string;
    };
    date: string;
    address: string;
    description: string;
    links: string[];
    ownerId: {
      lastname: string;
      name: string;
    };
  };
}

const EventDetails: React.FC<Props> = ({ handleClose, event }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white">
              <div className="sm:flex sm:items-start">
                
                <div className="flex flex-col justify-center">
                    {/* img */}
                    <img className="" src={defaultImg} alt="Event"/>
                    <div className="mx-2 my-2 flex flex-col justify-center">
                        <div className="flex justify-between items-center">
                        <span className="text-3xl font-bold mb-4">{event.title}</span>
                        <div>
                        <span className="py-1 px-2 font-semibold text-white bg-purple-500 rounded-md ">{event.categoryId.label}</span>
                        </div>
                        
                        </div>
                        
                        <div className="flex">
                            <CalendarDaysIcon className="h-5 w-5"/>
                            <span>{event.date}</span>
                        </div>
                        <div className="flex">
                            <MapIcon className="h-5 w-5"/>
                            <span>{event.address}</span>
                        </div>
                        
                        <div className="my-2">
                            <span className="text-base font-semibold">Description :</span>
                            <p>{event.description}</p>
                        </div>
                        <div className="flex flex-col">
                        <span className="text-base font-semibold">Links :</span>
                        {event.links.length === 0 && "This event has none"}
                        {event.links.map((link: string, index: number) => (
                                <div key={index}>
                                <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                                </div>
                            ))}
                        </div>
                        <div>
                        <span className="text-base font-semibold">Owner of the event :</span>
                        <span>{`${event.ownerId.lastname} ${event.ownerId.name}`}</span>
                        </div>
                    </div>
                 
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
