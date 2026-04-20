import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, MapPin, User, BookOpen } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Select } from '../../components/ui/Select';
import { useAppContext } from '../../context/AppContext';

const Timetable = () => {
  const { timetables, classes } = useAppContext();
  const [selectedClass, setSelectedClass] = useState(classes[0]?.name || '10A');

  if (!timetables) return null;

  const currentTimetable = timetables[selectedClass] || [
    { day: 'Monday', slots: [{ time: '08:00', subject: 'Self Study', teacher: 'Library' }] },
    { day: 'Tuesday', slots: [{ time: '08:00', subject: 'General Assembly', teacher: 'Hall' }] }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 dark:border-dark-border pb-4 gap-4">
        <div className="flex items-center gap-3">
          <CalendarDays className="text-primary-600 w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Academic Timetables</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage unique weekly schedules for every department.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-sm font-bold text-gray-400 uppercase whitespace-nowrap">Select Class:</label>
          <Select 
            value={selectedClass} 
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full sm:w-48 bg-white dark:bg-dark-card border-gray-200"
          >
            {classes.map(c => <option key={c.id} value={c.name}>Grade {c.name}</option>)}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {currentTimetable.map((day, dIdx) => (
          <motion.div 
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: dIdx * 0.1 }}
            className="space-y-4"
          >
            <div className="bg-gray-100 dark:bg-dark-card p-3 rounded-xl text-center border border-transparent dark:border-dark-border/30">
              <h3 className="font-bold text-gray-900 dark:text-white">{day.day}</h3>
            </div>
            
            <div className="space-y-3">
              {day.slots.map((slot, sIdx) => (
                <Card key={sIdx} className="border-none shadow-sm hover:shadow-md transition-all cursor-pointer group">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-primary-600 dark:text-primary-400 uppercase">{slot.time}</span>
                      <BookOpen size={12} className="text-gray-300 group-hover:text-primary-500 transition-colors" />
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{slot.subject}</h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <User size={10} className="text-gray-300" />
                        <span className="truncate">{slot.teacher}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="py-2 flex items-center justify-center border-2 border-dashed border-gray-100 dark:border-dark-border rounded-xl">
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Available</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
