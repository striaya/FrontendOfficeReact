// import { useState, useRef, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";

// export default function Header({ toggleSidebar }) {
//     const [open, setOpen] = useState(false);
//     const dropdownRef = useRef(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         function handleClickOutside(e) {
//             if(dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//                 setOpen(false);
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     const logout = () => {
//         localStorage.removeItem("token");
//         navigate("/login");
//     }
//     return (
//         <header className="bg-yellow shadow px-4 py-3 flex items-center justify-between">
//             <button className="md:hidden">
//                 Menu
//             </button>
//             <h1 className="font-semibold text-lg">Administrator</h1>
//         </header >
//     )
// }

import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Header({ toggleSidebar }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // close dropdown when click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow px-4 py-3 flex items-center justify-between">
      {/* Left */}
      <button className="md:hidden" onClick={toggleSidebar}>
        ☰ Menu
      </button>

      <h1 className="font-semibold text-lg">Admin Panel</h1>

      {/* Right */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            A
          </div>
          <span className="hidden md:block text-sm">Admin</span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
            <Link
              to="/profile"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Profile
            </Link>

            <Link
              to="/profile/edit"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Edit Profile
            </Link>

            <Link
              to="/settings"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Settings
            </Link>

            <hr />

            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
