import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Users, BookOpen, GraduationCap, 
  CalendarCheck, Award, CreditCard, CalendarDays, 
  BellRing, Settings, ChevronLeft, ChevronRight 
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Students', path: '/students', icon: Users },
  { name: 'Teachers', path: '/teachers', icon: BookOpen },
  { name: 'Classes', path: '/classes', icon: GraduationCap },
  { name: 'Attendance', path: '/attendance', icon: CalendarCheck },
  { name: 'Grades', path: '/grades', icon: Award },
  { name: 'Fees', path: '/fees', icon: CreditCard },
  { name: 'Timetable', path: '/timetable', icon: CalendarDays },
  { name: 'Announcements', path: '/announcements', icon: BellRing },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <motion.aside
      initial={{ width: 260 }}
      animate={{ width: isOpen ? 260 : 80 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col z-20 shrink-0 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border"
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-dark-border">
        {isOpen ? (
          <span className="text-2xl font-black text-primary-600 dark:text-primary-400 tracking-tight">
            SmartSchool <span className="text-primary-700 dark:text-primary-300">DZ</span>
          </span>
        ) : (
          <span className="text-2xl font-black text-primary-600 dark:text-primary-400">DZ</span>
        )}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} className="mx-auto" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg transition-colors group ${
                    isActive 
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-700/20 dark:text-primary-400' 
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-border'
                  }`
                }
                title={!isOpen ? item.name : ''}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${!isOpen ? 'mx-auto' : 'mr-3'}`} />
                {isOpen && <span className="font-medium">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
