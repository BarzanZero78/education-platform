import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import Admin_Navbar from "../../components/admin/Admin_Navbar";
import Sidebar from "../../components/admin/Sidebar";

const Admin_Page = () => {
  const { getUserData } = useUserAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, [getUserData]);

  const fetchUserData = async () => {
    const data = await getUserData();
    setUserData(data);
  };

  return (
    <div>
      {userData ? (
        <div>
          {userData.isAdmin == true ? (
            <div className="flex">
              <div className="flex-1">
                <Sidebar />
              </div>

              <div className="flex-1">
                <Admin_Navbar />
              </div>
            </div>
          ) : (
            <>404 Not found</>
          )}
        </div>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default Admin_Page;
