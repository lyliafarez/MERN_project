import { useState } from "react";


export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="flex flex-row items-center justify-between">
       
         
    <div className="flex items-center py-8 mx-3">
      <div>
        <div className="flex">
          <div
            className="HAMBURGER-ICON space-y-2 flex flex-col"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <div>
            <span className="block my-1 h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block my-1 h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block my-1 h-0.5 w-8 animate-pulse bg-gray-600"></span>
            </div>
            
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="flex flex-col text-white gap-3 items-center min-h-[250px]">
              <li className="border-b border-gray-400 uppercase">
                <a href="/events">Liste des événements</a>
              </li>
              {/* <li className="border-b border-gray-400 uppercase">
                <a href="/favourites">PokeDex</a>
              </li> */}
              
            </ul>
          </div>
        </div>
    </div>
     {/*    <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/portfolio">Portfolio</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul> */}
      </div>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: black;
        opacity: 0.8;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>
  );
}
