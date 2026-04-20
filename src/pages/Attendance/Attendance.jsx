import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Select } from '../../components/ui/Select';
import { useAppContext } from '../../context/AppContext';

const Attendance = () => {
  const { students, classes, attendance, setStudentAttendance } = useAppContext();
  const [selectedClass, setSelectedClass] = useState(classes[0]?.name || '');

  const filteredStudents = students.filter(s => s.class === selectedClass);

  const toggleStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'Present' ? 'Absent' : currentStatus === 'Absent' ? 'Late' : 'Present';
    setStudentAttendance(id, nextStatus);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-primary-600 rounded-2xl p-6 text-white shadow-lg">
        <div>
          <h1 className="text-2xl font-bold">Daily Attendance</h1>
          <p className="text-primary-100">Quickly mark students for the day. Updates dashboard instantly.</p>
        </div>
        <Select 
          value={selectedClass} 
          onChange={e => setSelectedClass(e.target.value)}
          className="w-48 bg-white/10 border-white/20 text-white placeholder:text-white/70 appearance-none [&>option]:text-gray-900"
        >
          {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status Toggle</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? filteredStudents.map((student, idx) => {
                const status = attendance[student.id] || 'Present';
                return (
                  <motion.tr key={student.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}>
                    <TableCell className="text-gray-500">#{student.id}</TableCell>
                    <TableCell className="font-semibold text-gray-900 dark:text-gray-100">{student.name}</TableCell>
                    <TableCell>
                      <button 
                        onClick={() => toggleStatus(student.id, status)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                          status === 'Present' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 
                          status === 'Absent' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' :
                          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400'
                        }`}
                      >
                        {status}
                      </button>
                    </TableCell>
                  </motion.tr>
                )
              }) : (
                <TableRow><TableCell colSpan={3} className="text-center h-24">No students in this class.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;
