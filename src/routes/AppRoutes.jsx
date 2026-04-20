import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import Students from '../pages/Students/Students';
import Teachers from '../pages/Teachers/Teachers';
import Classes from '../pages/Classes/Classes';
import Attendance from '../pages/Attendance/Attendance';
import Grades from '../pages/Grades/Grades';
import Fees from '../pages/Fees/Fees';
import Timetable from '../pages/Timetable/Timetable';
import Announcements from '../pages/Announcements/Announcements';
import Settings from '../pages/Settings/Settings';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="classes" element={<Classes />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="grades" element={<Grades />} />
        <Route path="fees" element={<Fees />} />
        <Route path="timetable" element={<Timetable />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
