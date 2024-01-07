import React, { createContext, useContext, useState, useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";

const MainContext = createContext();

export const useMainContext = () => {
  return useContext(MainContext);
};

const MainContextProvider = ({ children }) => {
  const [trustedComapnies, setTrusetdCompanies] = useState([]);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const unsubscribeTrustedCompanies = onSnapshot(
      query(collection(db, "trusted_companies"), orderBy("timestamp", "desc")),
      (snapshot) => {
        const updatedTrustedCompanies = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTrusetdCompanies(updatedTrustedCompanies);
      }
    );

    const unsubscribeCourses = onSnapshot(
      collection(db, "courses"),
      (snapshot) => {
        const updatedCourses = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCourses(updatedCourses);
      }
    );

    const unsubscribeInstructors = onSnapshot(
      collection(db, "instructors"),
      (snapshot) => {
        const updatedInstructors = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setInstructors(updatedInstructors);
      }
    );

    return () => {
      unsubscribeTrustedCompanies();
      unsubscribeCourses();
      unsubscribeInstructors();
    };
  }, []);

  const addTrustedCompanies = async (companyName, companyImage) => {
    try {
      await addDoc(collection(db, "trusted_companies"), {
        companyName,
        companyImage,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      const errorMessage = error.message;
      const errorCode = error.code;
      console.log(errorMessage);
    }
  };

  const addCourse = async (
    courseName,
    courseBgColor,
    courseLogoURL,
    courseBgImageURL,
    courseDescription,
    coursePrice,
    isCoursePublished,
    userData,
    selectedInstructor
  ) => {
    try {
      const courseCollection = collection(db, "courses");
      await addDoc(courseCollection, {
        courseName,
        courseBgColor,
        courseLogoURL,
        courseBgImageURL,
        isCoursePublished,
        courseDescription,
        coursePrice,
        userName: userData.userName,
        userImage: userData.userImage,
        selectedInstructor,
      });
    } catch (error) {
      const errorMessage = error.message;
      const errorCode = error.code;
      console.log(errorMessage);
    }
  };

  const addLessonForCourse = async (courseId, lessonData) => {
    try {
      const lessonRef = collection(db, `courses/${courseId}/lessons`);

      await addDoc(lessonRef, lessonData);
    } catch (error) {
      const errorMessage = error.message;
      const errorCode = error.code;
      console.log(errorMessage);
    }
  };

  const fetchCoursesWithLessons = async () => {
    try {
      const coursesCollection = collection(db, "courses");
      const querySnapshot = await getDocs(coursesCollection);
      const fetchedCourses = [];

      for (const doc of querySnapshot.docs) {
        const course = {
          id: doc.id,
          ...doc.data(),
          lessons: [],
        };

        // Fetch lessons for the course
        const lessonsRef = collection(db, "courses", doc.id, "lessons");
        const lessonsSnapshot = await getDocs(lessonsRef);
        lessonsSnapshot.forEach((lessonDoc) => {
          course.lessons.push({
            lessonId: lessonDoc.id,
            ...lessonDoc.data(),
          });
        });

        fetchedCourses.push(course);
      }

      setCourses(fetchedCourses);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addInstructor = async (instructorData) => {
    try {
      const instructorRef = collection(db, "instructors");
      await addDoc(instructorRef, instructorData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const enrollCourse = async (courseId, courseData) => {
    try {
      const enrollmentsRef = collection(db, `courses/${courseId}/enrollments`);
      await addDoc(enrollmentsRef, courseData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchEnrollesForUser = async (userId, courseId) => {
    const enrollmentsRef = collection(db, `courses/${courseId}/enrollments`);
    const userEnrollmentsQuery = query(enrollmentsRef, where("userData.userId", '==', userId));

    try {
      const querySnapshot = await getDocs(userEnrollmentsQuery);
      const enrollments = querySnapshot.docs.map((doc) => doc.data());
      return enrollments;
    } catch(error) {
      console.log(error.message);
    }
  }

  const fetchEnrollmentsWithCourse = async () => {
    try {
      const coursesCollection = collection(db, 'courses');
      const querySnapshot = await getDocs(coursesCollection);
      const fetchedEnrollments = [];

      for(const doc of querySnapshot.docs) {
        const course = {
          id: doc.id,
          ...doc.data(),
          enrollment: [],
        };

        const enrollmentsRef = collection(db, 'courses', doc.id, 'enrollments');
        const enrollmentsSnapshot = await getDocs(enrollmentsRef);
        enrollmentsSnapshot.forEach((enrollmentDoc) => {
          course.enrollment.push({
            enrollmentId: enrollmentDoc.id,
            ...enrollmentDoc.data(),
          });
        });

        fetchedEnrollments.push(course);

        setCourses(fetchedEnrollments);
      }
    } catch(error) {
      console.log(error.message);
    }
  }

  const context = {
    trustedComapnies,
    courses,
    addTrustedCompanies,
    addCourse,
    addLessonForCourse,
    fetchCoursesWithLessons,
    addInstructor,
    instructors,
    enrollCourse,
    fetchEnrollesForUser,
    fetchEnrollmentsWithCourse,
  };
  return (
    <MainContext.Provider value={context}>{children}</MainContext.Provider>
  );
};

export default MainContextProvider;
