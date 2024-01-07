import Banner from "../components/Banner";
import Trusted from "../components/Trusted";
import About from "../components/About";
import Top_Courses from "../components/Top_Courses";
import Popular_Courses from "../components/Popular_Courses";
import Testimonal from "../components/Testimonal";
import { useUserAuth } from "../context/UserAuthContext";
import { useEffect, useState } from "react";

const Home_Page = () => {
  const { getUserData } = useUserAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setUserData(data);
    };

    fetchUserData();
  }, [getUserData]);

  return (
    <div>
      {userData ? (
        <>
          <Banner />
          <div id="trusted">
            <Trusted />
          </div>
          <About />
          <Top_Courses />
          <Popular_Courses />
          <div id="testimonal">
            <Testimonal />
          </div>
          <br />
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default Home_Page;
