import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {ArrowLeftEndOnRectangleIcon} from "@heroicons/react/24/solid";

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();

  const handleLogout = () => {
    // Suppression l'état de connexion  et des données utilisateur du localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    // Vérification de l'état de connexion lors du chargement du composant
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

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
                  <a href="/events">List of events</a>
                </li>
               {user.isAdmin && <li className="border-b border-gray-400 uppercase">
                <a href="/users">List of users</a>
              </li>}
                <li className="border-b border-gray-400 uppercase">
                <a href="/createEvent">Create an event</a>
              </li>
              
              </ul>
            </div>
          </div>
        </div>
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
    <div className="mx-2">
    <button onClick={handleLogout}><ArrowLeftEndOnRectangleIcon className="h-10 w-10"/></button>
    </div>
   
    </div>
  );
}
