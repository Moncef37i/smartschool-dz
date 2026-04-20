import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { studentsData as initialStudents } from '../data/students';
import { teachersData as initialTeachers } from '../data/teachers';

const AppContext = createContext();

// Mock Initial data for missing domains
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
];

const initialAnnouncements = [
  { id: 1, title: 'Final Exam Schedule', date: '2026-05-10', message: 'The final exam schedule for Term 2 has been posted. Please check your emails for details.' },
  { id: 2, title: 'Math Exam Tomorrow', date: '2026-04-21', message: 'Reminder: The Grade 10A Mathematics exam is scheduled for tomorrow at 08:30 AM.' },
  { id: 3, title: 'Sports Day 2026', date: '2026-05-15', message: 'Annual sports day will be held on May 15th. Sign up for events in the gym.' },
  { id: 4, title: 'Science Fair Results', date: '2026-04-19', message: 'Congratulations to all winners of the Science Fair! Certificates will be distributed on Monday.' },
];

const initialTimetable = [
  { day: 'Monday', slots: [
    { time: '08:00 - 09:30', subject: 'Mathematics', teacher: 'Omar Kadir', class: '10A' },
    { time: '09:45 - 11:15', subject: 'Physics', teacher: 'Leila Toumi', class: '10A' },
    { time: '11:30 - 13:00', subject: 'Arabic', teacher: 'Samir Brahimi', class: '10A' },
  ]},
  { day: 'Tuesday', slots: [
    { time: '08:00 - 09:30', subject: 'History', teacher: 'Djamila Bacha', class: '10A' },
    { time: '09:45 - 11:15', subject: 'Computer Science', teacher: 'Ahmed Gherbi', class: '10A' },
    { time: '11:30 - 13:00', subject: 'English', teacher: 'Hassan Yebda', class: '10A' },
  ]},
  { day: 'Wednesday', slots: [
    { time: '08:00 - 09:30', subject: 'Chemistry', teacher: 'Faouzi Chaouchi', class: '10A' },
    { time: '09:45 - 11:15', subject: 'Biology', teacher: 'Zahra Nemchi', class: '10A' },
    { time: '11:30 - 13:00', subject: 'Physical Education', teacher: 'Zinedine Zidane', class: '10A' },
  ]},
  { day: 'Thursday', slots: [
    { time: '08:00 - 09:30', subject: 'Geography', teacher: 'Mourad Meghni', class: '10A' },
    { time: '09:45 - 11:15', subject: 'Philosophy', teacher: 'Sadek El Bachir', class: '10A' },
    { time: '11:30 - 13:00', subject: 'Music', teacher: 'Amel Zen', class: '10A' },
  ]},
  { day: 'Friday', slots: [
    { time: '08:00 - 09:30', subject: 'Islamic Studies', teacher: 'Fatima Djebbar', class: '10A' },
    { time: '09:45 - 11:15', subject: 'Art', teacher: 'Souad Massi', class: '10A' },
  ]},
];

export function AppProvider({ children }) {
  const [students, setStudents] = useLocalStorage('app_students', initialStudents);
  const [teachers, setTeachers] = useLocalStorage('app_teachers', initialTeachers);
  const [classes, setClasses] = useLocalStorage('app_classes', initialClasses);
  const [announcements, setAnnouncements] = useLocalStorage('app_announcements', initialAnnouncements);
  const [timetable, setTimetable] = useLocalStorage('app_timetable', initialTimetable);
  const [notifications, setNotifications] = useLocalStorage('app_notifications', [
    { id: 1, text: 'Exam schedule updated.', read: false },
    { id: 2, text: 'Welcome to SmartSchool DZ Dashboard!', read: false }
  ]);
  const [fees, setFees] = useLocalStorage('app_fees', [
    { id: 1, studentId: 1, amount: 20000, status: 'Paid', date: '2026-04-01' },
    { id: 2, studentId: 2, amount: 20000, status: 'Overdue', date: '2026-04-01' },
    { id: 3, studentId: 4, amount: 20000, status: 'Paid', date: '2026-04-01' },
    { id: 4, studentId: 6, amount: 20000, status: 'Overdue', date: '2026-04-01' },
  ]);
  const [attendance, setAttendance] = useLocalStorage('app_attendance', {});

  const [toasts, setToasts] = useState([]);

  // Generic Toast handler
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Notification handler
  const notify = (text) => {
    setNotifications((prev) => [{ id: Date.now(), text, read: false }, ...prev]);
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({...n, read: true})));
  };

  // CRUD Students
  const addStudent = (studentData) => {
    const newStudent = { id: Date.now(), ...studentData, status: 'Active' };
    setStudents([newStudent, ...students]);
    addToast('Student added successfully!');
    notify(`New student added: ${studentData.name}`);
  };

  const updateStudent = (id, updatedData) => {
    setStudents(students.map(s => s.id === id ? { ...s, ...updatedData } : s));
    addToast('Student updated!');
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
    addToast('Student removed', 'error');
  };

  // CRUD Teachers
  const addTeacher = (data) => {
    setTeachers([{ id: Date.now(), ...data, status: 'Active' }, ...teachers]);
    addToast('Teacher mapped successfully!');
    notify(`New teacher joining: ${data.name}`);
  };

  const deleteTeacher = (id) => setTeachers(teachers.filter(t => t.id !== id));

  // Announcements CRUD
  const addAnnouncement = (data) => {
    setAnnouncements([{ id: Date.now(), ...data }, ...announcements]);
    notify(`Announcement posted: ${data.title}`);
    addToast('Notice published!');
  };

  // General Methods
  const toggleFeeStatus = (feeId) => {
    setFees(fees.map(f => f.id === feeId ? { ...f, status: f.status === 'Paid' ? 'Overdue' : 'Paid' } : f));
  };
  
  const setStudentAttendance = (studentId, status) => {
    setAttendance({...attendance, [studentId]: status});
  };

  const contextValue = {
    students, addStudent, updateStudent, deleteStudent,
    teachers, addTeacher, deleteTeacher,
    classes, setClasses,
    fees, toggleFeeStatus,
    attendance, setStudentAttendance,
    announcements, addAnnouncement,
    timetable,
    notifications, markNotificationsRead,
    toasts
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
