import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import Logo from "../assets/img/Logo.png";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";
import {
  isAndroid,
  isIOS,
  isWindows,
  isMacOs,
  isSafari,
} from "react-device-detect";

const Navbar = () => {
  const { getUserData } = useUserAuth();
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    // Close the navigation when the location changes
    setOpenNav(false);
  }, [location]);

  const navHeight = 60;

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setUserData(data);
    };

    fetchUserData();
  }, [getUserData]);

  if (
    location.pathname.includes("/admin_panel") ||
    location.pathname.includes("/course/") ||
    location.pathname.includes("/admin_panel/admin_add_trusted_company") ||
    location.pathname.includes("/admin_panel/admin_add_course") ||
    location.pathname.includes("/admin_panel/course/") ||
    location.pathname.includes("/admin_panel/course/:courseName/add_lesson")
  ) {
    return null;
  }

  return (
    <div className="">
      {userData ? (
        <header
          className={`bg-[#49228C] w-full h-[60px] flex justify-between items-center px-2 ${
            location.pathname === "/courses" ||
            location.pathname.includes("instructor") ||
            location.pathname === "/profile" ||
            location.pathname === "/contact_us"
              ? "bg-white shadow-md"
              : ""
          } font-semibold ${isIOS ? "backdrop-blur-lg" : ""}`}
        >
          <div className="">
            <Link to="/">
              <img
                src={Logo}
                alt=""
                width="150px"
                height="150px"
                className="active:scale-95"
              />
            </Link>
          </div>

          <nav className="hidden lg:flex">
            <ul
              className={`flex justify-center items-center gap-10 text-white ${
                location.pathname === "/courses" ||
                location.pathname.includes("instructor") ||
                location.pathname === "/profile" ||
                location.pathname === "/contact_us"
                  ? "text-black bg-white"
                  : ""
              }`}
            >
              <li
                className={`hover:text-[#F67E59] transform hover:transition-shadow active:scale-95 ${
                  location.pathname === "/courses" ||
                  location.pathname.includes("instructor") ||
                  location.pathname === "/profile" ||
                  location.pathname === "/contact_us"
                    ? "text-black"
                    : ""
                }`}
              >
                <a href="/" title="Home">
                  Home
                </a>
              </li>

              <li
                className={`hover:text-[#F67E59] transform hover:transition-shadow active:scale-95 ${
                  location.pathname === "/courses" ||
                  location.pathname.includes("instructor") ||
                  location.pathname === "/profile" ||
                  location.pathname === "/contact_us"
                    ? "text-black"
                    : ""
                }`}
              >
                <Link to="/courses" title="Our Courses">
                  Our Courses
                </Link>
              </li>

              <li
                className={`hover:text-[#F67E59] transform hover:transition-shadow active:scale-95 ${
                  location.pathname === "/courses" ||
                  location.pathname.includes("instructor") ||
                  location.pathname === "/profile" ||
                  location.pathname === "/contact_us"
                    ? "text-black"
                    : ""
                }`}
              >
                <a href="/#testimonal" title="Testimonal">
                  Testimonal
                </a>
              </li>

              <li
                className={`hover:text-[#F67E59] transform hover:transition-shadow active:scale-95 ${
                  location.pathname === "/courses" ||
                  location.pathname.includes("instructor") ||
                  location.pathname === "/profile" ||
                  location.pathname === "/contact_us"
                    ? "text-black"
                    : ""
                }`}
              >
                <a href="/contact_us" title="Contact Us">
                  Contact
                </a>
              </li>

              {userData.isAdmin === true ? (
                <li
                  className={`hover:text-[#F67E59] transform hover:transition-shadow active:scale-95 ${
                    location.pathname === "/courses" ||
                    location.pathname.includes("instructor") ||
                    location.pathname === "/profile" ||
                    location.pathname === "/contact_us"
                      ? "text-black"
                      : ""
                  }`}
                >
                  <a href="/admin_panel" title="Admin Panel">
                    Admin Panel
                  </a>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </nav>

          {openNav && (
            <nav
              className={`absolute top-16 left-0 w-full h-auto bg-[#432577] ${
                location.pathname === "/courses" ||
                location.pathname.includes(
                  "/instructor" ||
                    location.pathname === "/profile" ||
                    location.pathname === "/contact_us"
                    ? 'bg-white'
                    : ""
                )
              }`}
              style={{ zIndex: 1000 }}
            >
              <ul
                className={`flex flex-col justify-start p-2 items-start gap-5 text-white ${
                  location.pathname === "/courses" ||
                  location.pathname.includes("instructor") ||
                  location.pathname === "/profile" ||
                  location.pathname === "/contact_us"
                    ? `text-black shadow-xl bg-white`
                    : ""
                }`}
              >
                <li
                  className={`hover:text-[#F67E59] transform hover:transition-shadow active:scale-95 ${
                    location.pathname === "/courses" ||
                    location.pathname.includes("instructor") ||
                    location.pathname === "/profile" ||
                    location.pathname === "/contact_us"
                      ? "text-black"
                      : ""
                  }`}
                >
                  <a href="/" title="Home">
                    Home
                  </a>
                </li>

                <li
                  className={`hover:text-[#F67E59] transform hover:transition-shadow active:scale-95 ${
                    location.pathname === "/courses" ||
                    location.pathname.includes("instructor") ||
                    location.pathname === "/profile" ||
                    location.pathname === "/contact_us"
                      ? "text-black"
                      : ""
                  }`}
                >
                  <a href="/courses" title="Our Courses">
                    Our Courses
                  </a>
                </li>

                <li
                  className={`hover:text-[#F67E59] transform hover:transition-shadow active:scale-95 ${
                    location.pathname === "/courses" ||
                    location.pathname.includes("instructor") ||
                    location.pathname === "/profile" ||
                    location.pathname === "/contact_us"
                      ? "text-black"
                      : ""
                  }`}
                >
                  <a href="/#testimonal" title="Testimonal">
                    Testimonal
                  </a>
                </li>

                <li
                  className={`hover:text-[#F67E59] transform hover:transition-shadow active:scale-95 ${
                    location.pathname === "/courses" ||
                    location.pathname.includes("instructor") ||
                    location.pathname === "/profile" ||
                    location.pathname === "/contact_us"
                      ? "text-black"
                      : ""
                  }`}
                >
                  <a href="/contact_us" title="Contact Us">
                    Contact
                  </a>
                </li>

                {userData.isAdmin === true ? (
                  <li
                    className={`hover:text-[#F67E59] transform hover:transition-shadow active:scale-95 ${
                      location.pathname === "/courses" ||
                      location.pathname.includes("instructor") ||
                      location.pathname === "/profile" ||
                      location.pathname === "/contact_us"
                        ? "text-black"
                        : ""
                    }`}
                  >
                    <a href="/admin_panel" title="Admin Panel">
                      Admin Panel
                    </a>
                  </li>
                ) : (
                  <></>
                )}
              </ul>
            </nav>
          )}

          <div className="flex justify-center items-center gap-5">
            <div>
              <button
                onClick={() => setShowSearchBar(!showSearchBar)}
                className="bg-[#8773AA] text-white flex justify-center items-center p-1 rounded-full active:scale-95"
                title="Search"
              >
                <span className="material-icons">search</span>
              </button>
            </div>

            <div className="" style={{ zIndex: 1 }}>
              {showSearchBar && (
                <div className="">
                  <Search
                    showSearchBar={showSearchBar}
                    setShowSearchBar={setShowSearchBar}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-row-reverse justify-center items-center gap-2">
              <button
                className={`cursor-pointer lg:hidden`}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <span
                    className={`material-icons text-white text-xl bg-[#8773AA] rounded-full text-center w-[30px] h-[30px] active:scale-95`}
                  >
                    close
                  </span>
                ) : (
                  <span
                    className={`material-icons text-white text-xl bg-[#8773AA] rounded-full text-center w-[30px] h-[30px] active:scale-95`}
                  >
                    menu
                  </span>
                )}
              </button>
              <a href="/profile" className="active:scale-95">
                {userData.userImage ? (
                  <>
                    <img
                      src={userData.userImage}
                      alt=""
                      className="w-[40px] h-[40px] rounded-full"
                    />
                  </>
                ) : (
                  <>
                    <p className="bg-[#8773AA] text-white flex justify-center items-center w-[40px] h-[40px] rounded-full">
                      {userData.userName.charAt(0).toUpperCase()}
                    </p>
                  </>
                )}
              </a>
            </div>
          </div>
        </header>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Navbar;
