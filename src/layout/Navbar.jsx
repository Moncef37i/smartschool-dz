import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const { notifications, markNotificationsRead, students } = useAppContext();
  const navigate = useNavigate();
  
  const [showNotifs, setShowNotifs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const notifRef = useRef();

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const results = students.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, students]);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:bg-dark-card/80 dark:border-dark-border">
      
      {/* Global Search */}
      <div className="flex items-center relative hidden sm:block z-50">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Global search students..." 
          className="pl-10 pr-4 py-2 w-64 xl:w-96 rounded-full bg-gray-100 dark:bg-dark-bg border border-transparent focus:bg-white dark:focus:bg-dark-card focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-sm transition-all focus:outline-none dark:text-white"
        />
        {searchResults.length > 0 && (
          <div className="absolute top-12 left-0 w-full bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl shadow-xl overflow-hidden py-2">
            {searchResults.map(s => (
              <div 
                key={s.id} 
                onClick={() => { navigate('/students'); setSearchQuery(''); }}
                className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-dark-border cursor-pointer flex flex-col"
              >
                <span className="text-sm font-semibold dark:text-white">{s.name}</span>
                <span className="text-xs text-gray-500">Class: {s.class} | ID: #{s.id}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3 ml-auto">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-border text-gray-500 transition-colors"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => { setShowNotifs(!showNotifs); if (!showNotifs) markNotificationsRead(); }}
            className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-border text-gray-500 transition-colors"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-[10px] text-white rounded-full bg-red-500 border border-white dark:border-dark-card font-bold">
                {unreadCount}
              </span>
            )}
          </button>
          
          {showNotifs && (
            <div className="absolute top-12 right-0 w-80 bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl shadow-xl overflow-hidden z-50">
              <div className="p-3 border-b border-gray-100 dark:border-dark-border flex justify-between items-center bg-gray-50 dark:bg-dark-bg/50">
                <span className="font-semibold text-gray-700 dark:text-gray-200">Notifications</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.length > 0 ? notifications.map(n => (
                  <div key={n.id} className="p-3 border-b last:border-0 border-gray-50 dark:border-dark-border/50 hover:bg-gray-50 dark:hover:bg-dark-bg/30">
                    <p className="text-sm text-gray-800 dark:text-gray-300">{n.text}</p>
                  </div>
                )) : (
                  <div className="p-4 text-center text-sm text-gray-500">No new notifications</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="border-l border-gray-200 dark:border-dark-border h-6 mx-2 hidden sm:block"></div>

        <div className="flex items-center space-x-2 cursor-pointer group">
          <img 
            src="https://api.dicebear.com/7.x/notionists/svg?seed=Admin" 
            alt="User avatar" 
            className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 border border-primary-200 dark:border-primary-700" 
          />
          <div className="hidden md:flex flex-col text-left">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 leading-tight">Admin DZ</span>
            <span className="text-xs text-gray-500">Director</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
