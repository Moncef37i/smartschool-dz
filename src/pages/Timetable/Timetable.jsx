import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { useAppContext } from '../../context/AppContext';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
const HOURS = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

const Timetable = () => {
  const { classes } = useAppContext();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-200 dark:border-dark-border pb-4">
        <CalendarDays className="text-primary-500 w-8 h-8" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Master Timetable</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Weekly scheduling grid across all classes.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr>
                <th className="p-4 border-b border-r dark:border-dark-border text-gray-500 bg-gray-50 dark:bg-dark-bg text-sm">Time \ Class</th>
                {classes.map(c => (
                  <th key={c.id} className="p-4 border-b dark:border-dark-border text-gray-900 dark:text-gray-100 font-bold bg-gray-50 dark:bg-dark-bg">{c.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HOURS.map((hour, idx) => (
                <motion.tr key={hour} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}>
                  <td className="p-4 border-r dark:border-dark-border font-medium text-gray-500 dark:text-gray-400 text-sm whitespace-nowrap bg-white dark:bg-dark-card">{hour}</td>
                  {classes.map(c => {
                    const isBreak = hour === '11:00';
                    return (
                      <td key={`${hour}-${c.id}`} className={`p-4 border border-gray-100 dark:border-dark-border text-sm ${isBreak ? 'bg-gray-100 dark:bg-dark-bg' : 'bg-white dark:bg-dark-card'}`}>
                        {isBreak ? <span className="text-gray-400 font-semibold tracking-widest">BREAK</span> : 
                         idx === 0 ? <span className="text-primary-600 font-semibold">{c.teacher}</span> : 
                         <span className="text-gray-500">Subject</span>}
                      </td>
                    );
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Timetable;
