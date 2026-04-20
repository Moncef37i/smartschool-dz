import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { studentsData as initialStudents } from '../data/students';
import { teachersData as initialTeachers } from '../data/teachers';

const AppContext = createContext();

// Mock Initial data for missing domains
const initialClasses = [
  { id: 1, name: '9B', capacity: 30, teacher: 'Leila Toumi' },
  { id: 2, name: '10A', capacity: 25, teacher: 'Omar Kadir' },
  { id: 3, name: '11C', capacity: 35, teacher: 'Samir Brahimi' },
];

const initialAnnouncements = [
  { id: 1, title: 'Term 1 Exams', date: '2026-05-10', message: 'Final exams approaches.' },
];

export function AppProvider({ children }) {
  const [students, setStudents] = useLocalStorage('app_students', initialStudents);
  const [teachers, setTeachers] = useLocalStorage('app_teachers', initialTeachers);
  const [classes, setClasses] = useLocalStorage('app_classes', initialClasses);
  const [announcements, setAnnouncements] = useLocalStorage('app_announcements', initialAnnouncements);
  const [notifications, setNotifications] = useLocalStorage('app_notifications', [
    { id: 1, text: 'System update finished.', read: false }
  ]);
  const [fees, setFees] = useLocalStorage('app_fees', [
    { id: 1, studentId: 1, amount: 20000, status: 'Paid', date: '2026-04-01' },
    { id: 2, studentId: 2, amount: 20000, status: 'Overdue', date: '2026-04-01' }
  ]);
  const [attendance, setAttendance] = useLocalStorage('app_attendance', Object.values(initialStudents).reduce((acc, curr) => ({...acc, [curr.id]: 'Present'}), {}));

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
