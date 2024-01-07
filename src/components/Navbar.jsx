import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import Logo from "../assets/img/Logo.png";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";

const Navbar = () => {
  const { getUserData, signOutUser } = useUserAuth();
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setUserData(data);
    };

    fetchUserData();
  }, [getUserData]);

  if (
    location.pathname.includes("/admin_panel") ||
    location.pathname.includes("/course/:courseName") ||
    location.pathname.includes("/admin_panel/admin_add_trusted_company") ||
    location.pathname.includes("/admin_panel/admin_add_course") ||
    location.pathname.includes("/admin_panel/course/") ||
    location.pathname.includes("/admin_panel/course/:courseName/add_lesson")
  ) {
    return null;
  }

  const hanldeSignOutUser = async () => {
    try {
       await signOutUser();
    } catch(error) {
      console.log(error.message);
    }
  }

  return (
    <>
      {userData ? (
        <header
          className={`bg-[#49228C] w-full h-[60px] flex justify-around items-center ${
            location.pathname === "/courses" ? "bg-white shadow-md" : ""
          } font-semibold`}
        >
          <div>
            <Link to="/">
              <img src={Logo} alt="" width="150px" height="150px" />
            </Link>
          </div>

          <div className="flex justify-center items-center gap-28">
            <nav>
              <ul
                className={`flex justify-center items-center gap-10 text-white ${
                  location.pathname === "/courses" ? "text-black" : ""
                }`}
              >
                <li
                  className={`hover:text-[#F67E59] transform hover:transition-shadow ${
                    location.pathname === "/courses" ? "text-black" : ""
                  }`}
                >
                  <a href="/" title="Home">
                    Home
                  </a>
                </li>

                <li
                  className={`hover:text-[#F67E59] transform hover:transition-shadow ${
                    location.pathname === "/courses" ? "text-black" : ""
                  }`}
                >
                  <Link to="/courses" title="Our Courses">
                    Our Courses
                  </Link>
                </li>

                <li
                  className={`hover:text-[#F67E59] transform hover:transition-shadow ${
                    location.pathname === "/courses" ? "text-black" : ""
                  }`}
                >
                  <a href="/#testimonal" title="Testimonal">
                    Testimonal
                  </a>
                </li>

                <li
                  className={`hover:text-[#F67E59] transform hover:transition-shadow ${
                    location.pathname === "/courses" ? "text-black" : ""
                  }`}
                >
                  <a href="" title="Contact Us">
                    Contact
                  </a>
                </li>

                {userData.isAdmin === true ? (
                  <li
                  className={`hover:text-[#F67E59] transform hover:transition-shadow ${
                    location.pathname === "/courses" ? "text-black" : ""
                  }`}
                >
                  <a href="/admin_panel" title="Admin Panel">
                    Admin Panel
                  </a>
                </li>
                ) : <></>}
              </ul>
            </nav>

            <div className="flex justify-center items-center gap-5">
              <div>
                <button
                  onClick={() => setShowSearchBar(!showSearchBar)}
                  className="bg-[#8773AA] text-white flex justify-center items-center p-1 rounded-full"
                  title="Search"
                >
                  <span className="material-icons">search</span>
                </button>
              </div>

              {showSearchBar && (
                <Search
                  showSearchBar={showSearchBar}
                  setShowSearchBar={setShowSearchBar}
                />
              )}

              <div>
                <a href="">
                  <img
                    src={userData.userImage}
                    alt=""
                    className="w-[40px] h-[40px] rounded-full"
                  />
                </a>
              </div>
            </div>
          </div>
        </header>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navbar;
