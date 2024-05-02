import reactLogo from '../img/react.svg'; // Assuming the image is in the 'img' folder in the same directory as this component

export default function EventCard({ event }) {
  return (
    <div className="flex flex-col h-62 w-62 items-center justify-center border border-2 border-blue-300 rounded-md">
      {/* img */}
      <img className="h-1/2 w-full" src={reactLogo} alt="React Logo" />
      {/* type and number of places */}
      <div>
        <span>{event.categoryId.label}</span>
      </div>
      {/* title */}
      <span>{event.title}</span>
      {/* address */}
      
      {/* description */}
      <span>{event.description}</span>
      {/* register to event */}
      <button className='px-2 py-2 text-white rounded-md bg-blue-400'>Register</button>
    </div>
  );
}
