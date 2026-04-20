import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { studentsData as initialStudents } from '../data/students';
import { teachersData as initialTeachers } from '../data/teachers';

const AppContext = createContext();

// Expanded Classes
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
  { id: 10, name: '10C', capacity: 28, teacher: 'Ahmed Gherbi' },
  { id: 11, name: '8B', capacity: 28, teacher: 'Khadidja Benguenna' },
  { id: 12, name: '12B', capacity: 22, teacher: 'Mourad Meghni' },
  { id: 13, name: '7A', capacity: 30, teacher: 'Souad Massi' },
];

// 200 Mock Fee Records
const initialFees = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  studentId: (i % 60) + 1,
  amount: 15000 + (Math.random() * 10000),
  status: Math.random() > 0.3 ? 'Paid' : 'Overdue',
  date: `2026-0${1 + (i % 4)}-${10 + (i % 15)}`
}));

// Class-specific Timetables
const initialTimetables = {
  '10A': [
    { day: 'Monday', slots: [{ time: '08:00', subject: 'Math', teacher: 'Omar Kadir' }, { time: '09:45', subject: 'Physics', teacher: 'Leila Toumi' }] },
    { day: 'Tuesday', slots: [{ time: '08:00', subject: 'History', teacher: 'Djamila Bacha' }, { time: '09:45', subject: 'Arabic', teacher: 'Samir Brahimi' }] }
  ],
  '9B': [
    { day: 'Monday', slots: [{ time: '08:00', subject: 'English', teacher: 'Hassan Yebda' }, { time: '09:45', subject: 'Art', teacher: 'Souad Massi' }] },
    { day: 'Tuesday', slots: [{ time: '08:00', subject: 'Science', teacher: 'Zahra Nemchi' }, { time: '09:45', subject: 'Math', teacher: 'Nabil Bentaleb' }] }
  ]
};

export function AppProvider({ children }) {
  const [students, setStudents] = useLocalStorage('v2_app_students', initialStudents);
  const [teachers, setTeachers] = useLocalStorage('v2_app_teachers', initialTeachers);
  const [classes, setClasses] = useLocalStorage('v2_app_classes', initialClasses);
  const [announcements, setAnnouncements] = useLocalStorage('v2_app_announcements', []);
  const [fees, setFees] = useLocalStorage('v2_app_fees', initialFees);
  const [timetables, setTimetables] = useLocalStorage('v2_app_timetables', initialTimetables);
  const [attendance, setAttendance] = useLocalStorage('v2_app_attendance', {});
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  const contextValue = {
    students, setStudents,
    teachers, setTeachers,
    classes, setClasses,
    fees, setFees,
    announcements,
    timetables,
    attendance, setAttendance,
    toasts, addToast
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext);
