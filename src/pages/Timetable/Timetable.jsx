import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, MapPin, User, BookOpen } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { useAppContext } from '../../context/AppContext';

const Timetable = () => {
  const { timetable } = useAppContext();

  if (!timetable) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-dark-border pb-4">
        <div className="flex items-center gap-3">
          <CalendarDays className="text-primary-600 w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Academic Timetable</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Viewing the weekly master schedule for Class 10A.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <select className="text-sm border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-card px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500/20">
            <option>Class 10A</option>
            <option>Class 9B</option>
            <option>Class 11C</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {timetable.map((day, dIdx) => (
          <motion.div 
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: dIdx * 0.1 }}
            className="space-y-4"
          >
            <div className="bg-gray-100 dark:bg-dark-card p-3 rounded-xl text-center">
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
                        <User size={10} />
                        <span>{slot.teacher}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <MapPin size={10} />
                        <span>Room {slot.class}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {day.day !== 'Friday' && (
                <div className="py-2 flex items-center justify-center border-2 border-dashed border-gray-100 dark:border-dark-border rounded-xl">
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Lunch Break</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
