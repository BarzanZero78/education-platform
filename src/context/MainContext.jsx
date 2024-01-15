import React, { createContext, useContext, useState, useEffect } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
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

      localStorage.setItem("fetchedCourses", JSON.stringify(fetchedCourses));

      setCourses(fetchedCourses);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCourseLessonsFromLocalStorage = () => {
    try {
      const storedLessons = localStorage.getItem("fetchedCourses");
      return storedLessons ? JSON.parse(storedLessons) : [];
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
      await addDoc(enrollmentsRef, {
        courseData,
        courseId,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchCoursesByInstructor = async (instructorId) => {
    try {
      const coursesRef = collection(db, "courses");
      const querySnapshot = await getDocs(
        query(coursesRef, where("selectedInstructor.id", "==", instructorId))
      );

      const courses = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return courses;
    } catch (error) {
      console.error("Error fetching courses by instructor:", error);
      return [];
    }
  };

  const fetchEnrollmentsForUser = async (courseId, userId) => {
    try {
      const enrollmentsRef = collection(db, `courses/${courseId}/enrollments`);
      const querySnapshot = await getDocs(
        query(enrollmentsRef, where("courseData.userData.userId", "==", userId))
      );

      const enrollments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return enrollments;
    } catch (error) {
      const errorMessage = error.message;
      const errorCode = error.code;
      console.log(errorMessage);
      return [];
    }
  };

  const fetchEnrollments = async (courseId) => {
    try {
      const enrollmentsRef = collection(db, `courses/${courseId}/enrollments`);
      const querySnapshot = await getDocs(
        query(enrollmentsRef, orderBy("timestamp", "desc"))
      );

      const enrollments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return enrollments;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };

  const fetchActiveCoursesForUser = async (userId) => {
    try {
      const allEnrollments = [];

      for (const course of courses) {
        const courseId = course.id;
        const enrollmentsRef = collection(
          db,
          `courses/${courseId}/enrollments`
        );
        const querySnapshot = await getDocs(
          query(
            enrollmentsRef,
            where("courseData.userData.userId", "==", userId)
          )
        );

        const enrollments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        allEnrollments.push(...enrollments);
      }

      localStorage.setItem("userEnrollments", JSON.stringify(allEnrollments));

      return allEnrollments;
    } catch (error) {
      const errorMessage = error.message;
      const errorCode = error.code;
      console.log(errorMessage);
      return [];
    }
  };

  const getUserEnrollmentsFromLocalStorage = () => {
    try {
      const storedEnrollments = localStorage.getItem("userEnrollments");
      return storedEnrollments ? JSON.parse(storedEnrollments) : [];
    } catch (error) {
      console.error("Error parsing stored enrollments:", error);
      return [];
    }
  };

  const fetchAllActiveCourses = async (courseId) => {
    try {
      const enrollmentsRef = collection(db, `courses/${courseId}/enrollments`);
      const querySnapshot = await getDocs(
        query(enrollmentsRef, where("courseData.isCourseActive", "==", true))
      );

      const enrollments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return enrollments;
    } catch (error) {
      console.log(error.message);
    }
  };

  const createComment = async (courseId, commentData) => {
    try {
      const commentsRef = collection(db, `courses/${courseId}/comments`);
      await addDoc(commentsRef, commentData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeComment = async (courseId, userId) => {
    try {
      const commentsRef = collection(db, `courses/${courseId}/comments`);
      const querySnapshot = await getDocs(
        query(commentsRef, where("commentData.userData.userId", "==", userId))
      );

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchCommentsWithCourse = async (courseId) => {
    try {
      const commentsRef = collection(db, `courses/${courseId}/comments`);
      const querySnapshot = await getDocs(
        query(commentsRef, orderBy("timestamp", "desc"))
      );

      const comments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return comments;
    } catch (error) {
      console.log(error.message);
    }
  };

  const contactForm = async (contactData) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contactData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const context = {
    trustedComapnies,
    courses,
    addTrustedCompanies,
    addCourse,
    addLessonForCourse,
    fetchCoursesWithLessons,
    getCourseLessonsFromLocalStorage,
    addInstructor,
    instructors,
    enrollCourse,
    fetchCoursesByInstructor,
    fetchEnrollmentsForUser,
    fetchEnrollments,
    fetchActiveCoursesForUser,
    getUserEnrollmentsFromLocalStorage,
    fetchAllActiveCourses,
    createComment,
    removeComment,
    fetchCommentsWithCourse,
    contactForm,
  };
  return (
    <MainContext.Provider value={context}>{children}</MainContext.Provider>
  );
};

export default MainContextProvider;
