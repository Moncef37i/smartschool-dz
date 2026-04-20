import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { studentsData as initialStudents } from '../data/students';
import { teachersData as initialTeachers } from '../data/teachers';
import { feesData as initialFees } from '../data/fees';

const AppContext = createContext();

const initialClasses = [
  { id: 1, name: '10A', capacity: 30, teacher: 'Omar Kadir' },
  { id: 2, name: '9B', capacity: 25, teacher: 'Leila Toumi' },
  { id: 3, name: '11C', capacity: 35, teacher: 'Samir Brahimi' },
  { id: 4, name: '8A', capacity: 28, teacher: 'Nawel Saidi' },
  { id: 5, name: '10B', capacity: 30, teacher: 'Nabil Bentaleb' },
  { id: 6, name: '12A', capacity: 20, teacher: 'Djamila Bacha' },
  { id: 7, name: '7C', capacity: 32, teacher: 'Mourad Meghni' },
  { id: 8, name: '11A', capacity: 30, teacher: 'Faouzi Chaouchi' },
  { id: 9, name: '9A', capacity: 25, teacher: 'Zahra Nemchi' },
  { id: 10, name: '10C', capacity: 28, teacher: 'Ahmed Gherbi' }
];

const initialTimetables = {
  '10A': [
    { day: 'Monday', slots: [{ time: '08:00', subject: 'Math', teacher: 'Omar Kadir' }, { time: '09:45', subject: 'Physics', teacher: 'Leila Toumi' }] },
    { day: 'Tuesday', slots: [{ time: '08:00', subject: 'History', teacher: 'Djamila Bacha' }, { time: '09:45', subject: 'Arabic', teacher: 'Samir Brahimi' }] },
    { day: 'Wednesday', slots: [{ time: '08:00', subject: 'Computer Science', teacher: 'Ahmed Gherbi' }, { time: '09:45', subject: 'Chemistry', teacher: 'Faouzi Chaouchi' }] },
    { day: 'Thursday', slots: [{ time: '08:00', subject: 'English', teacher: 'Hassan Yebda' }, { time: '09:45', subject: 'Art', teacher: 'Souad Massi' }] },
    { day: 'Friday', slots: [{ time: '08:00', subject: 'Islamic Studies', teacher: 'Fatima Djebbar' }, { time: '09:45', subject: 'Physical Education', teacher: 'Zinedine Zidane' }] }
  ]
};

export function AppProvider({ children }) {
  const [students, setStudents] = useLocalStorage('v4_app_students', initialStudents);
  const [teachers, setTeachers] = useLocalStorage('v4_app_teachers', initialTeachers);
  const [classes, setClasses] = useLocalStorage('v4_app_classes', initialClasses);
  const [announcements, setAnnouncements] = useLocalStorage('v4_app_announcements', [
    { id: 1, title: 'Exam Tomorrow', date: '2026-04-21', message: 'Good luck with the Math exam!' }
  ]);
  const [fees, setFees] = useLocalStorage('v4_app_fees', initialFees);
  const [timetables, setTimetables] = useLocalStorage('v4_app_timetables', initialTimetables);
  const [attendance, setAttendance] = useLocalStorage('v4_app_attendance', {});
  const [notifications, setNotifications] = useLocalStorage('v4_app_notifications', [
    { id: 1, text: 'Welcome to SmartSchool DZ Dashboard!', read: false }
  ]);
  const [toasts, setToasts] = useState([]);

  // Toast handler
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({...n, read: true})));
  };

  // CRUD Students
  const addStudent = (data) => setStudents([{ id: Date.now(), ...data, status: 'Active' }, ...students]);
  const updateStudent = (id, data) => setStudents(students.map(s => s.id === id ? { ...s, ...data } : s));
  const deleteStudent = (id) => setStudents(students.filter(s => s.id !== id));

  // CRUD Teachers
  const addTeacher = (data) => setTeachers([{ id: Date.now(), ...data, status: 'Active' }, ...teachers]);
  const deleteTeacher = (id) => setTeachers(teachers.filter(t => t.id !== id));

  const addAnnouncement = (data) => setAnnouncements([{ id: Date.now(), ...data }, ...announcements]);

  const contextValue = {
    students, addStudent, updateStudent, deleteStudent,
    teachers, addTeacher, deleteTeacher,
    classes, setClasses,
    fees, setFees,
    announcements, addAnnouncement,
    timetables,
    attendance, setAttendance,
    notifications, markNotificationsRead,
    toasts, addToast
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext);
